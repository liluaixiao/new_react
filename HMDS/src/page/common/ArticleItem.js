import Component from '../../util/component';
import React from 'react';
import {View, Image, Text, Dimensions} from 'react-native';

import _ from '../../style/common/ArticleItem';
import Touchable from './Touchable';

//获取屏幕宽度
const {width} = Dimensions.get('window');

export default class ArticleItem extends Component{
	constructor(props){
		super(props);

		this.state = {
			data: props.data || null,
			withUserInfo: props.withUserInfo === undefined ? true : props.withUserInfo
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

		//336*170
		let bigImageStyle = {width: width - 40};
		bigImageStyle.height = bigImageStyle.width * 170 / 336;
		return (
			<View style={[_.art, this.props.style || {}]} >
				{this.state.withUserInfo ? (<View style={_.artUser}>
					<Image style={_.artAvatar} source={data.avatar?{uri:data.avatar}:null}/>
					<Text style={_.artName}>{data.name}</Text>
					<Text style={_.artIntro} numberOfLines={2}>{data.intro}</Text>
				</View>) : null}
				<Touchable onPress={this.props.onPress}>
					<Text style={_.artTitle}>{data.title}</Text>
					{!data.img?null:(<Image resizeMode="cover" style={[_.artImage, bigImageStyle]} source={data.img ? {uri:data.img} : null}/>)}
					<Text style={_.artDesc} numberOfLines={2}>{data.subTitle}</Text>
				</Touchable>
				<Text style={_.artOther}>{`${data.favorNum}赞同  ·  ${data.commentNum}评论`}</Text>
			</View>
		);
	}
}