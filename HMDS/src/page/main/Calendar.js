import Component from '../../util/component';
import React from 'react';
import {View, Text,ScrollView,Image,Animated,Easing} from 'react-native';
import _ from '../../style/main/Calendar';
import data from '../../util/data';
import Toast from '../common/Toast';
import app from '../../util/app';
import Touchable from '../common/Touchable';
import Header from '../common/Header';

export default class Calendar extends Component {
	constructor(props){
		super(props);

		let today = new Date();
		let dayFormat = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
		if(this.props.navigation.state.params && this.props.navigation.state.params.format) {
			dayFormat = this.props.navigation.state.params.format;
		}
		this.state = {
			dayFormat,
			left: new Animated.Value(0),
			list: []
		};

		this.key = 0;
		this.isEdit = false;
	}

	/**
	 * 刷新列表
	 * @param date
	 */
	refreshList(date){
		data.getMyList({date}, (res)=>{
			this.setState({list: res.data});
		});
	}

	componentDidMount(){
		//初始化默认加载当天的列表
		this.refreshList(this.state.dayFormat);

		/**
		 * 编辑删除和完成状态
		 */
		this.on('editStatusChange', (currentStatus)=>{
			if(currentStatus == 0) {
				//切换到编辑
				this.isEdit = true;
				this.showRemove();
			} else if(currentStatus == 1) {
				//切换到完成
				this.isEdit = false;
				this.closeRemove();
			}
		});

		/**
		 * 添加自定义羊毛成功
		 */
		this.on('onAddCustomSuccess', ()=>{
			this.refreshList(this.state.dayFormat);
		})
	}

	/**
	 * 生成日期列表
	 */
	generateDate(){
		const ms = 86400*1000;
		let start = Date.now() - ms;
		let tmpArr = [];
		for(let i=0;i<7;i++) {
			tmpArr.push(start + i*ms);
		}

		let getWeekDayCn = (date)=>{
			let num = date.getDay();
			let cn;
			switch(num) {
				case 0: cn = '日';break;
				case 1: cn = '一';break;
				case 2: cn = '二';break;
				case 3: cn = '三';break;
				case 4: cn = '四';break;
				case 5: cn = '五';break;
				case 6: cn = '六';break;
			}
			return cn;
		}

		//现在根据毫秒生成每天的日期
		return tmpArr.map((ts)=>{
			let date = new Date(ts);
			let dayinfo = {
				ts,
				year: date.getFullYear(),
				month: date.getMonth() + 1,
				day: date.getDate(),
				weekDay: getWeekDayCn(date)
			};
			dayinfo.format = `${dayinfo.year}-${dayinfo.month}-${dayinfo.day}`;
			return dayinfo;
		});
	}

	/**
	 * 切换日期
	 * @param format
	 */
	changeDay(format){
		if(this.isEdit) return ;
		this.setState({dayFormat: format});

		//刷新列表
		this.refreshList(format);
	}

	getDayList(){
		let list = this.generateDate();
		return list.map((day)=>{
			if(this.state.dayFormat == day.format) {
				this.displayFormat = `${day.month}月${day.day}日 周${day.weekDay}`
				return (
					<View style={[_.day, _.dayActive]} key={day.format}>
						<Text style={_.dateTextActive}>{day.weekDay}</Text>
						<Text style={_.dateTextActive}>{day.day}</Text>
					</View>
				);
			} else {
				return (
					<Touchable style={_.day} key={day.format} onPress={()=>this.changeDay(day.format)}>
						<Text style={_.dateText}>{day.weekDay}</Text>
						<Text style={_.dateText}>{day.day}</Text>
					</Touchable>
				);
			}
		});
	}

	showRemove(){
		Animated.timing(this.state.left, {
			toValue: -59, // 目标值
			duration: 100, // 动画时间
			easing: Easing.linear // 缓动函数
		}).start();
	}

	closeRemove(){
		Animated.timing(this.state.left, {
			toValue: 0, // 目标值
			duration: 100, // 动画时间
			easing: Easing.linear // 缓动函数
		}).start();
	}

	/**
	 * 跳转详情页
	 * @param id
	 */
	jumpDetail(item){
		if(this.isEdit) return ;
		this.props.navigation.navigate('Detail', {item});
	}

	//规范时间格式转换为时间戳
	strToTs(str){
		let seg = str.split(' ');
		let dateSeg = seg[0].split('-');
		dateSeg[1] = parseInt(dateSeg[1]) - 1;
		let timeSeg = seg[1] ? seg[1].split(':') : [];
		return new Date(...dateSeg, ...timeSeg).valueOf();
	}

	/**
	 * 添加到系统提醒
	 * @param item
	 */
	addSystemRemind(item, index){
		if(this.isEdit) return ;

		if(Date.now()>this.strToTs(item.endTime)) {
			this.emit('toast', '活动已过期');
			return ;
		}
		if((Date.now()>this.strToTs(item.startTime)) && (Date.now()<this.strToTs(item.endTime))) {
			this.emit('toast', '活动正在进行中，请直接参加');
			return ;
		}

		if((Date.now()>this.strToTs(item.endTime)-10*1000) && (Date.now()<this.strToTs(item.endTime))){
			//活动还没开始，可以添加提醒
			this.emit('toast', '活动即将开始，请直接参加');
			return ;
		}

		if(Date.now()<this.strToTs(item.startTime)){
			//活动还没开始，可以添加提醒
			data.addSystemRemind({id: item.id, isUserAdd:item.is_user_add});

			//添加系统日历
			let endDate = parseInt(this.strToTs(item.startTime)/1000),
				startDate = endDate - 600;

			app.remind({
				title: item.title,
				detail: item.detail,
				url: item.url,
				startDate,
				endDate
			}).then((res)=>{
				//添加成功，更新状态
				this.state.list[index].hasAddSystemRemind = true;
				// this.setState({
				// 	list: this.state.list
				// });
				this.forceUpdate();
				this.emit('toast', '添加成功');
			}).catch((res)=>{
				this.emit('toast', '添加系统日历失败');
			});

		}
	}

	/**
	 * 删除一条羊毛信息
	 * @param item
	 * @param index
	 */
	removeItem(item, index){
		//首先更新UI
		this.state.list.splice(index, 1);
		// this.setState({
		// 	list: this.state.list
		// });
		this.forceUpdate();

		//发送删除智指令到服务器
		data.removeItem({id:item.id,his_id:item.his_id,isUserAdd:item.is_user_add}, (res)=>{
			if(res.data.result) {
				//一旦删除成功，需要同步更新首页的记录数
				let today = new Date();
				let dayFormat = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
				if(dayFormat == this.state.dayFormat) {
					this.emit('updateTodayTotal');
				}
			}
		});
	}

	/**
	 * 显示列表
	 * @param list
	 * @returns {null}
	 */
	showList(list){
		if(!list || !Array.isArray(list)) {
			return null;
		}

		return list.map((item, index)=>{

			let remind = (
				<Touchable style={_.addCalendarBox} onPress={()=>this.addSystemRemind(item, index)}>
					<Text style={[_.addCalendar,_.addCalendarActive]}>点此添加至系统日历</Text>
				</Touchable>
			);
			if(item.hasAddSystemRemind) {
				remind = (
					<View style={_.addCalendarBox}>
						<Text style={[_.addCalendar,_.addCalendarDisable]}>已添加至系统日历</Text>
					</View>
				);
			}

			return (
				<View style={_.rowItem} key={`${item.id},${item.his_id}`}>
					<Animated.View style={[_.row, {
						left: this.state.left
					}]}>
						<View style={_.timeline}>
							<Image style={_.typeIcon} resizeMode="cover" source={item.typeIcon?{uri:item.typeIcon}:null}/>
							<Text style={_.time}>{item.time}</Text>
						</View>
						<View style={_.item}>
							<View style={_.itemBox}>
								<Touchable onPress={()=>this.jumpDetail(item)}>
									<Text style={_.title}>{item.title}</Text>
								</Touchable>
								<View style={_.iconBox}>
									<View style={_.row}>
										{item.icons.map((icon)=>{
											return <Image key={this.key++} style={_.icon} resizeMode="cover" source={icon?{uri:icon}:null} />
										})}
									</View>
									{remind}
								</View>
							</View>
						</View>
						<View style={_.dot}/>
						<View style={_.arrow}/>
					</Animated.View>

					<Animated.View style={[_.remove, {
						transform:[{translateX: this.state.left}]
					}]}>
						<Touchable style={_.removeBtn} onPress={()=>this.removeItem(item, index)}>
							<Image style={_.removeIcon} resizeMode="cover" source={require('../../assets/delete_icon.png')}/>
							<Text style={_.removeText}>删除</Text>
						</Touchable>
					</Animated.View>
				</View>
			);
		});
	}

	render(){
		return (
			<View style={_.pager}>
				<Header
					navigation={this.props.navigation}
					menuType="profile"
				/>
				<View style={_.dateBox}>
					<View style={_.date}>
						{this.getDayList()}
					</View>
					<View style={_.selectDay}>
						<Text style={_.displayFormat}>{this.displayFormat} {`(${this.state.list.length})`}</Text>
						<Touchable style={_.add} onPress={()=>{
							if(this.isEdit) return ;
							this.props.navigation.navigate('Add');
						}}>
							<Image style={_.addIcon} resizeMode="cover" source={require('../../assets/add_icon.png')}/>
						</Touchable>
					</View>
				</View>

				<ScrollView style={_.list}>
					{this.showList(this.state.list)}
				</ScrollView>

				<Toast />
			</View>
		);
	}
}