import Component from '../../util/component';
import React from 'react';
import {View, Image, Text, ScrollView} from 'react-native';
import _ from '../../style/profile/Task';

import Header from '../common/Header';
import data from '../../util/data';

export default class Task extends Component {
	constructor(props){
		super(props);

		this.state = {
			newcomer: [],
			daily: []
		};
	}

	componentDidMount(){
		data.getTaskList((res)=>{
			this.setState({newcomer:res.data.newcomer, daily: res.data.daily});
		});
	}

	item(item){
		let task = null;
		if (item.taskNum != '0'){
			task = <View>
				<Text style={_.score}>{item.finishedNum}/{item.taskNum}</Text>
			</View>
		}

		return (
			<View style={_.item} key={item.id}>
				<View>
					<Text style={_.taskTitle}>{item.name}</Text>
					<View style={_.taskScore}>
						<Image style={_.scoreIcon} source={require('../../assets/moeny_icon_yellow.png')}/>
						<Text style={_.score}>{item.score}</Text>
					</View>
				</View>
				{ task }
			</View>
		);
	}

	showNewcomer(){
		let list = this.state.newcomer;
		if(!list || !Array.isArray(list) || list.length == 0) {
			return null;
		}

		return (
			<View>
				<View style={_.secBox}>
					<Text style={_.secTitle}>新手任务</Text>
				</View>
				{list.map((item)=>{
					return this.item(item);
				})}
			</View>
		);
	}

	showDaily(){
		let list = this.state.daily;
		if(!list || !Array.isArray(list) || list.length == 0) {
			return null;
		}

		return (
			<View>
				<View style={_.secBox}>
					<Text style={_.secTitle}>日常任务</Text>
				</View>
				{list.map((item)=>{
					return this.item(item);
				})}
			</View>
		);
	}

	render(){
		return (
			<View style={_.page}>
				<Header
					title="我的任务"
					navigation={this.props.navigation}
				/>
				<ScrollView style={_.body} alwaysBounceVertical={false}>
					{this.showNewcomer()}
					{this.showDaily()}
				</ScrollView>
			</View>
		);
	}
}