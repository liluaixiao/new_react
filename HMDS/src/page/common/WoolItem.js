import Component from '../../util/component';
import React from 'react';
import {View, Image, Text} from 'react-native';

import _ from '../../style/common/WoolItem';
import Touchable from './Touchable';


export default class WoolItem extends Component{
	constructor(props){
		super(props);

		this.state = {
			data: props.data || null,
		};
	}

	componentWillReceiveProps(props){
		this.setState({data: props.data});
	}

	//跳转详情
	jumpDetail(item){
		this.props.onPress && this.props.onPress();
		this.props.navigation.navigate('Detail', {item});
	}

	render(){
		let data = this.state.data;
		if(!data || typeof data != 'object' || !data.id) {
			return null;
		}

		return (
			<Touchable style={_.item} onPress={()=>{
				this.jumpDetail(this.state.data);
			}}>
				<View style={_.itemImageBox}>
					<Image style={_.itemImage} source={data.img ? {uri:data.img} : null}/>
					{data.isms ? (<View style={_.itemMSBox}>
						<Text style={_.itemMSText}>秒杀</Text>
					</View>) : null}
				</View>
				<View style={[_.itemRight, this.props.style || {}]}>
					<Text style={_.itemTitle}>{data.title}</Text>
					<View style={_.itemInfoBox}>
						<Text style={_.botText}>{data.dateinfo}</Text>
						<View style={_.viewBox}>
							<Image style={_.viewIcon} source={require('../../assets/eye_icon.png')}/>
							<Text style={_.botText}>{data.viewNum}</Text>
						</View>
					</View>
				</View>
			</Touchable>
		);
	}
}