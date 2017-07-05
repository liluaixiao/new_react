import Component from '../../util/component';
import React from 'react';
import {View, Image, Text} from 'react-native';

import _ from '../../style/common/ArticleThumbItem';
import Touchable from './Touchable';
import app from '../../util/app';

export default class ArticleThumbItem extends Component{
	constructor(props){
		super(props);

		this.state = {
			data: props.data || null
		};
	}

	componentWillReceiveProps(props){
		this.setState({data: props.data});
	}

	render(){
		let data = this.state.data;
		if(!data || typeof data != 'object' || !data.id) {
			return null;
		}

		return (
			<View style={_.itemBox}>
				<Touchable style={[_.item, this.props.style || {}]}
						   onPress={()=>{this.props.callback();}}>
					<View style={_.imgBox}>
						<Image style={_.img} source={data.img?{uri:data.img}:null}/>
					</View>
					<View style={_.detail}>
						<Text style={_.title}>{data.title}</Text>
						<View style={_.infoBox}>
							<Text style={_.date}>{data.date}</Text>
							<View style={_.visitBox}>
								<Image style={_.visitIcon} source={require('../../assets/eye_icon.png')}/>
								<Text style={_.date}>{data.visitNum}</Text>
							</View>
						</View>
					</View>
				</Touchable>
			</View>
		);
	}
}