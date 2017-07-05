import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Linking,
	WebView
} from 'react-native';


import Head from './common/head';
import {S} from './style/detail';

import {net} from './common/net';
import loginCheck from './common/login';
import app from './common/common';
import {event} from './common/event';

export default class Detail extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			id: this.props.navigation.state.params.info.id,
			title: '',
			subTitle: '',
			flags: [],
			titleDesc: '',
			tags: [],
			startTime: '',
			endTime: '',
			repeat: '',
			detail: '',
			sourceUrl: '',
			hasRemind: false,
			webviewHeight: 200
		};
	}


	componentDidMount() {
		net.detailInfo({id:this.state.id}, (res)=>{
			this.setState({
				title: res.data.title,
				subTitle: res.data.subTitle,
				flags: res.data.flags,
				titleDesc: res.data.titleDesc,
				tags: res.data.tags,
				startTime: res.data.startTime,
				endTime: res.data.endTime,
				repeat: res.data.repeat,
				detail: res.data.detail,
				sourceUrl: res.data.sourceUrl,
				hasRemind: res.data.hasRemind
			});
		});
	}

	remind(){
		loginCheck(()=>{
			net.commonRemind({id: this.state.id}, (res)=>{
				if(res.data.result) {
					event.emit('refreshMain');
					this.setState({hasRemind: true});

					let startDate, endDate;
					if(this.state.endTime) {
						startDate = Math.ceil(Date.parse(this.state.startTime)/1000);
						endDate = Math.ceil(Date.parse(this.state.endTime)/1000);
					} else {
						endDate = Math.ceil(Date.parse(this.state.startTime)/1000);
						startDate = endDate;
					}

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
				}
			})
		});
	}

	jumpSource(url){
		app.open(url);
	}

	showRemind(){
		if(this.state.hasRemind == true) {
			return (
				<View style={[S.remind, {opacity:0.2}]}>
					<Image source={require('../assets/img/remind.png')}/>
					<Text style={{fontSize:12,color:'#333',marginTop:2}}>已提醒</Text>
				</View>
			);
		} else {
			return (
				<TouchableOpacity onPress={()=>this.remind()}>
					<View style={S.remind}>
						<Image source={require('../assets/img/remind.png')}/>
						<Text style={{fontSize:12,color:'#333',marginTop:2}}>提醒我</Text>
					</View>
				</TouchableOpacity>
			)
		}
	}

	render(){
		let html = `
<html>
<head>
<style>
body{padding:0;margin:0;overflow:scroll}
</style>
</head>
<body>
<div id="container">${this.state.detail}</div>
<script>
window.onload = function(){
	var height = document.getElementById('container').scrollHeight;
	document.title = String(height);
	window.location.hash = '#' + height;
}
</script>
</body></html>
`;

		return (
			<View style={S.page}>
				<Head
					navigation={this.props.navigation}
					titleComponent={<Text style={S.titleText}>活动详情</Text>}
				/>

				<ScrollView style={{flex:1}}>

					<Text style={{fontSize:24,color:'#313131',margin:10,fontWeight:'bold'}}>{this.state.title}</Text>
					<View style={S.smallTitle}>
						<Text style={{fontSize:18,color:'#333'}}>{this.state.subTitle}</Text>
						<View>
							{(this.state.flags || []).map((name)=>{
								return <Text style={[S.stTag, S.text]} key={name}>{name}</Text>
							})}
						</View>
					</View>
					<Text style={{fontSize:16,color:'#b6b6b6',marginBottom:10,marginLeft:10}}>{this.state.titleDesc}</Text>
					<View style={S.otagp}>
						{(this.state.tags || []).map((name)=>{
							return <Text key={name} style={[S.otag, S.text]}>{name}</Text>;
						})}
					</View>

					<View style={S.timeinfo}>
						<View style={this.state.endTime ? [S.tiItem, S.tiiWithBot] : [S.tiItem]}>
							<Text style={S.tit1}>开始时间</Text>
							<Text style={S.tit2}>{this.state.startTime}</Text>
						</View>
						{this.state.endTime ? (<View style={[S.tiItem]}>
							<Text style={S.tit1}>结束时间</Text>
							<Text style={S.tit2}>{this.state.endTime}</Text>
						</View>): null}
					</View>

					<View style={S.remindBox}>{this.showRemind()}</View>

					<View style={S.detail}>
						<Text style={S.detTitle}>优惠信息</Text>
						{/*<Text style={S.detDesc}>{this.state.detail}</Text>*/}
						<WebView
							style={[S.webview, {height: this.state.webviewHeight}]}
							javaScriptEnabled={true}
							source={{html}}
							onNavigationStateChange={(e)=>{
								let height = parseInt(e.title);
								if(height) {
									this.setState({webviewHeight:height});
								}
							}}
							dataDetectorTypes="none"
						/>
					</View>

				</ScrollView>

				<TouchableOpacity activeOpacity={0.5} onPress={()=>this.jumpSource(this.state.sourceUrl)}>
					<View style={S.source}>
						<Text style={{fontSize:14,color:'#586c94'}}>查看来源</Text>
						<View style={S.arrRight}></View>
					</View>
				</TouchableOpacity>

			</View>
		);
	}
}

