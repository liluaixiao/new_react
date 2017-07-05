import Component from '../../util/component';
import React from 'react';
import {View, Image, Text, ScrollView, Dimensions, TouchableOpacity} from 'react-native';

import _ from '../../style/main/Home';
import ArticleItem from '../common/ArticleItem';
import data from '../../util/data';

import loginCheck from '../../util/login';
import Touchable from '../common/Touchable';
import app from '../../util/app';
import Header from '../common/Header';
import Swiper from 'react-native-swiper';

//获取屏幕宽度
const {width} = Dimensions.get('window');

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			todayTotal: 0,
			recommend: {
				banner: [],
				list: []
			},
			master: [],
			articles: null
		};

		this.key = 0;
	}

	//更新今日新薅毛事项总数
	updateTotal(){
		data.getTodayTotal((res)=>{
			this.setState({todayTotal: res.data.total});
		});
	}

	componentDidMount(){

		//初始化加载一次
		this.on('triggerHomeLoad', ()=>{
			//获取今日新薅毛事项总数
			this.updateTotal();
			
			//获取推荐的列表
			// data.getRecommend((res)=>{
			// 	this.setState({recommend: res.data});
			// });

			//获取推荐的列表，支持多种格式
			data.homeRecommend((res)=>{
				if(res.code == 200) {
					this.setState({recommend: res.data});
				}
			});

			//获取推荐的专场
			data.homeRecommendSubject({location: 0}, (res)=>{
				this.setState({master: res.data});
			});

			//获取一篇推荐的文章
			// data.homeRecommendArticle((res)=>{
			// 	this.setState({article: res.data});
			// });

			//获取多篇推荐的文章
			data.homeArticleList((res)=>{
				this.setState({articles: res.data});
			});
		});

		//监听更新今日总数
		this.on('updateTodayTotal', ()=>{
			this.updateTotal();
		});
	}

	//显示顶部tip
	showTip(todayTotal) {
		if (!todayTotal) return null;
		return (
			<View style={_.today}>
				<Touchable onPress={()=>{
					app.stat('hmds-index', '今日提示点击');
					this.props.navigation.navigate('Calendar');
					{/*this.emit('changeTab', 3);*/}
				}}>
					<View style={_.todayBox}>
						<View style={_.todayLeft}>
							<Image source={require('../../assets/logo_red_icon.png')} style={_.calendarIcon}/>
							<Text style={_.todayTip}>您今日有{todayTotal}个薅毛事项</Text>
						</View>
						<View style={_.todayArrow}/>
					</View>
				</Touchable>
			</View>
		);
	}

	/**
	 * 生成表格的行数据
	 * @param data
	 */
	getGridRow(data) {
		if (!data || !Array.isArray(data) || data.length == 0) {
			return [];
		}
		// 填充办卡banner位
		if (data[0].id != 0){
			data.unshift({
				id: 0,
				img: 'https://picture.eclicks.cn/g1/img/2017/06/19/342e45a95bc84233_474_345.jpg',
				title: '车轮办卡中心',
				dateinfo: '选择一张适合自己的信用卡',
				type: 4,
				detail:{}
			});
		}


		let grid = [];
		let len = Math.ceil(data.length / 2);
		for (let i = 0; i < len; i++) {
			let pair = [data[i * 2]];
			if (i != len - 1 || data[i * 2 + 1]) {
				pair.push(data[i * 2 + 1]);
			}
			grid.push(pair);
		}
		return grid;
	}

	/**
	 * 显示网格数据
	 * @param grid
	 */
	showGrid(grid) {
		if (!Array.isArray(grid)) return null;

		//158*115
		let smallImageStyle = {width: (width - 60) / 2};
		smallImageStyle.height = smallImageStyle.width * 115 / 158;

		return grid.map((row, index) => {
			let itemStyle = [_.hmItemRow];
			if (index < grid.length - 1) {
				itemStyle.push(_.hmItem);
			}
			let items = row.map((item, itemIndex) => {

				return (
					<Touchable key={this.key++} style={{width: smallImageStyle.width}} onPress={()=>this.mixJump(item)}>
						<Image source={{uri: item.img}} resizeMode="cover" style={smallImageStyle}/>
						<View style={{width: smallImageStyle.width}}>
							<Text style={_.hmtitle}>{item.title}</Text>
						</View>
						<View style={_.timeinfoBox}>
							<Text style={_.timeinfo}>{item.dateinfo}</Text>
						</View>
					</Touchable>
				);
			});
			return (
				<View key={this.key++} style={itemStyle}>
					{items}
				</View>
			);
		});
	}

	mixJump(item){

		console.log('item：', item);
		app.stat('hmds-recommend-click', '今日推荐'+(item.detail.id || item.id));
		if(item.type == 1) {
			this.props.navigation.navigate('Detail', {item:item.detail});
		} else if(item.type == 2) {
			this.props.navigation.navigate('MasterDetail', {item:item.detail});
		} else if(item.type == 3) {
			app.open(data.getAdUrl(data.AdTypeBanner, item.id, item.detail.adUrl));
		}else if(item.type == 4){
			//跳转办卡入口
			this.emit('changeTab', 1);
		}
	}

	//显示banner位
	showBanner(banner){
		if(!banner || !Array.isArray(banner) || banner.length == 0) {
			return null;
		}

		//336*170
		let bigImageStyle = {width: width - 40};
		bigImageStyle.height = bigImageStyle.width * 170 / 336;
		let list = banner.map((item)=>{
			return (
				<Touchable key={`${item.id},${this.key++}`} onPress={()=>this.mixJump(item)}>
					<Image source={{uri: item.img}} resizeMode="cover"
						   style={bigImageStyle}/>
					<Text style={_.hmtitle} numberOfLines={2}>{item.title}</Text>
					<Text style={_.timeinfo}>{item.dateinfo}</Text>
				</Touchable>
			);
		});

		let dotStyle = {
			position: 'relative',
			marginBottom: 65,
			width: 6,
			height: 6,
			borderRadius: 3
		};

		return (
			<Swiper
				style={_.swiper}
				width={bigImageStyle.width}
				height={bigImageStyle.height+80}
				dotStyle={dotStyle}
				activeDotStyle={dotStyle}
				dotColor="rgba(0,0,0,0.4)"
				activeDotColor="#f5f5f5"
				autoplay={true}
				autoplayTimeout={5}
			>{list}</Swiper>
		);
	}

	//显示今日推荐列表
	showRecommend(data) {
		if (data.banner.length == 0 && data.list.length == 0) {
			return null;
		}

		return (
			<View style={_.section}>
				<View style={_.msTitle}>
					<View>
						<Text style={_.titleBig}>今日推荐</Text>
						<Text style={_.titleSmall}>为您甄选极致折扣</Text>
					</View>

					<View style={_.moreMsBox}>
						<Touchable onPress={()=>{
							this.emit('changeTab', 1);
						}}>
							<Text style={_.moreMs}>查看更多</Text>
						</Touchable>
					</View>
				</View>
				{this.showBanner(data.banner)}
				{this.showGrid(this.getGridRow(data.list))}
			</View>
		);
	}

	//跳转专辑页面
	jumpSubject(item){
		app.stat('hmds-album-click', '大师精选栏'+item.id);
		if(item.isAd) {
			app.open(data.getAdUrl(data.AdTypeSubject, item.id, item.adUrl));
		} else {
			this.props.navigation.navigate('Subject', {item});
		}
	}

	//显示薅毛大师列表
	showMaster(data){
		if(!data || !Array.isArray(data) || data.length == 0) {
			return null;
		}

		//158*90
		let imgStyle = {width: (width - 60) / 2};
		imgStyle.height = imgStyle.width * 90 / 158;

		let list = data.map((item)=>{
			let title = item.title;
			if(item.isAd) {
				title = `#${item.title}#`;
			}
			let img = item.img ? {uri: item.img} : null;
			return (
				<Touchable style={_.masterItem} key={`${item.id},${this.key++}`} onPress={()=>this.jumpSubject(item)}>
					<Image style={[_.masterImg, imgStyle]} source={img}>
						<Text style={_.masterTitle}>{title}</Text>
						<Text style={_.masterSubTitle}>{item.subTitle}</Text>
					</Image>
				</Touchable>
			);
		});

		return (
			<View style={[_.section,{paddingBottom:0}]}>
				<View style={_.msTitle}>
					<View>
						<Text style={_.titleBig}>达人精选</Text>
						<Text style={_.titleSmall}>薅毛达人的养成之路</Text>
					</View>

					<View style={_.moreMsBox}>
						<Touchable onPress={()=>{
							this.emit('changeTab', 2);
						}}>
							<Text style={_.moreMs}>查看更多</Text>
						</Touchable>
					</View>
				</View>

				<View style={_.masterList}>{list}</View>
			</View>
		);

	}

	showTool(){
		return (
			<View style={_.tool}>
				<View style={_.toolIntro}>
					<Image style={_.toolIntroImage} source={require('../../assets/hslogon.png')} />
					<Text style={_.toolIntroText}>向我们提供羊毛信息、分享薅毛经验，赢取现金红包</Text>
					<Touchable style={_.toolBtnBox} onPress={()=>{
						loginCheck(()=>{
							this.props.navigation.navigate('Add');
						});
					}}>
						<Text style={_.toolBtnText}>点此共享羊毛信息</Text>
					</Touchable>
				</View>
			</View>
		);
	}

	/**
	 * 显示推荐的文章列表
	 * @param articles
	 */
	showArticles(articles){
		if(!articles || !Array.isArray(articles) || articles.length == 0) {
			return null;
		}

		return articles.map((item)=>{
			return <ArticleItem key={item.id} data={item} onPress={()=>{
				app.stat('hmds-album-click', '大师精选栏'+item.id);
				this.props.navigation.navigate('MasterDetail', {item});
			}}/>
		});
	}

	render() {
		return (
			<View style={_.pager}>
				<Header
					navigation={this.props.navigation}
					menuType="profile"
				/>
				{this.showTip(this.state.todayTotal)}
				<ScrollView>
					{this.showRecommend(this.state.recommend)}
					{this.showMaster(this.state.master)}
					{this.showArticles(this.state.articles)}
					{this.showTool()}
				</ScrollView>
			</View>
		);
	}
}