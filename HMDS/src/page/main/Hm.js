import Component from '../../util/component';
import React from 'react';
import {View, Image, Text, ScrollView, FlatList, Platform} from 'react-native';

import _ from '../../style/main/Hm';
import data from '../../util/data';
import WoolItem from '../common/WoolItem';
import Touchable from '../common/Touchable';
import Header from '../common/Header';
import app from '../../util/app';


export default class Hm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			refreshing: false,
			list: [],
			tab: []
		};

		this.currentTab = 0;
		this.cacheList = [];
		this.page = 0;
		this.isLastPage = false;
		this.pageSize = 15;

		this.isLoading = false;
	}

	//重置页面信息
	resetPageInfo(){
		this.page = 0;
		this.isLastPage = false;
		this.cacheList = [];
	}

	//加载一页数据
	loadOnePage(onLoad = ()=>{}){
		if(this.isLoading || this.isLastPage) {
			return ;
		}

		this.isLoading = true;
		this.page += 1;
		let typeid = this.state.tab[this.currentTab].id;
		data.getListByTypeId({typeid, page: this.page}, (res)=>{
			this.isLoading = false;
			this.isLastPage = res.data.isLastPage;


			let loadedList = res.data.list.map((item)=>{
				item.key = item.id;
				return item;
			});
			this.cacheList.push(...loadedList);

			//加载完之后刷新列表，同时关闭图标
			this.setState({list: this.cacheList}, ()=>{
				onLoad();
			});

		})

	}

	componentDidMount() {
		this.on('triggerHmLoad', ()=>{
			//此处开始加载数据
			data.getCategory((res)=>{
				this.setState({tab: res.data}, ()=>{
					//只有菜单加载并更新完成才能加载列表数据
					this.loadOnePage();
				});
			});
		});
	}

	//切换tab
	onChangeTab(index){
		app.stat('hmds-discover', '发现页切换点击');
		this.currentTab = index;
		this.resetPageInfo();
		this.loadOnePage();
	}

	//显示分类菜单
	showTabs(){
		if(!this.state.tab || !Array.isArray(this.state.tab) || this.state.tab.length == 0) {
			return null;
		}

		let list = this.state.tab.map((item, index)=>{
			let itemStyle = [_.tabItem],
				textStyle = [_.tabItemText];
			if(index == this.state.tab.length - 1) {
				itemStyle.push(_.tabItemWithoutMargin);
			}

			if(this.currentTab != index) {
				itemStyle.push(_.tabItemClickable);
				textStyle.push(_.tabItemTextClickable);
			}

			if(this.currentTab == index) {
				return (
					<View style={itemStyle} key={item.id}>
						<Text style={textStyle}>{item.name}</Text>
					</View>
				);
			} else {
				return (
					<Touchable style={itemStyle} onPress={()=>this.onChangeTab(index)} key={item.id}>
						<Text style={textStyle}>{item.name}</Text>
					</Touchable>
				);
			}
		});

		return (
			<View style={_.tabBox}>
				<ScrollView style={_.tabBoxScroll} horizontal={true}>
					{list}
				</ScrollView>
			</View>
		);
	}


	//显示列表的行
	renderItem(item, index){
		let itemRight = '';
		if(index == this.state.list.length - 1) {
			itemRight = {borderBottomWidth: 0};
		}
		return (
			<WoolItem data={item} style={itemRight} navigation={this.props.navigation} onPress={()=>{
				app.stat('hmds-discover', '发现页羊毛点击');
			}}/>
		);
	}



	render() {
		return (
			<View style={_.pager}>
				<Header
					navigation={this.props.navigation}
					menuType="profile"
				/>
				{this.showTabs()}
				<FlatList
					style={_.listBox}
					data={this.state.list}
					renderItem={({item, index}) => this.renderItem(item, index)}
					refreshing={this.state.refreshing}
					onRefresh={() => {
						this.setState({refreshing: true}, ()=>{
							//保证下拉动画持续一秒以上
							setTimeout(()=>{
								this.resetPageInfo();
								this.loadOnePage(()=>{
									this.setState({refreshing: false});
								})
							}, 1000);
						});
					}}
					onEndReached={()=>{
						if(this.state.list.length >= 15 && !this.isLastPage) {
							this.loadOnePage();
						}
					}}
					onEndReachedThreshold={Platform.OS=='ios'? 0 : 1}
				/>
			</View>
		);
	}
}