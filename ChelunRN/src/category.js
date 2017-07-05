import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Platform,
	Animated,
	Easing,
	ListView
} from 'react-native';

import {S} from './style/category';
import Head from './common/head';
import {InfoItem} from './common/infoList';
import {net} from './common/net';
import {App} from './common/const';

export default class Category extends React.Component{
	constructor(props) {
		super(props);

		//全部子类型默认文案
		this.defaultSubName = '全部优惠类型';
		//页面跳转传递的参数
		const params = this.props.navigation.state.params;
		const initIndex = params.initIndex || 0;
		const typeMenu = App.menu.map((menu, index)=>{
			let tmpMenu = Object.assign({}, menu);
			tmpMenu.isSelected = index == initIndex ? true : false;
			let tmparr = [];
			tmparr.push({id:0, name: this.defaultSubName}, ...menu.subTypeMenu);
			let tmpSubMenu = tmparr;
			tmpMenu.subTypeMenu = tmpSubMenu;
			// menu.subTypeMenu.unshift({id:0, name: defaultSubName});
			return tmpMenu;
		});

		console.log(typeMenu);

		let source = new ListView.DataSource({
			rowHasChanged(r1, r2){
				return r1 !== r2;
			}
		});

		this.state = {
			data: source,
			typeMenu,
			defaultSubName: this.defaultSubName,
			showSubType: false
		};

		//类型索引
		this.typeIndex = initIndex;
		//子类型索引,默认子类型全部优惠类型
		this.subTypeIndex = 0;

		//当前页码
		this.page = 0;
		this.subs = [];

		//临时数据列表
		this.list = [];

		//keyindex
		this.keyindex = 0;
	}

	componentDidMount(){
		this.nextPage();
	}

	/**
	 * 拉取列表信息
	 * @param reset 是否重置页码
	 */
	nextPage(reset = false){
		if(!reset) {
			this.page ++;
		} else {
			this.page = 1;
		}
		let type = this.state.typeMenu[this.typeIndex].id;
		let subType = 0;
		if(this.subTypeIndex > 0){
			subType = this.state.typeMenu[this.typeIndex].subTypeMenu[this.subTypeIndex].id;
		}

		net.categoryList({page: this.page, type, subType}, (res)=>{
			if(!reset) {
				this.list.push(...res.data.list);
			} else {
				this.list = res.data.list;
			}

			this.setState({
				data: this.state.data.cloneWithRows(this.list)
			});
		})
	}

	typeMenuSel(index){
		let menu = this.state.typeMenu;
		for(let i=0;i<menu.length;i++) {
			if(index == i) {
				menu[i].isSelected = true;
			} else {
				menu[i].isSelected = false;
			}
		}

		this.setState({
			typeMenu: menu,
			showSubType: false,
		});
		this.typeIndex = index;
		this.subTypeIndex = 0;

		this.nextPage(true);
	}

	allSel(){
		let showSubType = true;
		if(this.state.showSubType) {
			showSubType = false;
		}
		this.setState({showSubType});
	}

	subTypeSel(index){
		let needLoad = false;
		if(index != this.subTypeIndex) {
			needLoad = true;
		}

		this.subTypeIndex = index;
		this.setState({
			showSubType: false
		});

		if(needLoad) {
			this.nextPage(true);
		}
	}

	subType(){
		let subType = null;
		if(this.state.showSubType) {
			let subTypes = this.state.typeMenu[this.typeIndex].subTypeMenu;

			let list = subTypes.map((item, index)=>{
				let key = item.id+item.name;
				if(item.id == 0) {
					key = this.keyindex--;
				}
				return (
					<View key={key} style={S.stItem} ref={(node)=>{
						this.subs.push(node);
					}}>
						<TouchableOpacity style={S.stHover} onPress={()=>this.subTypeSel(index)}>
							<Text style={{fontSize:15}}>{item.name}</Text>
						</TouchableOpacity>
					</View>
				);
			});

			let animateHeight = new Animated.Value(0);

			subType = (
				<View style={S.subType}>
					<Animated.View
						style={[S.stBox, {height: animateHeight}]}
						onLayout={(e)=>{
							Animated.timing(animateHeight, {
								toValue: subTypes.length*37,
								easing: Easing.linear,
								duration: 50
							}).start();
						}}
					>{list}</Animated.View>
				</View>
			);
		}

		return subType;
	}

	render(){

		let typeMenu = this.state.typeMenu.map((item, index)=>{
			if(item.isSelected) {
				return (
					<View key={item.id} style={[S.toView, {borderColor:'#d0011b'}]}>
						<Text style={[S.toItem, {color:'#030303'}]}>{item.name}</Text>
					</View>
				);
			} else {
				return (
					<View key={item.id} style={[S.toView]}>
						<TouchableOpacity onPress={()=>this.typeMenuSel(index)}>
							<Text style={[S.toItem]}>{item.name}</Text>
						</TouchableOpacity>
					</View>
				);
			}
		});

		let subTypeName = this.state.typeMenu[this.typeIndex].subTypeMenu[this.subTypeIndex].name;

		return (
			<View
				style={S.page}
				onStartShouldSetResponder={()=>true}
				onResponderGrant={(e)=>{
					if(this.subs.indexOf(e.target) == -1) {
						this.setState({
							showSubType: false
						});
					}
				}}
			>
				<Head
					navigation={this.props.navigation}
					titleComponent={<Image source={require('../assets/img/title.png')}/>}
				/>
				<View style={S.typeOption}>
					{typeMenu}
				</View>

				<View style={S.allsel}>
					<TouchableOpacity style={S.allselTouch} onPress={()=>this.allSel()}>
						<View style={S.allselHover}>
							<Text style={{fontSize:15,color:'#999'}}>{subTypeName}</Text>
							<View style={S.arrowDomn}></View>
						</View>
					</TouchableOpacity>
				</View>

				<ListView
					enableEmptySections={true}
					dataSource={this.state.data}
					renderRow={(rowData) => {
						return <InfoItem navigation={this.props.navigation} item={rowData} />
					}}
					onEndReached={()=>{
						if(this.list.length > 10) {
							this.nextPage();
						}
					}}
					onEndReachedThreshold={20}
				/>

				{this.subType()}

			</View>
		);
	}
}