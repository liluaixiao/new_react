import Component from '../../util/component';
import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import _ from '../../style/common/Loading';

export default class Loading extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<View style={_.body}>
				<View style={_.box}>
					<ActivityIndicator
						animating={true}
						color="#fff"
						size="large"
						style={_.loading}
					/>
				</View>
			</View>
		);
	}
}