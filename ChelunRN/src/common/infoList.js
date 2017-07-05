import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Detail from '../detail';
import {S} from '../style/common.infolist';

export default class InfoList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let list = this.props.list.map(item => {
			return <InfoItem navigation={this.props.navigation} key={item.id} item={item} />
		});

		return <View style={{alignSelf: 'stretch'}}>{list}</View>;
	}
}

export class InfoItem extends React.Component{
	constructor(props){
		super(props);
	}

	jumpDetail(info) {
		this.props.navigation.navigate('Detail', {info});
	}

	render(){

		let item = this.props.item;
		if(typeof item.tag == 'string') {
			item.tag = [item.tag];
		}

		let icon = item.icon ? {uri: item.icon} : null;
		let flags = item.flag || [];
		let flagList = flags.map(name => {
			return <View key={name}><Text style={[S.flag, S.text]}>{name}</Text></View>
		});

		return (
			<TouchableOpacity activeOpacity={0.5} onPress={() => this.jumpDetail(item)}>
				<View style={S.recItem}>
					<View style={{marginLeft: 10, marginRight: 10,width: 60, height: 60}}>
						<Image style={{width: 60, height: 60}} source={icon}/>
					</View>
					<View style={{flex: 1}}>
						<View style={{flexDirection: 'row', alignItems: 'flex-start',flexWrap:'wrap'}}>
							<Text style={{fontSize: 16, color: '#313131'}}>{item.title}</Text>
							{flagList}
						</View>
						<Text style={{
							fontSize: 12,
							color: '#b6b6b6',
							marginTop: 5,
							marginBottom: 5
						}}>{item.typeName}</Text>
						<View style={S.recIB}>
							{item.tag.map((tag)=>{
								return <Text key={tag} style={[S.rcib1, S.text]}>{tag}</Text>
							})}
							<Text style={S.rcib2}>{item.desc}</Text>
							<View style={S.rcib3}>
								<Text style={{fontSize: 12, color: '#fff', lineHeight: 14}}>{item.star}</Text>
								<Image source={require('../../assets/img/star.png')}/>
							</View>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}
