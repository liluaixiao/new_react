import Component from '../util/component';
import React from 'react';
import {View, TextInput, Image, Text, Switch, Keyboard} from 'react-native';
import _ from '../style/Add';

import Header from './common/Header';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import Toast from './common/Toast';
import data from '../util/data';
import Touchable from './common/Touchable';

import app from '../util/app';

export default class Add extends Component {
	constructor(props) {
		super(props);

		let from = moment().format("YYYY-MM-DD HH:mm");

		this.state = {
			title: '',
			url: '',
			detail: '',
			startTime: from,
			endTime: from,
			isms: true,
			canShare: true
		};
	}

	componentDidMount(){
		app.stat('hmds-calender', '新增羊毛页点击');
		this.on('addBtnPress', ()=>{
			Keyboard.dismiss();

			//发送添加请求
			if(this.state.url && !/^https?:\/\//.test(this.state.url)) {
				this.emit('toast', '来源网址格式错误');
				return ;
			}
			if(this.state.endTime && (Date.parse(this.state.startTime)>Date.parse(this.state.endTime))){
				this.emit('toast', '开始时间不能大于结束时间');
				return ;
			}

			data.addHM(this.state, (res)=>{
				if(res.data.result) {
					this.emit('onAddCustomSuccess');
					//添加成功，返回上一页
					this.props.navigation.goBack(null);
				}else{
					this.emit('toast', res.msg);
				}
			});
		})
	}

	/**
	 * 检测添加按钮是否点亮
	 */
	checkCanAdd(){
		if(!this.state.title) {
			this.emit('addStatusChange', false);
		} else {
			this.emit('addStatusChange', true);
		}
	}

	dateCustomStyle(){
		return {
			dateInput: {
				alignItems: 'flex-end',
				borderColor: 'transparent'
			},
			dateText: {
				fontSize: 14,
				color: '#313131',
				textAlign: 'right'
			},
			placeholderText: {
				fontSize: 14,
				color: '#999',
			},
			btnTextConfirm: {
				color: '#FF2843'
			}
		};
	}

	render() {

		let startMaxDate = moment(this.state.startTime).add(1, 'y').format("YYYY-MM-DD HH:mm");
		let endMaxDate = moment(this.state.endTime).add(1, 'y').format("YYYY-MM-DD HH:mm");

		return (
			<View style={_.page}>
				<Header
					title="添加羊毛"
					navigation={this.props.navigation}
					menuType="add"
				/>
				<View style={_.inputBox}>
					<View style={[_.inputItem]}>
						<TextInput
							style={_.input}
						   	placeholder="标题"
							placeholderTextColor="#aaa"
						   	onChangeText={(title) => {
								this.setState({title}, ()=>{
									this.checkCanAdd();
								});
							}}
							underlineColorAndroid="transparent"
						/>
					</View>
					<View style={[_.inputItem, _.url]}>
						<TextInput
							style={_.input}
							placeholder="来源网址"
							placeholderTextColor="#aaa"
							onChangeText={(url) => {
								this.setState({url});
							}}
							underlineColorAndroid="transparent"
						/>
					</View>
					<View style={_.detail}>
						<TextInput
							style={_.textarea}
							multiline={true}
							placeholder="详细描述"
							placeholderTextColor="#aaa"
							onChangeText={(detail) => this.setState({detail})}
							underlineColorAndroid="transparent"
						/>
					</View>
				</View>

				<View style={_.selectBox}>
					<View style={_.dateBox}>
						<Touchable style={_.datePress}>
							<Text>开始时间</Text>
							<DatePicker
								style={_.dateStyle}
								date={this.state.startTime}
								mode="datetime"
								showIcon={false}
								placeholder={this.state.startTime}
								format="YYYY-MM-DD HH:mm"
								minDate={this.state.startTime}
								maxDate={startMaxDate}
								confirmBtnText="确认"
								cancelBtnText="取消"
								customStyles={this.dateCustomStyle()}
								onDateChange={(date) => {
									let state = {startTime:date};
									if(date > this.state.endTime) {
										state.endTime = date;
									}
									this.setState(state)
								}}
							/>
						</Touchable>
					</View>
					<View style={[_.dateBox, _.dateBoxWithBorder]}>
						<Touchable style={_.datePress}>
							<Text>结束时间</Text>
							<DatePicker
								style={_.dateStyle}
								date={this.state.endTime}
								mode="datetime"
								showIcon={false}
								placeholder={this.state.startTime}
								format="YYYY-MM-DD HH:mm"
								minDate={this.state.startTime}
								maxDate={endMaxDate}
								confirmBtnText="确认"
								cancelBtnText="取消"
								customStyles={this.dateCustomStyle()}
								onDateChange={(date) => {
									this.setState({endTime:date})
								}}
							/>
						</Touchable>
					</View>
				</View>

				<View style={_.selectBox}>
					{/*<View style={_.switch}>*/}
						{/*<Text style={_.switchText}>秒杀资源</Text>*/}
						{/*<Switch value={this.state.isms} onValueChange={(isms)=>{*/}
							{/*this.setState({isms});*/}
						{/*}}/>*/}
					{/*</View>*/}
					<View style={[_.switch, _.dateBoxWithBorder]}>
						<Text style={_.switchText}>是否愿意共享</Text>
						<Switch value={this.state.canShare} onValueChange={(canShare)=>{
							this.setState({canShare});
						}}/>
					</View>
				</View>

				<Toast />
			</View>
		);
	}
}