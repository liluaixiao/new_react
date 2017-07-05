import React from 'react';
import {
	View,
	StyleSheet,
	Image,
	Text,
	ScrollView,
	TouchableOpacity,
	TouchableHighlight,
	TouchableWithoutFeedback,
	Dimensions,
	Alert,
	BackAndroid
} from 'react-native';

import app from './common/common';
import Head from './common/head';
import DateInfo from './common/date';
import InfoList from './common/infoList';
import {util} from './common/util';
import MxTip from './common/mxTip';
import Category from './category';
import Detail from './detail';
import Calendar from './calendar';

import {net} from './common/net';
import {S} from './style/main';
import confirm from './common/confirm';
import libMain from './lib/main';
import loginCheck from './common/login';
import {event} from './common/event';

export default class Main extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			tab: [],
			jx: [],
			todayMX: [],
			laterMX: [],
			recommend: [],
			latest: null,
			mxLatest: null,

			canShowView: false,
			canShowHead: false
		};

		this.timer = null;

	}

	componentDidMount() {
		try{
			let component = this;
			libMain(this).then(()=>{

				let getNext = true;
				let getMxLatest = ()=>{
					net.calendarLatest((res)=>{
						if(res.data.length > 0) {
							component.setState({mxLatest: res.data[0]});
						} else {
							getNext = false;
						}
					});
				};

				//获取最新的秒杀倒计时
				getMxLatest();

				let start = Math.ceil(Date.now() / 1000);
				component.timer = setInterval(() => {
					let now = Math.ceil(Date.now() / 1000);
					let diff = now - start;
					start = now;

					//抢购剩余时间，如果抢购时间<=0，拉取下一条今日抢购
					if(component.state.latest != null){
						let latest = component.state.latest;
						latest.timeLeft -= diff;
						if(latest.timeLeft <= 0) {
							latest = null;
							component.setState({latest});
						} else {
							component.setState({latest});
						}
					}

					//秒杀倒计时
					if(component.state.mxLatest != null) {
						let mxLatest = component.state.mxLatest;
						mxLatest.timeLeft -= diff;
						if(mxLatest.timeLeft <= 0) {
							mxLatest = null;
							component.setState({mxLatest});
							//拉取下一条记录
							getNext && getMxLatest();
						} else {
							component.setState({mxLatest});
						}
					}

				}, 1000);

			});
		} catch (e){
			alert(e.message);
		}

		BackAndroid.addEventListener('hardwareBackPress', ()=>{
			app.exit();
			return true;
		});

		event.on('refreshMain', ()=>{
			try{
				libMain(this).then(()=>{
					//首页刷新成功，更新全局日历
					event.emit('updateCalendar');
				});
			} catch (e){
				alert(e.message);
			}
		})
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	jumpCategory(index) {
		this.props.navigation.navigate('Category', {
			initIndex: index,
			menu: this.state.tab
		});
	}

	jxJump(info) {
		this.props.navigation.navigate('Detail', {info});
	}

	viewToday() {
		loginCheck(()=>{
			this.props.navigation.navigate('Calendar');
		});
	}

	viewMore() {
		this.props.navigation.navigate('Category', {
			initIndex: 0,
			menu: this.state.tab
		});
	}

	remind(index, hasRemind, type = 'todayMX') {
		loginCheck(()=>{
			if(hasRemind == false) {
				let list = this.state[type];
				net.commonRemind({id: list[index].id}, (res)=>{
					if(res.data.result) {
						list[index].hasRemind = true;
						this.setState({[type]: list});
						event.emit('refreshMain');
					}
				})
			}
		});
	}

	/**
	 * 删除一条提醒
	 * @param index
	 * @param type
	 */
	remove(index, type) {
		let list = this.state[type];
		if(list[index].hasRemind == true) {
			confirm({
				title: '确认要删除提醒么？',
				onConfirm: ()=>{
					net.calendarRemove({id: list[index].id}, (res)=>{
						if(res.data.result) {
							list[index].hasRemind = false;
							this.setState({
								[type]: list
							});
						}
					})
				}
			});
		}
	}

	getMxItem(index, item, type = 'todayMX') {
		let imgStyle = [],
			textStyle = [],
			remindText = '提醒我';
		if (item.hasRemind == true) {
			imgStyle.push({opacity: 0.1});
			textStyle.push({opacity: 0.3});
			remindText = '已提醒';
		}

		return (
			<View key={item.id} style={S.mxli}>
				<TouchableOpacity style={{flex: 1}} onLongPress={() => this.remove(index, type)}
								  onPress={() => this.jxJump(item)}>
					<View style={S.mxliLeft}>
						<Text style={{fontSize: 18, color: '#666', paddingBottom: 10}}>{item.title}</Text>
						<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
							<View style={{flexDirection: 'row', alignItems: 'center'}}>
								<Image style={{marginRight: 5}} source={require('../assets/img/time.png')}/>
								<Text style={{fontSize: 12, color: '#F6A623'}}>{item.statusText}</Text>
							</View>
							<View style={{flexDirection: 'row', alignItems: 'center'}}>
								{(item.flag || []).map((name) => {
									return <Text key={name} style={[S.flag, S.text]}>{name}</Text>;
								})}
							</View>
						</View>
					</View>
				</TouchableOpacity>
				<TouchableWithoutFeedback onPress={() => this.remind(index, item.hasRemind, type)}>
					<View style={S.mxliRight}>
						<View style={imgStyle}>
							<Image source={require('../assets/img/remind.png')}/>
						</View>
						<Text style={textStyle}>{remindText}</Text>
					</View>
				</TouchableWithoutFeedback>
			</View>
		);
	}

	getDailyJX() {
		let {height, width} = Dimensions.get('window');
		let bannerWidth = width,
			bannerHeight = width * 80 / 375;
		let jx = null;
		if (Array.isArray(this.state.jx) && this.state.jx.length > 0) {
			jx = (
				<View style={S.dailyJX}>
					<Text style={S.jxTitle}>每日精选</Text>
					<Text style={S.jxSubTitle}>
						为你甄选极致折扣
					</Text>
					<View style={S.jxDash}></View>
					{this.state.jx.map((item, index) => {
						let boxStyle = {
							borderBottomWidth: 1,
							borderColor: '#f2f2f2',
							borderStyle: 'solid'
						};
						if(index == this.state.jx.length - 1) {
							boxStyle.borderBottomWidth = 0;
						}
						return (
							<TouchableOpacity style={boxStyle} key={item.id} onPress={() => this.jxJump(item)}>
								<Image resizeMode="cover" style={{width: bannerWidth, height: bannerHeight}}
									   source={item.img}/>
							</TouchableOpacity>
						);
					})}
				</View>
			);
		}

		return jx;
	}

	showRecommend() {
		let rec = null;
		if (Array.isArray(this.state.recommend) && this.state.recommend.length) {
			rec = (
				<View style={[S.dailyJX, S.recmmend]}>
					<Text style={S.jxTitle}>薅毛信息推荐</Text>
					<Text style={S.jxSubTitle}>
						更多信息请点击分类
					</Text>
					<View style={S.jxDash}></View>
					<InfoList list={this.state.recommend} navigation={this.props.navigation}/>
				</View>
			);
		}

		return rec;
	}

	getTopLatest(){
		let latest = null;
		if(this.state.latest != null && this.state.latest.timeLeft > 0) {

			// let name = this.state.latest.name;
			// if(name.length > 12) {
			// 	name = name.substr(0, 12) + '...';
			// }
			latest = (
				<TouchableOpacity onPress={() => this.viewToday()}>
					<View style={S.newest}>
						<Text style={[S.nstText, {flex: 0.6}]}>{this.state.latest.name}</Text>
						<Text style={[S.nstText, {flex: 0.35,textAlign:'right'}]}>{util.formatSecondByDay(this.state.latest.timeLeft)}</Text>
					</View>
				</TouchableOpacity>
			);
		}
		return latest;
	}

	render() {
		return (
			<View style={S.page}>
				{this.state.canShowHead && (<Head
					navigation={this.props.navigation}
					titleComponent={<Image source={require('../assets/img/title.png')}/>}
				/>)}

				<View></View>

				{this.state.canShowView && <ScrollView>

					<DateInfo type="main" navigation={this.props.navigation}/>

					{this.getTopLatest()}

					<View style={S.viewToday}>
						<TouchableOpacity onPress={() => this.viewToday()}>
							<Text style={S.vtText}>查看今日薅毛日历</Text>
						</TouchableOpacity>
					</View>

					<View style={S.tab}>
						{this.state.tab.map((item, index) => {
							return (
								<TouchableOpacity key={item.id} onPress={() => this.jumpCategory(index)}>
									<View style={S.tabItem}>
										<View style={S.tabIcon}>
											<Image resizeMode="contain" style={{width: 30, height: 30}}
												   source={item.icon}/>
										</View>
										<Text style={S.tabText}>{item.name}</Text>
									</View>
								</TouchableOpacity>
							);
						})}
					</View>

					{this.getDailyJX()}

					{(()=>{
						if(this.state.todayMX.length || this.state.laterMX.length) {
							return (<View style={S.dailyJX}>
								<Text style={S.jxTitle}>秒杀进行时</Text>
								{(() => {
									if (this.state.mxLatest == null) {
										return null;
									}
									return (
										<Text style={S.jxSubTitle}>
											距离最近开抢还有
											<Text
												style={S.jxRedText}> {util.formatSecondByDay(this.state.mxLatest.timeLeft)}</Text>
										</Text>
									);
								})()}
								<View style={S.jxDash}></View>

								{this.state.todayMX.length > 0 &&
								<MxTip icon={require('../assets/img/lightning.png')} title="今日秒杀列表"/>}
								{(this.state.todayMX || []).map((item, index) => {
									return this.getMxItem(index, item, 'todayMX');
								})}

								{this.state.laterMX.length > 0 &&
								<MxTip style={{marginTop: 10}} icon={require('../assets/img/lightning.png')}
									   title="后续秒杀列表"/>}
								{(this.state.laterMX || []).map((item, index) => {
									return this.getMxItem(index, item, 'laterMX');
								})}

							</View>);
						} else {
							return null;
						}
					})()}

					{this.showRecommend()}

					<View style={[S.viewToday, {borderBottomWidth: 0}]}>
						<TouchableOpacity onPress={() => this.viewMore()}>
							<Text style={[S.vtText]}>点击查看更多薅毛信息</Text>
						</TouchableOpacity>
					</View>

				</ScrollView>}

			</View>
		);
	}
}