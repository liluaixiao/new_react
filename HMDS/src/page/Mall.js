import Component from '../util/component';
import React from 'react';
import {
	View,
	Image,
	Text,
	FlatList,
	Platform,
	Dimensions,
	Alert
} from 'react-native';
import _ from '../style/Mall';

import Header from './common/Header';
import Touchable from './common/Touchable';
import data from '../util/data';

export default class Mall extends Component {
	constructor(props){
		super(props);

		this.state = {
			refreshing: false,
			list:[],
		 	userinfo: null
		};

		this.page = 0;
		this.isLastPage = false;
		this.pageSize = 10;

		this.isLoading = false;
	}

	componentDidMount(){
		this.loadOnePage();

		//获取用户信息
		data.getUserinfo((res)=>{
			this.setState({userinfo: res.data});
		});
	}

	//加载一页数据
	loadOnePage(onLoad =()=>{}){
		if (this.isLastPage || this.isLoading){
			return;
		}

		this.isLoading = true;
		this.page += 1;
		//加载数据的逻辑
		data.getGoodsList({page: this.page},(res)=>{
			if (res.code == 200){
				this.isLoading = false;
				this.isLastPage = res.data.isLastPage;
				let list = res.data.list;
				if (this.page == 1){
					this.state.list = [[{id: 0}]];
				}
				for (let i=0,len=list.length;i<Math.floor(len/2);i++){
					this.state.list.push([
						{
							id: list[2*i].id,
							img: list[2*i].img,
							title: list[2*i].title,
							price: list[2*i].price,
							num: list[2*i].num
						},
						{
							id: list[2*i+1].id,
							img: list[2*i+1].img,
							title: list[2*i+1].title,
							price: list[2*i+1].price,
							num: list[2*i+1].num
						}
					])
				}
				if (list.length%2){
					this.state.list.push([
						{
							id: list[list.length-1].id,
							img: list[list.length-1].img,
							title: list[list.length-1].title,
							price: list[list.length-1].price,
							num: list[list.length-1].num
						},
					])
				}
				this.forceUpdate();
				onLoad();
			}else{
				Alert.alert(res.msg);
			}
		});
	}

	//显示用户信息
	showUserinfo(){
		if(!this.state.userinfo){
			return null;
		}

		return (
			<View style={_.uiBox}>
				<View style={_.scoreBox}>
					<Touchable style={_.totalBox}
									  onPress={()=>{
										  this.props.navigation.navigate('Qa', {type: 'wool'});
									  }}>
						<Image style={_.moneyIcon} source={require('../assets/moeny_icon_gray.png')}/>
						<Text style={_.totalScore}>{this.state.userinfo.totalScore}</Text>
						<Text style={_.ymText}>羊毛</Text>
						<Image style={_.qaIcon} source={require('../assets/Q&A_icon.png')}/>
					</Touchable>
					<View>
						<Text style={_.dueText}>最近一个月到期羊毛：{this.state.userinfo.willDueScore}</Text>
					</View>
				</View>
			</View>
		);
	}

	renderItem(item, index){
		if (index == 0){
			return this.showUserinfo();
		}
		let imgWidth = Dimensions.get('window').width;
		imgWidth = (imgWidth-60)/2;
		let imgStyle = {width: imgWidth,height: imgWidth};
		return <View style={_.rowBox} key={index}>
				<Touchable
					style={_.itemBox}
					onPress={()=>{
						this.props.navigation.navigate('GoodsDetail', ({item: item[0]}));
					}}>
					<Image style={[_.album,imgStyle]} source={item[0].img?{uri: item[0].img}:null}/>
					<Text style={_.title}>{item[0].title}</Text>
					<View style={_.textBox}>
						<View style={_.priceBox}>
							<Image style={_.priceIcon} source={require('../assets/moeny_icon_gray.png')}/>
							<Text style={_.price}>{item[0].price}羊毛</Text>
						</View>
						<Text style={_.num}>剩余：{item[0].num}</Text>
					</View>
				</Touchable>{
			item[1]? <Touchable
				style={_.itemBox}
				onPress={()=> {
					this.props.navigation.navigate('GoodsDetail', ({item: item[1]}));
				}}>
				<Image style={[_.album, imgStyle]} source={item[1].img ? {uri: item[1].img} : null}/>
				<Text style={_.title}>{item[1].title}</Text>
				<View style={_.textBox}>
					<View style={_.priceBox}>
						<Image style={_.priceIcon} source={require('../assets/moeny_icon_gray.png')}/>
						<Text style={_.price}>{item[1].price}羊毛</Text>
					</View>
					<Text style={_.num}>剩余：{item[1].num}</Text>
				</View>
			</Touchable>:null
		}</View>
	}

	render(){
		return (
			<View style={_.page}>
				<Header
					title="羊毛商城"
					navigation={this.props.navigation}
					menuType="mall"
				/>
				<FlatList
					style={_.list}
					refreshing={this.state.refreshing}
					data={this.state.list}
					keyExtractor={(item)=>item[0].id}
					renderItem={({item, index})=>this.renderItem(item, index)}
					onRefresh={()=>{
						this.setState({refreshing: true}, ()=>{
							//保证下拉动画持续一秒以上
							setTimeout(()=>{
								this.page = 0;
								this.isLastPage = false;
								this.loadOnePage(()=>{
									this.setState({refreshing: false});
								})
							}, 1000);
						});
					}}
					onEndReached={()=>{
						if (this.state.list.length >= Math.floor(this.pageSize/2) && !this.isLastPage){
							this.loadOnePage();
						}
					}}
					onEndReachedThreshold={Platform.OS == 'ios'?0: 1}
				/>
			</View>
		);
	}
}