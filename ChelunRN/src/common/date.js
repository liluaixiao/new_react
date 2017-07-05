import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native';
import {Image} from 'react-native';
import {TouchableHighlight} from 'react-native';

import Calendar from '../calendar';
import {S} from '../style/common.date';

import {App} from './const';
import loginCheck from './login';
import {event} from './event';

export default class Date extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			calendar: App.calendar
		};
	}

	componentDidMount(){
		event.on('updateCalendar', ()=>{
			this.setState({calendar: App.calendar});
		});
	}

	onPress(item){
		loginCheck(()=>{
			let type = this.props.type;
			if(type == 'main') {
				this.props.navigation.navigate('Calendar', {item});
			}

			if(type == 'calendar') {
				this.props.load(item);
			}
		});
	}

	render(){

		let list = this.state.calendar.map((item, index)=>{
			let schedule = item.schedule;
			if(this.props.type == 'main' && schedule.length > 3) {
				schedule = schedule.slice(0, 3);
			}

			let schedules = schedule.map((sch)=>{
				let style = [S.diTip, S.text];
				if(sch.color){
					style.push({backgroundColor: sch.color});
				} else {
					style.push({backgroundColor: '#000'});
				}

				return <Text key={sch.id} style={style}>{sch.name}</Text>
			});

			let boxStyle = [S.dateItem];
			let dayStyle = [S.diText, S.text];
			let dayCNStyle = [S.diText];
			if(index == 6) {
				boxStyle.push(S.diNoBorder);
			}
			if(index == 1){
				dayStyle.push(S.diTextWithBorder);
			}

			if(item.isSunday) {
				dayStyle.push(S.diTextRed);
				dayCNStyle.push(S.diTextRed);
			}

			return (
				<TouchableHighlight key={item.dayCN} underlayColor="#f3f3f3" onPress={()=>this.onPress(item)} style={boxStyle}>
					<View>
						<View style={S.diTop}>
							<Text style={dayStyle}>{item.day}</Text>
							<Text style={dayCNStyle}>{item.dayCN}</Text>
						</View>
						{schedules}
					</View>
				</TouchableHighlight>
			);

		});

		return (
			<View style={S.date}>{list}</View>
		);
	}
}