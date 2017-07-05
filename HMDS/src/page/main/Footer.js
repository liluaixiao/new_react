import Component from '../../util/component';
import React from 'react';
import {View,Image,TouchableWithoutFeedback,Text} from 'react-native';

import _ from '../../style/main/Footer';
import loginCheck from '../../util/login';
import app from '../../util/app';

export default class Footer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentTab: 0
		};

		this.tab = [
			{
				name: '首页',
				hasTrigger: false,
				activeIcon: <Image style={_.icon} source={require('../../assets/Logo_tab_red_icon.png')}/>,
				icon: <Image style={_.icon} source={require('../../assets/Logo_tab_icon.png')}/>,
			},
			// {
			// 	name: '最划算',
			// 	hasTrigger: false,
			// 	activeIcon: <Image style={_.icon} source={require('../../assets/haomao_icon.png')}/>,
			// 	icon: <Image style={_.icon} source={require('../../assets/haomao_icon_un.png')}/>,
			// },
			{
				name: '办卡',
				hasTrigger: false,
				activeIcon: <Image style={_.icon} source={require('../../assets/bankaicon.png')}/>,
				icon: <Image style={_.icon} source={require('../../assets/bankaicon_gray.png')}/>,
			},
			{
				name: '达人',
				hasTrigger: false,
				activeIcon: <Image style={_.icon} source={require('../../assets/dashi-icon.png')}/>,
				icon: <Image style={_.icon} source={require('../../assets/dashi_icon_un.png')}/>,
			},
			{
				name: '优惠',
				hasTrigger: false,
				activeIcon: <Image style={_.icon} source={require('../../assets/youhui.png')}/>,
				icon: <Image style={_.icon} source={require('../../assets/unyouhui.png')}/>,
			},
		];
	}

	//初始化成功加载数据
	componentDidMount(){
		//初始化触发一次数据加载
		this.triggerLoading(this.state.currentTab);

		//监听切换tab
		this.on('changeTab', (index)=>{
			switch(index){
				case 0:
					app.stat('hmds-index', '首页点击');
					break;
				case 1:
					// app.stat('hmds-discover', '发现页点击');
					app.stat('hmds-index ', '车轮办卡');
					break;
				case 2:
					app.stat('hmds-master', '大师页点击');
					break;
				case 3:
					app.stat('hhmds-calender', '日历页点击');
					break;
			}
			this.onChangeTab(index);
		});

		this.setMenuByTab();
	}

	componentDidUpdate(){
		this.setMenuByTab();
	}

	setMenuByTab(){
		// if(this.state.currentTab == 3) {
		// 	this.emit('showCalendarMenu');
		// } else {
		// 	this.emit('showProfileMenu');
		// }
	}

	//触发数据加载逻辑
	triggerLoading(index){
		if(this.tab[index].hasTrigger == true) {
			return false;
		}

		switch(index) {
			case 0:
				this.emit('triggerHomeLoad');
				break;
			case 1:
				// this.emit('triggerDiscoverLoad');
				this.emit('triggerCardLoad');
				break;
			case 2:
				this.emit('triggerMasterLoad');
				break;
			case 3:
				this.emit('triggerHmLoad');
				break;
		}
		this.tab[index].hasTrigger = true;
	}

	//切换tab时
	onChangeTab(index){

		let onChange = ()=>{
			this.setState({currentTab: index}, ()=>{
				requestAnimationFrame(()=>{
					//切换页面
					this.props.onChangeTab(index);

					//触发一次数据加载判断
					this.triggerLoading(index);

					//显示或者隐藏导航按钮
					if(index == 0) {
						this.emit('showNavBack');
					}else {
						this.emit('hideNavBack');
					}
				});
			});
		};

		// if(index == 3) {
		// 	loginCheck(()=>{
		// 		onChange();
		// 	});
		// } else {
			onChange();
		// }
	}

	render(){

		let tabs = this.tab.map((item, index)=>{
			let _text= [_.text], allStyle = [_.iconAll];
			if(this.state.currentTab == index) {
				_text.push(_.textCurrent);
				allStyle.push(_.iconActive);
			}

			return (
				<TouchableWithoutFeedback key={item.name} onPress={()=>this.onChangeTab(index)}>
					<View style={_.iconBox}>
						<View style={_.iconImageBox}>
							<View style={allStyle}>
								{item.icon}{item.activeIcon}
							</View>
						</View>
						<Text style={_text}>{item.name}</Text>
					</View>
				</TouchableWithoutFeedback>
			);
		});

		return (
			<View style={_.footerBox}>
				{tabs}
			</View>
		);
	}
}