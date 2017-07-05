import Component from '../util/component';
import React from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';

import _ from '../style/Profile';
import app from '../util/app';
import Header from './common/Header';
import Touchable from './common/Touchable';
import data from '../util/data';
import Loading from './common/Loading';



export default class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tool: [
				{
					title: '我的任务',
					callback: () => {
						app.stat('hmds-my', '我的任务点击');
						this.props.navigation.navigate('Task');
					}
				},
				{
					title: '羊毛商城',
					desc: '完成任务可用羊毛兑换礼券',
					callback: () => {
						app.stat('hmds-my', '羊毛商城点击');
						this.props.navigation.navigate('Mall');
					}
				},
				{
					title: '我的券包',
					desc: '',
					callback: () => {
						app.stat('hmds-my', '我的券包点击');
						this.props.navigation.navigate('Exchange');
					}
				},
				{
					title: '我的日历',
					desc: '',
					callback: () => {
						app.stat('hmds-my', '我的日历点击');
						this.props.navigation.navigate('Calendar');
					}
				},
				{
					title: '我的订阅',
					callback: () => {
						app.stat('hmds-my', '我的订阅点击');
						this.props.navigation.navigate('Subscribe');
					}
				},
				{
					title: '我的收藏',
					callback: ()=>{
						app.stat('hmds-my', '我的收藏点击');
						this.props.navigation.navigate('Favor');
					}
				},
				{
					title: '我评论过的资讯',
					callback: () => {
						app.stat('hmds-my', '我的评论点击');
						this.props.navigation.navigate('Comment');
					}
				},
				// {
				// 	title: '我共享的羊毛信息',
				// 	page: 'NewPage',
				// 	callback: () => {
				// 		console.log('点击了共享羊毛信息')
				// 	}
				// },
				// {
				// 	title: 'MCC速查',
				// 	page: 'NewPage',
				// 	callback: () => {
				// 		this.props.navigation.navigate('Master')
				// 	}
				// },
			],

			userinfo: null
		};
	}

	componentDidMount() {
		app.stat('hmds-my', '我的页点击');

		data.getUserinfo((res)=>{
			this.setState({userinfo: res.data}, ()=>{
				if (!res.data.exchange) return;
				this.state.tool.forEach((item)=>{
					if (item.title == '我的券包'){
						item.desc = `新增${res.data.exchange}张券`
					}
				});
				this.forceUpdate();
			});
		});

		data.getTodayTotal((res)=>{
			if (!res.data.total) return;
			this.state.tool.forEach((item)=>{
				if (item.title == '我的日历'){
					item.desc = `今日有${res.data.total}个薅毛事项`
				}
			});
			this.forceUpdate();
		});
	}


	showTool(tool) {
		if (!tool || !Array.isArray(tool) || tool.length == 0) {
			return null;
		}


		return (
			<View style={_.tool}>
				{tool.map((item, index) => {
					let boxStyle = [_.toolItemBox];
					if (index == 0) {
						boxStyle.push(_.toolItemBoxNoBorder);
					}
					return (
						<View style={boxStyle} key={index}>
							<Touchable style={_.toolItem} onPress={item.callback}>
								<View style={_.textBox}>
									<Text style={_.toolItemText}>{item.title}</Text>
									<Text style={_.toolItemDesc}>{item.desc || ''}</Text>
								</View>
								<Image style={_.triIcon} source={require('../assets/Triangle_icon.png')}/>
							</Touchable>
						</View>
					);
				})}
			</View>
		);
	}

	//显示用户信息
	showUserinfo(userinfo){
		if(!userinfo){
			return null;
		}

		return (
			<View style={_.uiBox}>
				<View style={_.avatarBox}>
					<Image style={_.avatar} source={!userinfo.avatar?null:{uri:userinfo.avatar}}/>
				</View>
				<View style={_.uiNameBox}>
					<Text style={_.uiName}>{userinfo.name}</Text>
				</View>
				<View style={_.scoreBox}>
					<TouchableOpacity style={_.totalBox}
						onPress={()=>{
							this.props.navigation.navigate('Qa', {type: 'wool'});
					}}>
						<Image style={_.moneyIcon} source={require('../assets/moeny_icon_gray.png')}/>
						<Text style={_.totalScore}>{userinfo.totalScore}</Text>
						<Text style={_.ymText}>羊毛</Text>
						<Image style={_.qaIcon} source={require('../assets/Q&A_icon.png')}/>
					</TouchableOpacity>
					<View>
						<Text style={_.dueText}>最近一个月到期羊毛：{userinfo.willDueScore}</Text>
					</View>
				</View>
			</View>
		);
	}

	render() {
		if (!this.state.userinfo)
			return <Loading />;

		return (
			<View style={_.page}>
				<Header
					title="我的"
					navigation={this.props.navigation}/>
				<ScrollView style={_.body} alwaysBounceVertical={false}>
					{this.showUserinfo(this.state.userinfo)}
					{this.showTool(this.state.tool)}
				</ScrollView>
			</View>
		);
	}
}