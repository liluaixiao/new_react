import Component from '../../util/component';
import React from 'react';
import {View, Image, Text} from 'react-native';
import _ from '../../style/common/Header';
import Touchable from './Touchable';

import app from '../../util/app';
import loginCheck from '../../util/login';

export default class Head extends Component {
	constructor(props){
		super(props);
		this.state = {
			title: this.props.title != undefined ? this.props.title : '车主生活惠',
			menuType: props.menuType || 'none',
			//显示隐藏返回按钮
			showNavBack: props.hideNavBack?false: true,

			//添加按钮
			canAdd: false,

			//编辑状态
			editStatus: 0, //0：编辑，1：完成

			//QA标题栏cls
			proCls: [_.titleNeg, _.titleAct],
			woolCls: _.titleNeg,

            local: {}
		}
	}

	componentDidMount(){
		this.on('addStatusChange', (canAdd)=>{
			this.setState({
				canAdd
			});
		});

		this.on('showCalendarMenu', ()=>{
			this.setState({
				menuType: 'calendar'
			});
		});

		this.on('hideCalendarMenu', ()=>{
			this.setState({
				menuType: 'none'
			})
		});

		this.on('showProfileMenu', ()=>{
			this.setState({
				menuType: 'profile'
			});
		});

		//显示返回按钮
		this.on('showNavBack', ()=>{
			this.setState({showNavBack: true});
		});

		//隐藏返回按钮
		this.on('hideNavBack', ()=>{
			this.setState({showNavBack: false});
		});

		//QA页面标题切换
		this.on('switch', (data)=>{
			if (data.type == 'wool'){
				this.state.proCls = _.titleNeg;
				this.state.woolCls = [_.titleNeg, _.titleAct];
			}else{
				this.state.proCls = [_.titleNeg, _.titleAct];
				this.state.woolCls = _.titleNeg;
			}
			this.forceUpdate();
		});

        //显示发现
        this.on('Discover', (local)=>{
            this.setState({
                menuType: 'discover',
                local: local
            })
        });
	}

	//显示菜单
	showMenu(type){
		let menu = null;
		switch(type){
			case 'none':
				break;
			case 'profile': //显示个人中心图标
				menu = this.showProfile();
				break;
			case 'share': //显示分享按钮
				menu = this.showShare();
				break;
			case 'subs': //显示订阅图标
				menu = this.showSubs();
				break;
			case 'add': //显示添加按钮
				menu = this.showAdd();
				break;
			case 'calendar': //显示日历按钮
				menu = this.showCalendar();
				break;
			case 'mall': //显示我的兑换
				menu = this.showExchange();
				break;
			default:
				break;
		}
		return menu;
	}

	//显示薅币商城右上角我的兑换
	showExchange(){
		return (
			<Touchable style={[_.exchange, _.rowCenter]} onPress={()=>{
				this.props.navigation.navigate('Exchange');
			}}>
				<Text style={_.canAddText}>我的兑换</Text>
			</Touchable>
		);
	}

	//显示日历相关按钮
	showCalendar(){
		let text = '编辑',
			textStyle = [_.editText];
		if(this.state.editStatus == 1){
			text = '完成';
			textStyle.push(_.editTextRed);
		}

		return (
			<Touchable style={[_.menuItem, _.rowCenter]} onPress={()=>{
				this.setState({editStatus: this.state.editStatus == 0 ? 1 : 0});
				this.emit('editStatusChange', this.state.editStatus);
			}}>
				<Text style={textStyle}>{text}</Text>
			</Touchable>
		);
	}

	//显示添加按钮
	showAdd(){
		if(this.state.canAdd) {
			return (
				<Touchable style={[_.menuItem, _.rowCenter]} onPress={()=>{
					this.emit('addBtnPress');
				}}>
					<Text style={_.canAddText}>添加</Text>
				</Touchable>
			);
		} else {
			return (
				<View style={[_.menuItem, _.rowCenter]}>
					<Text style={_.canNotAddText}>添加</Text>
				</View>
			);
		}
	}

	//显示个人中心图标
	showProfile(){
		return (
			<Touchable style={_.profile} onPress={()=>{
				loginCheck(()=>{
					this.props.navigation.navigate('Profile');
					app.stat('hmds-my', '我的页PV');
				});
			}}>
				<Image style={_.profileIcon} source={require('../../assets/Uer_center_icon.png')}/>
			</Touchable>
		);
	}

	//显示分享图标
	showShare(){
		return (
			<Touchable style={_.profile} onPress={()=>{
				this.props.callback();
			}}>
				<Image style={_.shareIcon} source={require('../../assets/Share_icon.png')}/>
			</Touchable>
		);
	}

	//显示订阅图标
	showSubs(){
		return (
			<Touchable style={_.subs} onPress={()=>{
				this.props.callback();
			}}>
				<Text style={this.props.text=='订阅'?_.subsIcon:_.disSubsIcon}>{this.props.text}</Text>
			</Touchable>
		)
	}


	navBack(){
		if(this.props.navigation.state.routeName == 'Main') {
			app.exit();
		} else {
			this.props.navigation.goBack(null);
		}
	}

	showNavComponent(){
		if(this.state.showNavBack) {
			return (
				<Touchable onPress={()=>this.navBack()} style={_.backBox}>
					<View style={_.navBackIcon}/>
				</Touchable>
			);
		} else {
			return (<View/>);
		}
	}

    //显示筛选
    showSlide(){
        this.emit('showSlide');
    }

    //显示城市选择
    showCity(){
        this.emit('showCity');
    }

    //显示搜索
    showSearch(){
        this.emit('showSearch');
    }

	render(){
		//QA页面标题
		if (this.props.menuType == 'QA'){
			return (
				<View style={_.container}>
					<View style={_.titleBox}>
						<Touchable style={this.state.proCls}onPress={()=>{
							this.state.proCls = [_.titleNeg, _.titleAct];
							this.state.woolCls = _.titleNeg;
							this.forceUpdate();
							this.props.callback('problem');
						}}>
							<Text style={[{color: '#000', fontSize:17},this.state.proCls == _.titleNeg?{opacity:0.5}:null]}>常见问题</Text>
						</Touchable>
						<Touchable style={this.state.woolCls} onPress={()=>{
							this.state.proCls = _.titleNeg;
							this.state.woolCls = [_.titleNeg, _.titleAct];
							this.forceUpdate();
							this.props.callback('wool');
						}}>
							<Text style={[{color: '#000', fontSize:17},this.state.woolCls == _.titleNeg?{opacity:0.5}:null]}>羊毛记录</Text>
						</Touchable>
					</View>
					<View style={_.btn}>
						{this.showNavComponent()}
					</View>
				</View>
			)
		}

		return (
			<View style={_.container}>
				<View style={[_.title]}>
					<Text style={_.titleText}>{this.props.title?this.props.title:'车主生活惠'}</Text>
				</View>
				<View style={_.btn}>
					{this.showNavComponent()}
					<View style={_.right}>{this.showMenu(this.state.menuType)}</View>
				</View>
			</View>
		);
	}
}