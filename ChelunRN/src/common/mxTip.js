import React from 'react';
import {View} from 'react-native';
import {Image} from 'react-native';
import {Text} from 'react-native';
import {StyleSheet} from 'react-native';


export default class MxTip extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<View style={[styles.mxTip, this.props.style]}>
				<Image source={this.props.icon}/>
				<Text style={styles.mxTipText}>{this.props.title}</Text>
			</View>
		);
	}
}


let styles = StyleSheet.create({
	mxTip: {
		backgroundColor: '#dfdfdf',
		height: 20,
		width: 110,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-start',
		paddingLeft: 10
	},
	mxTipText: {
		fontSize: 12,
		color: '#666',
		marginLeft: 5
	},
});