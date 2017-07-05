import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	TextInput,
	Switch,
	DatePickerIOS,
	DatePickerAndroid
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import Head from './common/head';
import {S} from './style/add';
import {net} from './common/net';
import alert from './common/alert';
import {event} from './common/event';

export default class Add extends React.Component{
	constructor(props){
		super(props);

		let now = moment();
		this.from = now.format("YYYY-MM-DD HH:mm");
		this.to = now.add(7, 'd').format("YYYY-MM-DD HH:mm");

		this.state = {
			title: '',
			intro: '',
			startTime: this.from,
			endTime: this.to,
			// repeat: 1,
			url: '',
			ismx: true,
			canShare: false
		};
	}

	add(){
		let title = this.state.title,
			intro = this.state.intro,
			startTime = this.state.startTime,
			endTime = this.state.endTime,
			url = this.state.url,
			ismx = this.state.ismx ? 1 : 0,
			canShare = this.state.canShare ? 1 : 0;

		if(!title) {
			alert('标题不能为空');
			return ;
		}
		if(!startTime) {
			alert('请选择开始时间');
			return ;
		}

		if(Date.parse(startTime) > Date.parse(endTime)) {
			alert('结束时间不能小于开始时间');
			return ;
		}

		net.calendarAdd({title,intro,startTime,endTime,url,ismx,canShare}, (res)=>{
			if(res.data.result) {
				event.emit('refreshMain');
				event.emit('updateCalendarList');

				let startDate = Math.ceil(Date.parse(startTime)/1000)
				let endDate = Math.ceil(Date.parse(endTime)/1000);

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

				this.props.navigation.goBack(null);
			}
		})
	}

	ismx(value){
		this.setState({ismx: value});
	}
	canShare(value){
		this.setState({canShare: value});
	}

	render(){

		// let now = moment();
		// let from = now.format("YYYY-MM-DD HH:mm");
		// let to = now.add(7, 'd').format("YYYY-MM-DD HH:mm");

		return (
			<View style={S.page}>
				<Head
					navigation={this.props.navigation}
					titleComponent={<Text style={S.titleText}>添加薅毛信息</Text>}
				/>
				<ScrollView style={S.body}>
					<TextInput
						style={S.textInput}
						multiline={true}
						placeholder="在此输入信息标题"
						underlineColorAndroid="transparent"
						value={this.state.title}
						onChangeText={value=>this.setState({title:value})}
					/>

					<TextInput
						style={S.textInput}
						multiline={true}
						placeholder="在此输入信息介绍"
						underlineColorAndroid="transparent"
						value={this.state.intro}
						onChangeText={value=>this.setState({intro:value})}
					/>

					<View style={S.ul}>
						<View style={[S.li,S.liWithoutPad]}>
							<Text style={S.liLeft}>开始时间</Text>
							<TouchableOpacity>
								<View style={S.liRight}>
									<DatePicker
										style={dateStyle}
										date={this.state.startTime}
										mode="datetime"
										showIcon={false}
										placeholder={this.from}
										format="YYYY-MM-DD HH:mm"
										minDate={this.from}
										maxDate={this.to}
										confirmBtnText="确认"
										cancelBtnText="取消"
										customStyles={dateCustomStyle}
										onDateChange={(date) => {
											this.setState({startTime:date})
										}}
									/>
									<View style={S.arrowRight}></View>
								</View>
							</TouchableOpacity>
						</View>
						<View style={[S.li, S.liWithoutPad, S.withoutBt]}>
							<Text style={S.liLeft}>结束时间</Text>
							<TouchableOpacity>
								<View style={S.liRight}>
									<DatePicker
										style={dateStyle}
										date={this.state.endTime}
										mode="datetime"
										showIcon={false}
										placeholder={this.to}
										format="YYYY-MM-DD HH:mm"
										minDate={this.from}
										maxDate={this.to}
										confirmBtnText="确认"
										cancelBtnText="取消"
										customStyles={dateCustomStyle}
										onDateChange={(date) => {
											this.setState({endTime:date})
										}}
									/>
									<View style={S.arrowRight}></View>
								</View>
							</TouchableOpacity>
						</View>
						{/*<View style={[S.li, S.withoutBt]}>*/}
							{/*<Text style={S.liLeft}>重复</Text>*/}
							{/*<TouchableOpacity>*/}
								{/*<View style={S.liRight}>*/}
									{/*<Text style={S.lirt}>仅一次</Text>*/}
									{/*<View style={S.arrowRight}></View>*/}
								{/*</View>*/}
							{/*</TouchableOpacity>*/}
						{/*</View>*/}
					</View>

					<TextInput
						style={S.textInput}
						multiline={true}
						placeholder="在此输入来源网址"
						underlineColorAndroid="transparent"
						value={this.state.url}
						onChangeText={value=>this.setState({url:value})}
					/>

					<View style={S.ul}>
						<View style={S.li}>
							<Text style={S.liLeft}>是否是秒杀资源</Text>
							<Switch value={this.state.ismx} onValueChange={(e)=>this.ismx(e)}/>
						</View>
						<View style={[S.li, S.withoutBt]}>
							<Text style={S.liLeft}>是否愿意共享</Text>
							<Switch value={this.state.canShare} onValueChange={(e)=>this.canShare(e)}/>
						</View>
					</View>

					<Text style={S.tip}>当你共享薅毛信息后，若被我们选中，将得到我们的奖励</Text>

				</ScrollView>
				<TouchableOpacity activeOpacity={0.5} onPress={()=>this.add()}>
					<View style={S.btn}>
						<Text style={{fontSize:18,color:'#fff'}}>添加</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

let dateStyle = {
	marginRight: 10,
	padding: 0,
	width: 200,
	marginLeft: 0,
	marginTop: 0
};

let dateCustomStyle = {
	dateInput: {
		margin: 0,
		padding: 0,
		alignItems: 'flex-end',
		paddingLeft: 10,
		borderWidth: 0,
		//marginTop: 3,
	},
	dateText: {
		fontSize: 17,
		color: '#c7c7c7'
	},
	placeholderText: {
		color: '#c7c7c7',
		fontSize: 17
	},
	btnTextConfirm: {
		color: '#0076FF'
	}
};