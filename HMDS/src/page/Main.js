import Component from '../util/component';
import React from 'react';
import {View, Text, ScrollView, Platform,Dimensions,BackHandler,Image} from 'react-native';

import _ from '../style/Main';
import Footer from './main/Footer';
import Home from './main/Home';
import Hm from './main/Hm';
import Master from './main/Master';
import Index from './main/Index';
import Discover from './search/Discover';
import Card from './card/Card';

import loginCheck from '../util/login';
import app from '../util/app';
import context from '../util/context';
import Touchable from "./common/Touchable";
import cache from '../util/cache';

const {width:clientWidth} = Dimensions.get('window');

export default class Main extends Component {
	constructor(props){
		super(props);

		this.state = {
			currentTab: 0,

			//环境准备就绪与否
			appReady: false,
			showAdScoreSplash: false
		};
	}

	componentDidMount(){
		//首页pv
		app.stat('hmds-index', '首页点击');

		//初始化逻辑，没有拉取到环境信息，所有逻辑应该都无法执行
		app.info().then((contextParam)=>{
			//获取app基础参数
			context.app = contextParam;
			// this.setState({appReady: true});

			//只有当页面准备完成才能， 监听推送相关逻辑
			// app.getParam('test').then((paramString)=>{
			app.getParam('HMDS').then((paramString)=>{
				try{
					let param = JSON.parse(paramString);
					if(param.type == 'detail') {
						//直接跳到羊毛
						this.props.navigation.navigate('Detail', {
							item: {
								id: param.id,
								is_user_add: 0
							}
						});
					} else if(param.type == 'article') {
						//直接跳转倒文章
						this.props.navigation.navigate('MasterDetail', {
							item: {id: param.id}
						});
					} else if(param.type == 'mall'){
						//直接跳转羊毛商城
						this.props.navigation.navigate('Mall');
					}
					!this.state.appReady && this.setState({appReady: true});
				} catch(e){
					//进入首页
					!this.state.appReady && this.setState({appReady: true});
				}
			});

			//获取本地缓存检测是否需要显示开屏提示广告(1.0.6的开屏引导逻辑)
			app._version == '1.0.6' && cache.getItem('hmds:adScoreDisplay', (value)=>{
				if(!value) {
					this.setState({showAdScoreSplash: true});
					cache.setItem('hmds:adScoreDisplay', 1);
				}else{
					if (value == 'true'){
						value = 1;
					}else{
						value = parseInt(value);
					}
					value++;

					//首页引导图连弹三次
					if (value < 4){
						this.setState({showAdScoreSplash: true});
						cache.setItem('hmds:adScoreDisplay', value);
					}
				}
			});

			// cache.removeItem('hmds:adScoreDisplay');


		}).catch(()=>{
			this.setState({appReady: false});
		});

		// this.setState({appReady: true});

		//监听物理返回键
		if(Platform.OS == 'android') {
			BackHandler.addEventListener('hardwareBackPress', ()=>{
				app.exit();
				return true;
			});
		}
	}

	render() {
		if(this.state.appReady === false) {
			return null;
		}

		return (
			<View style={_.page}>
				<View style={_.body}>
					<View style={[_.main, {left: -this.state.currentTab*clientWidth}]}>
						<Index navigation={this.props.navigation} />
						<Card navigation={this.props.navigation} />
						<Master navigation={this.props.navigation} />
						<Hm navigation={this.props.navigation} />
					</View>
				</View>
				<Footer onChangeTab={(index)=>{
					this.setState({
						currentTab: index
					});
				}} navigation={this.props.navigation}/>

				{this.state.showAdScoreSplash ? (<View style={_.splashAd}>
					<View style={_.adBody}>
						<View style={_.adClose}>
							<Touchable style={_.adCloseIconBox} onPress={()=>{
								this.setState({showAdScoreSplash: false});
							}}>
 								<Image style={_.adCloseIcon} source={require('../assets/Close_icon_round.png')}/>
							</Touchable>
							<View style={_.adCloseLine}/>
						</View>
						<View>
							<Touchable onPress={()=>{
								loginCheck(()=>{
									this.props.navigation.navigate('Profile');
								});
							}}>
								<Image style={_.adImg} source={require('../assets/adSplash.png')}/>
							</Touchable>
						</View>
					</View>
				</View>) : null}
			</View>
		);
	}
}