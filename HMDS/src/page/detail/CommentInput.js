import Component from '../../util/component';
import React from  'react';
import {View,Text,Image,TextInput,Platform,KeyboardAvoidingView,Keyboard} from 'react-native';

import _ from '../../style/detail/CommentInput';
import data from '../../util/data';
import Touchable from '../common/Touchable';

export default class commentInput extends Component {
	constructor(props){
		super(props);

		this.state = {
			show: false,
			text: '',
			type: 0, // 0:评论，1：回复
			canEmit: false
		};
	}

	componentDidMount(){
		this.on('showComment', (data)=>{
			this.type = data.type || '';
			this.hmItem = data;
			this.setState({
				show: true,
				type: 0,
			});
		});

		this.on('showReply', (data)=>{
			this.hmItem = data.hmItem;
			this.commentItem = data.commentItem;
			this.setState({
				show: true,
				type: 1,
			});
		});

	}


	onClose(){
		Keyboard.dismiss();
		this.setState({
			show: false,
            text: ''
		});
	}

	onBlur(){
		Keyboard.dismiss();
	}

	onSubmit(){
		let param = {
			content: this.state.text,
			hmid: this.hmItem.id
		};

		let api = data.addComment.bind(data);
		if (this.type == 'article'){
			param.id = this.hmItem.id;
			api = data.addArticleComment.bind(data);
		}
		if(this.state.type == 1) {
			param.commentid = this.commentItem.id;
			api = data.replyComment.bind(data);
			if (this.type == 'article'){
				api =data.replyArticleComment.bind(data);
			}
		}

		//发表评论|回复
		api(param, (res)=>{
			Keyboard.dismiss();
			this.state.show = false;
			this.state.text = '';
			this.forceUpdate();
			this.emit('updateCommentList', res.data);
		});
	}

	showEmit(){
		if(this.state.canEmit) {
			return (
				<Touchable style={_.emitBox} onPress={()=>this.onSubmit()}>
					<Text style={_.emit}>发表</Text>
				</Touchable>
			);
		} else {
			return (
				<View style={_.emitBox}>
					<Text style={_.emitDisable}>发表</Text>
				</View>
			);
		}
	}

	showInputTitle(){
		return (
			<View style={_.titleBox}>
				<View style={[_.titleTextBox]}>
					<Text style={_.titleText}>{this.state.type == 0 ? '评论' : '回复'}</Text>
				</View>
				<Touchable style={_.closeIconBox} onPress={()=>this.onClose()}>
					<Image style={_.closeIcon} resizeMode="cover" source={require('../../assets/Close_icon.png')}/>
				</Touchable>

				{this.showEmit()}
			</View>
		);
	}

	showInput(){
		return (
			<View style={_.inputTextBox}>
				<TextInput
					style={_.textarea}
					underlineColorAndroid="transparent"
					multiline={true}
					placeholder={`请输入${this.state.type == 0 ? '评论' : '回复'}的内容`}
					autoFocus={true}
					blurOnSubmit={true}
					onBlur={()=>this.onBlur()}
					onChangeText={(text) => {
						let canEmit = false;
						let testText = text.replace(/^\s*|\s*$/g, '');
						if(testText) {
							canEmit = true;
						}
						this.setState({text, canEmit});
					}}
					value={this.state.text}
				/>
			</View>
		);
	}

	render(){
		if(!this.state.show) {
			return null;
		}

		if(Platform.OS == 'ios') {
			return (
				<KeyboardAvoidingView style={_.inputBox} behavior="padding">
					<View style={_.input}>
						{this.showInputTitle()}
						{this.showInput()}
					</View>
				</KeyboardAvoidingView>
			);
		} else {
			return (
				<View style={_.inputBox}>
					<View style={_.input}>
						{this.showInputTitle()}
						{this.showInput()}
					</View>
				</View>
			);
		}
	}
}
