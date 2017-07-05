import Component from '../../util/component';
import React from 'react';
import {View,ScrollView,Image,Text, Dimensions,FlatList,Platform,Alert,TouchableOpacity,ActivityIndicator} from 'react-native';
import Swiper from 'react-native-swiper';

import _ from '../../style/main/Master';
import ArticleItem from '../common/ArticleItem';
import data from '../../util/data';
import loginCheck from '../../util/login';
import Touchable from '../common/Touchable';
import app from '../../util/app';
import Toast from '../common/Toast';
import Header from '../common/Header';

//获取屏幕宽度
const {width} = Dimensions.get('window');

export default class Master extends Component {
	constructor(props) {
		super(props);

		this.state = {
			swiperList: [],
			subject: [],
			master: [],
			article: [],

			loading: false
		};

		this.isMasterLastPage = false;
		this.masterPage = 0;
		this.isMasterLoading = false;

		this.isArticleLastPage = false;
		this.articlePage = 0;
		this.isArticleLoading = false;

		this.pageSize = 15;

		this.key = 0;
	}

	mixJump(item){

		app.stat('hmds-index', '大师页文章点击');
		if(item.type == 1) {
			this.props.navigation.navigate('Detail', {item:item.detail});
		} else if(item.type == 2) {
			this.props.navigation.navigate('MasterDetail', {item:item.detail});
		} else if(item.type == 3) {
			app.open(data.getAdUrl(data.AdTypeBanner, item.id, item.detail.adUrl));
		}
	}

	//加载大师列表页
	loadOneMasterPage() {
		if(this.isMasterLoading || this.isMasterLastPage){
			return ;
		}

		this.isMasterLoading = true;
		this.masterPage += 1;
		data.getMaterList({page: this.masterPage}, (res) => {
			this.isMasterLoading = false;
			this.isMasterLastPage = res.data.isLastPage;
			let master = res.data.list.map((item)=>{
				item.key = item.id;
				if (item.name.length>6){
					item.name = item.name.substr(0,5)+'...';
				}
				return item;
			});
			this.state.master.push(...master);
			this.forceUpdate();
		});
	}

	//加载文章列表页
	loadOneArticlePage(onLoad=()=>{}){
		if(this.isArticleLoading || this.isArticleLastPage){
			return ;
		}

		this.isArticleLoading = true;
		this.articlePage += 1;
		data.getAllArticleByPage({page: this.articlePage}, (res) => {
			this.isArticleLoading = false;
			this.isArticleLastPage = res.data.isLastPage;
			let article = res.data.list.map((item)=>{
				item.key = item.id;
				return item;
			});
			this.state.article.push(...article);
			this.forceUpdate();
			onLoad();
		});
	}

	componentDidMount(){

		this.on('triggerMasterLoad', ()=>{
			//加载swiper数据
			data.getSlideList((res)=>{
				this.setState({swiperList: res.data});
			});

			//加载精选专场
			data.homeRecommendSubject({location:2}, (res)=>{
				this.setState({subject: res.data});
			});

			//加载一页大师列表
			this.loadOneMasterPage();

			//加载一页文章
			this.loadOneArticlePage();
		});
	}

	showSwiper(list){
		if(!list || !Array.isArray(list) || list.length == 0) {
			return null;
		}

		let imgStyle = {resizeMode: 'cover'};
		imgStyle.width = width - 40;
		imgStyle.height = imgStyle.width*180/335;

		let dotStyle = {
			position: 'relative',
			marginBottom: 50,
			width: 6,
			height: 6,
			borderRadius: 3
		};

		let slides = list.map((item)=>{
			return (
				<Touchable style={_.slide} key={`${item.id},${this.key++}`} onPress={()=>{
					app.stat('hmds-master', '大师页banner点击');
					this.mixJump(item);
				}}>
					<Image source={item.img?{uri:item.img}:null} style={imgStyle}/>
					<View style={_.slideTextBox}>
						<Text style={_.slideTitle}>{item.title}</Text>
						<View style={_.slideInfoBox}>
							<View style={_.slideNameBox}>
								<Text style={_.slideName}>{item.name}</Text>
								<Text style={[_.slideName, _.slideIntro]}>{item.intro}</Text>
							</View>
							<Text style={[_.slideName, _.slideUpdateTime]}>{item.dateinfo} 更新</Text>
						</View>
					</View>
				</Touchable>
			);
		});

		return (
			<View style={_.swiper}>
				<Swiper
					height={imgStyle.height+64}
					dotStyle={dotStyle}
					activeDotStyle={dotStyle}
					dotColor="rgba(0,0,0,0.4)"
					activeDotColor="#f5f5f5"
					autoplay={true}
					autoplayTimeout={5}
				>
					{slides}
				</Swiper>
			</View>
		);
	}

	//显示专题
	showSubject(subject){
		if(!subject || !Array.isArray(subject) || subject.length == 0) {
			return null;
		}

		//158*90
		let imgStyle = {width: (width - 60) / 2};
		imgStyle.height = imgStyle.width * 90 / 158;

		let list = subject.map((item)=>{
			let title = item.title;
			if(item.isAd) {
				title = `#${item.title}#`;
			}
			let img = item.img ? {uri: item.img} : null;
			return (
				<Touchable style={_.masterItem} key={`${item.id},${this.key++}`} onPress={()=>{
					app.stat('hmds-master', '大师页专场点击');
					{/*this.mixJump(item);*/}
					if(item.isAd){
						app.open(data.getAdUrl(data.AdTypeBanner, item.id, item.adUrl));
					} else {
						this.props.navigation.navigate('Subject', {item});
					}
				}}>
					<Image style={[_.masterImg, imgStyle]} source={img}>
						<Text style={_.masterTitle}>{title}</Text>
						<Text style={_.masterSubTitle}>{item.subTitle}</Text>
					</Image>
				</Touchable>
			);
		});

		return (
			<View style={_.subjectBox}>
				<Text style={_.subjectTitle}>精选专场</Text>
				<View style={_.masterList}>{list}</View>
			</View>
		);

	}

	//订阅大师
	subMaster(item){
		loginCheck(()=>{
			data.subsMaster({id: item.id}, (res)=>{
				if (res.code == 200){
					this.state.master.forEach((value)=>{
						if (value.id == item.id)
							value.hasSub = true;
					});
					this.forceUpdate();
				}else{
					Alert.alert('系统消息', res.msg);
				}

			});
		});
	}

	//显示大师列表
	showMaster(data){
		if(!data || !Array.isArray(data) || data.length == 0) {
			return null;
		}

		let list = data.map((item)=>{
			item.key = item.id;
			return item;
		});

		return (
			<View style={_.masterBox}>
				<Text style={[_.subjectTitle, _.masterBoxTitle]}>入驻达人</Text>
				<FlatList
					style={_.masterListBox}
					data={list}
					horizontal={true}
					renderItem={({item, index})=>{
						let avatarStyle = [_.masterAvatarBox];
						if(index == list.length - 1) {
							avatarStyle.push(_.masterAvatarBoxWithRight);
						}

						let btn = (
							<Touchable style={_.udy} onPress={()=>{
								this.subMaster(item);
							}}>
								<Text style={_.udyText}>＋订阅</Text>
							</Touchable>
						);
						if(item.hasSub) {
							btn = (
								<View style={[_.udy, _.udyGray]}>
									<Text style={[_.udyText, _.udyTextGray]}>已订阅</Text>
								</View>
							);
						}

						return (
							<Touchable style={avatarStyle} onPress={()=>{
								app.stat('hmds-master', '大师页大师头像点击');
								this.props.navigation.navigate('Master', {item});
							}}>
								<View style={_.uaBox}>
									<Image style={_.ua} source={item.avatar?{uri:item.avatar}:null}/>
								</View>
								<Text style={_.uname}>{item.name}</Text>
								<Text style={_.uintro}>{item.intro}</Text>
								{btn}
							</Touchable>
						);
					}}
					onEndReachedThreshold={Platform.OS=='ios'? 0 : 1}
					onEndReached={()=>{
						if(this.state.master.length >= this.pageSize && !this.isMasterLoading){
							this.loadOneMasterPage();
						}
					}}
				/>
			</View>
		);
	}

	//显示文章列表
	showArticle(data){

		if(!data || !Array.isArray(data) || data.length == 0) {
			return null;
		}

		let list = data.map((item, index)=>{
			let itemStyle = {};
			if(index == data.length - 1) {
				itemStyle = _.artItemWithoutBottom;
			}
			return <ArticleItem data={item} key={item.id} style={itemStyle} onPress={()=>{
				app.stat('hmds-master', '大师页文章点击'+item.id);
				this.props.navigation.navigate('MasterDetail', {item});
			}}/>
		});
		return (
			<View style={_.artBox}>
				{list}
				{this.isArticleLastPage ? null : this.showLoadingText()}
			</View>
		);
	}

	showLoadingText(){
		if(this.state.loading) {
			return (
				<View style={_.loadMore}>
					<ActivityIndicator color="#666"/>
					<Text style={_.loadMoreTextGray}>加载中</Text>
				</View>
			);
		} else {
			return (
				<TouchableOpacity style={_.loadMore} onPress={()=>this.loadMoreArticle()}>
					<Text style={_.loadMoreText}>点击加载更多</Text>
				</TouchableOpacity>
			);
		}
	}

	//加载更多
	loadMoreArticle(){
		requestAnimationFrame(()=>{
			this.setState({loading: true}, ()=>{
				this.loadOneArticlePage(()=>{
					this.setState({loading: false});
				});
			});
		});
	}

	render(){
		return (
			<View>
				<Header
					navigation={this.props.navigation}
					menuType="profile"
				/>
				<ScrollView style={_.pager}>
					{/*<View style={_.littleTextBox}>*/}
						{/*<Text style={_.littleText}>—— 一点关于薅毛的经验 ——</Text>*/}
					{/*</View>*/}
					{this.showSwiper(this.state.swiperList)}
					{this.showSubject(this.state.subject)}
					{this.showMaster(this.state.master)}
					{this.showArticle(this.state.article)}

					<Toast />
				</ScrollView>
			</View>
		);
	}
}