import Component from '../../util/component';
import React from 'react';
import {View, Text,Image} from 'react-native';

import style from '../../style/Detail';
import data from '../../util/data';
import loginCheck from '../../util/login';
import Touchable from '../common/Touchable';

export default class Comment extends Component {
	constructor(props){
		super(props);

		this.item = this.props.item;
		this.type = this.props.type || '';

		this.state = {
			list: []
		};

		this.currentPage = 0;
		this.isLastPage = true;
		this._key = 0;
	}

	loadOnePage(){
		this.currentPage ++;

		if (this.type == 'article'){
			data.getArticleComment({
				id: this.item.id,
				page: this.currentPage
			}, (res)=>{
				this.isLastPage = res.data.isLastPage;
				this.state.list.push(...res.data.list)
				this.forceUpdate();
			});
		}else{
			data.getCommentList({
				id: this.item.id,
				isUserAdd: this.item.is_user_add,
				page: this.currentPage
			}, (res)=>{
				this.isLastPage = res.data.isLastPage;
				this.state.list.push(...res.data.list)
				// this.setState({
				// 	list: this.state.list
				// });
				this.forceUpdate();
			});
		}
	}

	componentDidMount(){
		this.loadOnePage();

		this.on('updateCommentList', (item)=>{
			this.state.list.unshift(item);
			// this.setState({
			// 	list: this.state.list
			// });
			this.forceUpdate();
		})
	}

	/**
	 * 显示评论列表
	 * @returns {Array}
	 */
	showList(){
		return this.state.list.map((item, index)=>{

			let itemStyle = [style.clItem];
			if(index == this.state.list.length - 1) {
				itemStyle.push(style.clItemWithoutBorder);
			}

			let replyBox = null;
			if(item.isReply) {
				replyBox = (
					<View style={style.replyBox}>
						<Text style={style.replyText}>
							回复<Text style={[style.replyUser]}>{item.replyUsername}：</Text>{item.replyContent}
						</Text>
					</View>
				);
			}

			return (
				<View key={`${item.id},${this._key++}`} style={itemStyle}>
					<View style={style.avatarBox}>
						<Image style={style.avatar} source={item.avatar?{uri:item.avatar}:null}/>
					</View>
					<Touchable style={style.contentBox} onPress={()=>this.onReply(item)}>
						<View style={style.user}>
							<Text style={style.usertext}>{item.username}</Text>
							<Text style={style.usertext}>{`${index+1}楼`}</Text>
						</View>
						{replyBox}
						<Text style={style.content}>{item.content}</Text>
						<View style={style.commentTimeBox}>
							<Text style={style.commentTime}>{item.commentTime}</Text>
							<View style={style.replyBtn}>
								<Image style={style.replyImage}  source={require('../../assets/Reply_icon.png')}/>
								<Text style={style.commentTime} >回复</Text>
							</View>
						</View>
					</Touchable>
				</View>
			);
		});
	}

	onComment(){
		loginCheck(()=>{
			this.emit('showComment', this.item);
		})
	}

	onReply(item){
		loginCheck(()=>{
			this.emit('showReply', {hmItem: this.item, commentItem: item});
		});
	}

	render(){
		let comment = null,title = null;
		if (this.type != 'article'){
			title = <Text style={style.commentTip}>评论</Text>;
			comment = <View style={style.commentBtn}>
				<View style={style.cbIcon}>
					<Image style={style.cbIconImage} source={require('../../assets/Logo_tab_icon.png')}/>
				</View>
				<Touchable style={style.cbClick} onPress={()=>this.onComment()}>
					<Text style={style.cbClickText}>我来评论</Text>
				</Touchable>
			</View>
		}
		return (
			<View style={style.comment}>
				{title}
				{comment}

				<View style={style.commentList}>
					{this.showList()}
				</View>

				{!this.isLastPage ? (<Touchable onPress={()=>{
					this.loadOnePage();
				}} style={[style.rowCenter, style.loadMoreBox]}>
					<Text style={style.loadMoreTexgt}>点击加载更多评论</Text>
				</Touchable>) : null}

			</View>
		);
	}
}
