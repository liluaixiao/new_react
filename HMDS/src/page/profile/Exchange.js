import Component from '../../util/component';
import React from 'react';
import {View, Image, Text, FlatList,Platform} from 'react-native';
import _ from '../../style/profile/Exchange';

import Header from '../common/Header';
import data from '../../util/data';
import Touchable from '../common/Touchable';
import app from '../../util/app';

export default class Exchange extends Component {
	constructor(props){
		super(props);

		this.state = {
			refreshing: false,
			list: []
		}

		this.page = 0;
		this.isLastPage = false;
		this.isLoading = false;
		this.pageSize = 15;
	}

	componentDidMount(){
		this.loadOnePage();
	}

	loadOnePage(onLoad=()=>{}){
		if(this.isLoading) return ;
		this.isLoading = true;
		this.page++;
		data.myExchange({page: this.page}, (res)=>{
			this.isLoading = false;
			this.isLastPage = res.data.isLastPage;

			let list = res.data.list;
			let tmp = list.map((item)=>{
				item.key = item.id;
				return item;
			});

			onLoad();
			this.state.list.push(...tmp);
			this.forceUpdate();

		});
	}

	renderItem(item, index){
		let itemStyle = [_.item];
		if(index == this.state.list.length - 1) {
			itemStyle.push(_.itemWithBottom);
		}
		return (
			<Touchable onPress={()=>{
				app.open('autopaiwz://welfare/list/open');
			}}>
				<View style={itemStyle}>
					<View style={_.left}>
						<Text style={_.price}>{item.price}元</Text>
						<Text style={_.minUse}>满{item.minUse}元使用</Text>
					</View>
					<View style={_.right}>
						<Text style={_.name}>{item.name}</Text>
						<Text style={_.expiredTime}>{item.expireTime}前有效</Text>
					</View>
				</View>
			</Touchable>
		);
	}

	render(){
		return (
			<View style={_.page}>
				<Header
					title="我的兑换"
					navigation={this.props.navigation}
				/>
				<View style={_.body}>
					<FlatList
						refreshing={this.state.refreshing}
						onRefresh={()=>{
							this.setState({refreshing: true}, ()=>{
								setTimeout(()=>{
									this.page = 0;
									this.isLastPage = false;
									this.state.list = [];
									this.loadOnePage(()=>{
										this.setState({refreshing: false});
									});
								}, 1000)
							});
						}}
						data={this.state.list}
						renderItem={({item, index}) => this.renderItem(item, index)}
						onEndReached={()=>{
							if(this.state.list.length >= this.pageSize && !this.isLastPage) {
								this.loadOnePage();
							}
						}}
						onEndReachedThreshold={Platform.OS=='ios'? 0 : 1}
					/>
				</View>

			</View>
		);
	}
}