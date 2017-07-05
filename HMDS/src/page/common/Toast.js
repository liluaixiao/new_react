import Component from '../../util/component';
import React from 'react';
import {View, Text, Dimensions, Animated, Easing} from 'react-native';
import style from  '../../style/common/Toast';

export default class Toast extends Component{
	constructor(props){
		super(props);
		this.state = {
			show: false,
			content: '',
			left: 0,
			bottom: 40,
			opacity: new Animated.Value(0),
		};

		this.isShow = false;
	}

	componentDidMount(){
		this.on('toast', (content)=>{
			if(this.isShow) return ;
			this.isShow = true;
			this.setState({show: true, content});
		})
	}

	render(){
		if(this.state.show) {
			return (
				<Animated.View style={[style.toast, {
					left:this.state.left,
					bottom:this.state.bottom,
					opacity: this.state.opacity
				}]} onLayout={(e)=>{
					const {width: clientWidth, height: clientHeight} = Dimensions.get('window');
					this.setState({
						left: (clientWidth - e.nativeEvent.layout.width)/2,
						opacity: new Animated.Value(0.8),
					}, ()=>{
						setTimeout(()=>{
							Animated.timing(
								this.state.opacity,
								{
									toValue: 0,
									easing: Easing.linear,
									duration: 300
								},
							).start((e)=>{
								if(e.finished){
									this.isShow = false;
									this.setState({
										show: false,
										opacity: new Animated.Value(0.8)
									});
								}
							});
						}, 3000);
					})
				}}>
					<Text style={style.toastContent}>{this.state.content}</Text>
				</Animated.View>
			);
		}

		return null;
	}
}