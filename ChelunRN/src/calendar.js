import React from 'react';
import {
	View,
	Text,
	ScrollView,
	Image,
	TouchableOpacity,
	TextInput,
	Switch,
	Platform,
	Animated,
	Easing,
	TouchableHighlight
} from 'react-native';
import DatePicker from 'react-native-datepicker';

import DateInfo from './common/date';
import MxTip from './common/mxTip';
import Head from './common/head';
import Add from './add';
import {S} from './style/calendar';
import {net} from './common/net';
import Detail from './detail';
import confirm from './common/confirm';
import alert from './common/alert';
import {App} from './common/const';
import {event} from './common/event';
import app from './common/common';

export default class Calendar extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			showAddPop: false,
			dateFormat: '',
			total: 0,
			mxList: [],
			commonList: [],

			ismx: true,
			title: '',
			intro: '',
			startTime: '',

			calendar: App.calendar,

			showView: false
		}

		this.currentItem = null;
	}

	componentDidMount(){
		this.currentItem = this.state.calendar[1];
		const params = this.props.navigation.state.params;
		if(typeof params=='object' && params.item) {
			this.currentItem = params.item;
		}
		this.loadList(this.currentItem);

		//监听更新日历列表
		event.on('updateCalendarList', ()=>{
			this.loadList(this.currentItem);
		});
	}

	showAddPop(){
		let addPop = null;
		if(this.state.showAddPop) {
			let ptHeight = Platform.OS == 'ios' ? {height: 18} : {};

			let scaleAnimate = new Animated.Value(1.2);

			addPop = (
				<View
					style={S.popup}
					onStartShouldSetResponder={()=>{
						return true;
					}}
					onResponderRelease={(e)=>{
						if(e.target == e.currentTarget){
							this.setState({showAddPop: false});
						}
					}}
				>
					<Animated.View
						style={[S.pbox, {transform:[{scale:scaleAnimate}]}]}
						onLayout={()=>{
							Animated.timing(scaleAnimate, {
								toValue: 1,
								easing: Easing.in,
								duration: 100
							}).start();
						}}
					>
						<View style={S.pboxText}>
							<Text style={S.pTitle}>添加薅毛信息</Text>
							<View style={S.pin}>
								<TextInput
									style={[S.pinT, ptHeight]}
									placeholder="在此输入信息标题"
									placeholderTextColor="#666"
									underlineColorAndroid="transparent"
									onChangeText={text=>this.setState({title:text})}
								/>
							</View>
							<View style={S.pin}>
								<TextInput
									style={[S.pinT,ptHeight]}
									placeholder="在此输入来源网址或介绍"
									placeholderTextColor="#666"
									underlineColorAndroid="transparent"
									onChangeText={text=>this.setState({intro:text})}
								/>
							</View>

							<DatePicker
								style={{
									padding: 0,
									backgroundColor:'#d8d8d8',
									marginBottom: 10,
									height: 44,
									width: -1,
									alignSelf: 'stretch'
								}}
								date={this.state.startTime}
								mode="datetime"
								showIcon={false}
								placeholder="点击设置开始时间"
								format="YYYY-MM-DD HH:mm"
								minDate={new Date(Date.now())}
								maxDate="2018-06-01"
								confirmBtnText="确认"
								cancelBtnText="取消"
								customStyles={{

									dateInput: {
										margin: 0,
										padding: 0,
										height: 44,
										alignItems: 'flex-start',
										paddingLeft: 10,
										borderWidth: 0,
										marginTop: 3
									},
									dateText: {
										fontSize: 18
									},
									placeholderText: {
										color: '#666',
										fontSize: 18
									},
									btnTextConfirm: {
										color: '#0076FF'
									}
								}}
								onDateChange={(date) => {
									this.setState({startTime: date})
								}}
							/>

							<View style={S.pmx}>
								<Text style={{fontSize:18,color:'#666'}}>是否是秒杀资源</Text>
								<Switch onValueChange={(value)=>this.onmx(value)} value={this.state.ismx}/>
							</View>
						</View>

						<View style={S.btnP}>
							<View style={[S.btntp,S.btnTouchWidthBorder]}>
								<TouchableOpacity style={S.btnTouch} onPress={()=>this.moreAdd()}>
									<Text style={S.btnT}>更多信息</Text>
								</TouchableOpacity>
							</View>
							<View style={S.btntp}>
								<TouchableOpacity style={S.btnTouch} onPress={()=>this.addRemind()}>
									<Text style={S.btnT}>添加</Text>
								</TouchableOpacity>
							</View>
						</View>

					</Animated.View>

				</View>
			);
		}

		return addPop;
	}

	//添加提醒
	addRemind(){
		let title = this.state.title;
		let intro = this.state.intro;
		let startTime = this.state.startTime;
		let ismx = this.state.ismx ? 1 : 0;

		if(!title) {
			alert('标题不能为空');
			return ;
		}
		if(!startTime) {
			alert('请选择开始时间');
			return ;
		}

		net.calendarAdd({title,intro,startTime,ismx}, (res)=>{
			if(res.data.result) {

				let endDate = Math.ceil(Date.parse(startTime)/1000);
				let startDate = endDate - 30*60;

				//写入系统日历
				app.remind({
					title: this.state.title,
					startDate,
					endDate,
					url: res.data.sourceUrl
				}).then((res)=>{
					// console.log('suc', res);
				}).catch((res)=>{
					// console.log('err', res);
				});

				event.emit('refreshMain');
				event.emit('updateCalendarList');
				this.setState({showAddPop: false});
			}
		})
	}

	onAdd(){
		this.setState({
			showAddPop: true
		});
	}

	//删除一条记录
	remove(index, type = 'mxList'){
		let list = this.state[type];
		confirm({
			title: '确认要删除提醒么？',
			onConfirm: ()=>{
				net.calendarRemove({id: list[index].id}, (res)=>{
					if(res.data.result) {
						event.emit('refreshMain');
						list.splice(index, 1);
						this.setState({
							[type]: list
						});
					}
				})
			}
		});
	}

	loadList(dayinfo){
		net.calendarMyList({time: dayinfo.time}, (res)=>{

			this.currentItem = dayinfo;
			this.setState({
				dateFormat: res.data.dateFormat,
				total: res.data.total,
				mxList: res.data.mxList,
				commonList: res.data.commonList,
				showView: true
			});
		});
	}

	jumpDetail(info){
		this.props.navigation.navigate('Detail', {info});
	}

	render(){
		return (
			<View style={S.page}>
				<Head
					navigation={this.props.navigation}
					titleComponent={<Image source={require('../assets/img/title.png')}/>}
					hideRemind={true}
				/>
				{this.state.showView && (<ScrollView>
					<DateInfo calendar={this.state.calendar} type="calendar" load={dayinfo=>this.loadList(dayinfo)}/>
					<View style={[S.rowCenter, S.dayInfo]}>
						<Text style={S.diText}>{this.state.dateFormat} （{this.state.total}）</Text>
						<TouchableHighlight underlayColor="#f3f3f3" style={S.diAdd} onPress={()=>this.onAdd()}>
							<Image source={require('../assets/img/add.png')}/>
						</TouchableHighlight>
					</View>

					{	this.state.mxList.length==0 &&
						this.state.commonList.length==0 &&
						(
							<View style={S.nohm}>
								<View style={S.nohmBody}>
									<View style={S.arrowTop}></View>
									<Text style={{fontSize:17,color:'#666'}}>今日无任何薅毛事项，可点击(+)进行添加或从我们的推荐中添加</Text>
								</View>
							</View>
						)
					}

					{this.state.mxList.length > 0 && <MxTip style={S.mxTip} icon={require('../assets/img/lightning.png')} title="当日秒杀列表" />}

					{this.state.mxList.map((item, index)=>{
						let flags = item.flag.map((flag)=>{
							return <Text key={flag} style={S.label}>{flag}</Text>
						});
						return (
							<TouchableOpacity key={item.id} onPress={()=>this.jumpDetail(item)} onLongPress={()=>this.remove(index, type='mxList')}>
								<View style={S.item}>
									<View style={S.mTime}>
										<Text style={{fontSize:18,color:'#666'}}>{item.startTime}</Text>
										{/*<Text style={{fontSize:12,color:'#D0011B'}}>点击添加至系统日历</Text>*/}
									</View>
									<Text style={{fontSize:18,color:'#666',marginBottom:5}}>
										{item.title}
									</Text>
									<View style={S.mInfo}>
										<View style={{flexDirection:'row',alignItems:'center'}}>
											<Image source={require('../assets/img/time.png')}/>
											<Text style={{fontSize:12,color:'#f6a623',marginLeft:5}}>{item.statusText}</Text>
										</View>
										<View style={{flexDirection:'row'}}>
											{flags}
										</View>
									</View>
								</View>
							</TouchableOpacity>
						);
					})}

					{this.state.commonList.length > 0 && <MxTip style={S.mxTip} icon={require('../assets/img/lightning.png')} title="当日常规列表" />}

					{this.state.commonList.map((item, index)=>{
						let flags = item.flag.map((flag)=>{
							return <Text key={flag} style={S.label}>{flag}</Text>
						});

						return (
							<TouchableOpacity key={item.id} onPress={()=>this.jumpDetail(item)} onLongPress={()=>this.remove(index, type='commonList')}>
								<View style={S.item}>
									<Text style={{fontSize:18,color:'#666',marginBottom:5}}>{item.title}</Text>
									<View style={S.mInfo}>
										<Text style={{fontSize:12,color:'#333'}}>{item.subTitle}</Text>
										<View style={{flexDirection:'row'}}>{flags}</View>
									</View>
								</View>
							</TouchableOpacity>
						);
					})}

				</ScrollView>)}

				{this.showAddPop()}
			</View>
		);
	}

	moreAdd(){
		this.setState({showAddPop: false});
		this.props.navigation.navigate('Add');
	}

	onmx(value){
		this.setState({ismx: value});
	}
}