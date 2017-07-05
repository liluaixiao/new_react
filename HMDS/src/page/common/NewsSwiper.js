import Component from '../../util/component';
import React from 'react';
import {View, Text, Touchable, ScrollView, Animated, TouchableOpacity} from 'react-native';
import data from '../../util/data';

import _ from '../../style/main/Index';
import Swiper from './Swiper';
// import Touchable from 'Touchable.js';


export default class NewsSwiper extends Component{
	// state: {
	// 	yOffset: Animated
	// }
	constructor(props){
		super(props);

		// this.state = {
		// 	yOffset: new Animated.Value(1)
		// };
	}

	// componentDidMount() {
	// 	Animated.timing(
	// 		this.state.yOffset,{
	// 			toValue: 62,
	// 			duration: 100,
	// 	}).start();
	// }

	showNews() {

        return <View style={_.newsBox}>
            <View style={_.newsWrap}>
                <Text style={_.newsLabel}>优惠新闻</Text>
                	<Swiper
						showsPagination={false}
	                    horizontal={false}
	                    showsButtons={false}
	                    style={_.newsSwiper}
	                    height={62}
	                    autoplay={true}
	                    autoplayTimeout={1}
                	>
	                    <View style={{height: 62}}>
			                <View style={_.news} >
			                    <Text style={_.newsIcon}>文章1</Text>
			                    <Text style={_.newsText} >文章文章文章文章文章</Text>
			                </View>
			                <View style={_.news} >
			                    <Text style={_.newsIcon}>优惠1</Text>
			                    <Text style={_.newsText} >优惠优惠优惠优惠优惠优惠</Text>
			                </View>
			            </View>
			            <View style={{height: 62}}>
			                <View style={_.news} >
			                    <Text style={_.newsIcon}>文章2</Text>
			                    <Text style={_.newsText} >文章文章文章文章文章</Text>
			                </View>
			                <View style={_.news} >
			                    <Text style={_.newsIcon}>优惠2</Text>
			                    <Text style={_.newsText} >优惠优惠优惠优惠优惠优惠</Text>
			                </View>
			            </View>
			            <View style={{height: 62}}>
			                <View style={_.news} >
			                    <Text style={_.newsIcon}>文章3</Text>
			                    <Text style={_.newsText} >文章文章文章文章文章</Text>
			                </View>
			                <View style={_.news} >
			                    <Text style={_.newsIcon}>优惠3</Text>
			                    <Text style={_.newsText} >优惠优惠优惠优惠优惠优惠</Text>
			                </View>
			            </View>
			            <View style={{height: 62}}>
			                <View style={_.news} >
			                    <Text style={_.newsIcon}>文章4</Text>
			                    <Text style={_.newsText} >文章文章文章文章文章</Text>
			                </View>
			                <View style={_.news} >
			                    <Text style={_.newsIcon}>优惠4</Text>
			                    <Text style={_.newsText} >优惠优惠优惠优惠优惠优惠</Text>
			                </View>
			            </View>
			        </Swiper>
            </View>
        </View>
        
	}

	render() {
		return (
			<View>
				<ScrollView horizontal={false}>{this.showNews()}</ScrollView>
			</View>
		);
	}
}



// <ScrollView
//     style={_.newsSwiper}
//     height={62}
//     horizontal={false}
//     showsVerticalScrollIndicator={false}
//     onScroll={Animated.event(
//             [{nativeEvent: {contentOffset: {y: this.state.yOffset}}}]
//     )}
// >
//     <Animated.View 
//     	style={{
//     		transform: [{
//     			translateY: this.state.yOffset.interpolate({
// 			       inputRange: [0, 1],
// 			       outputRange: [62, 1]  
// 			     }),
//     		}]
//     	}}
//     >
//  		</Animated.View>
// </ScrollView>