import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	BackAndroid,
	NativeModules,
	TouchableOpacity
} from 'react-native';

import app from './common';
import Calendar from '../calendar';
import {event,listener} from './event';
import loginCheck from './login';

export default class Head extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			showDot: false
		};

		this.navigation = this.props.navigation;
	}

	componentDidMount(){
		//状态改变被通知
		event.emit('dotStatusChange', listener.showDot.bind(this));
	}

	back(){
		if(this.props.navigation.state.routeName == 'Main') {
			app.exit();
		} else {
			this.props.navigation.goBack(null);
		}
	}

	getRemind(){
		if(!this.props.hideRemind) {
			return (
				<TouchableOpacity underlayColor="#00B3FF"  style={S.icon} onPress={()=>{
					loginCheck(()=>{
						this.props.navigation.navigate('Calendar');
					});
				}}>
					<View style={S.remind}>
						<Image source={require('../../assets/img/remind.png')}/>
						{this.state.showDot && <View style={S.remindDot}></View>}
					</View>
				</TouchableOpacity>
			);
		}
	}

	render(){
		return (
			<View style={S.header}>
				<View style={S.title}>
					{this.props.titleComponent || null}
				</View>
				<TouchableOpacity onPress={()=>this.back()}>
					<View style={S.navBackBox}><View style={S.navBack}></View></View>
				</TouchableOpacity>
				<View style={S.menu}>
					<TouchableOpacity underlayColor="#00B3FF" style={S.icon} onPress={()=>{
						{/*app.open('chelun://plate/post/publish/9511')*/}
						app.open('chelun://forum/normal/open/9511')
					}}>
						<Image source={require('../../assets/img/delivery.png')}/>
					</TouchableOpacity>
					{this.getRemind()}
				</View>
			</View>
		);
	}
}

let S = StyleSheet.create({
	header: {
		borderBottomWidth: 1,
		borderStyle: 'solid',
		flexDirection: 'row',
		borderBottomColor: '#e5e5e5',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	navBackBox: {
		height: 44,
		width: 44,
		justifyContent: 'center',
		alignItems: 'center'
	},
	navBack: {
		borderStyle: 'solid',
		borderTopWidth: 2,
		borderLeftWidth: 2,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		borderTopColor: '#333',
		borderLeftColor: '#333',
		width: 12,
		height: 12,
		transform: [{rotate: '-45deg'}]
	},
	title: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	menu: {
		flexDirection: 'row',
		alignItems: 'center',
		// marginRight: 10,
		// width: 54,
		justifyContent: "flex-end"
	},
	remindDot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: '#D0011B',
		position: 'absolute',
		top: 1,
		right: 0
	},
	icon: {
		height: 44,
		width: 44,
		justifyContent: 'center',
		alignItems: 'center'
	}
});