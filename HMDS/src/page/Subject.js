import Component from '../util/component';
import React from 'react';
import {View, Text, Image, ScrollView, Platform} from 'react-native';

import _ from '../style/Subject';
import Header from './common/Header';
import ArticleThumbItem from './common/ArticleThumbItem';
import data from '../util/data';
import app from '../util/app';
import Share from './common/Share';


export default class Subject extends Component {
	constructor(props) {
		super(props);

		this.item = this.props.navigation.state.params.item;

		this.state = {
			info: {},
			list: [],
			shareCallback: () => {
			}
		};

	}

	componentDidMount() {
		app.stat('hmds-album', '专辑页点击');
		this.id = this.props.navigation.state.params.item.id;
		//获取banner
		data.subjectBanner({id: this.id}, (res) => {
			this.setState({
				info: res.data,
				shareCallback: () => {
					app.stat('hmds-album', '专辑页分享点击');
					this.emit('share', {
						channel: '',
						param: {
							title: res.data.title,
							summary: res.data.subTitle,
							image: res.data.img,
							url: 'https://h5.chelun.com/2017/rn_share/master.html?id=' + this.id
						},
						callback: (res)=>{
							if (res){
								data.shareWool({id:this.id, type:'subject'});
							}
						}
					});
				}
			});
		});
		data.subjectList({id: this.id}, (res) => {
			this.setState({list: res.data.list});
		})
	}


	//显示头部信息
	showTop() {
		return (
			<View style={_.topBox}>
				{this.state.info.img ? <Image style={_.topImg} source={{uri: this.state.info.img}}/> : null}
				<View style={_.titleBox}>
					<Text style={_.title}>{this.state.info.title}</Text>
					<Text style={_.subTitle}>{this.state.info.subTitle}</Text>
				</View>
			</View>
		);
	}

	//混合类型跳转
	mixJump(item){
		app.stat('hmds-album', '专辑页文章点击');
		if(item.type == 1) {
			this.props.navigation.navigate('Detail', {item:item.detail});
		} else if(item.type == 2) {
			this.props.navigation.navigate('MasterDetail', {item:item.detail});
		} else if(item.type == 3) {
			app.open(data.getAdUrl(data.AdTypeBanner, item.id, item.detail.adUrl));
		}
	}

	showList(){
		let list = this.state.list;
		if(!list || !Array.isArray(list) || list.length == 0) {
			return null;
		}

		return list.map((item, index)=>{
			let itemStyle = '';
			if (index == this.state.list.length - 1) {
				itemStyle = {borderBottomWidth: 0};
			}
			return (
				<ArticleThumbItem
					key={item.id}
					navigation={this.props.navigation}
					data={item}
					style={itemStyle}
					callback={() => {
						this.mixJump(item);
					}}
				/>
			);
		});
	}

	render() {
		return (
			<View style={_.page}>
				<Header
					menuType="share"
					navigation={this.props.navigation}
					callback={this.state.shareCallback}
				/>
				<ScrollView>
					{this.showTop()}
					{this.showList()}
				</ScrollView>
				<Share/>
			</View>
		);
	}
}