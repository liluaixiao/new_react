import Component from '../util/component';
import React from 'react';
import _ from '../style/Detail';
import {
	View,
	Text,
	ScrollView,
	Image,
	Dimensions,
	WebView,
	TouchableWithoutFeedback,
	RefreshControl,
	Alert
} from 'react-native';
import app from '../util/app'
import Header from './common/Header';
import data from '../util/data';
import loginCheck from '../util/login';
import Toast from './common/Toast';
import Comment from './detail/Comment';
import CommentInput from './detail/CommentInput';
import AutoHeightWebview from './common/AutoHeightWebview';
import Touchable from './common/Touchable';
import Share from './common/Share';

import Loading from './common/Loading';

const {width} = Dimensions.get('window');

export default class Detail extends Component {
	constructor(props) {
		super(props);

		this.item = this.props.navigation.state.params.item;
		this.state = {
			refreshing: false,
			detail: null,
			shareCallback: ()=>{},
			webviewLoading: true
		};

		this.isAdd = false;
	}

	componentDidMount() {
		app.stat('hmds-item', '羊毛详情页点击');
		data.getDetail({id: this.item.id, isUserAdd: this.item.is_user_add}, (res)=>{
			this.setState({
				detail: res.data,
				shareCallback: ()=>{
					app.stat('hmds-item', '羊毛详情页分享点击');
					this.emit('share', {
						channel:'',
						param: {
							title: res.data.title,
							summary: '',
							image: res.data.img,
							url: 'https://h5.chelun.com/2017/rn_share/wool.html?id='+this.props.navigation.state.params.item.id
						},
						callback: (res)=>{
							if (res){
								data.shareWool({id:this.item.id, type:'wool'});
							}
						}
					});
				}
			});
		});
	}

	/**
	 * 跳转羊毛源地址
	 * @param url
	 */
	viewSource(url) {
		app.open(url);
		app.stat('hmds-item', '羊毛详情页直达链接点击');
	}

	/**
	 * 点击添加按钮
	 */
	onAddBtnClick() {
		loginCheck(() => {
			app.stat('hmds-item', '羊毛详情页添加关注');
			if (this.isAdd) return;
			this.isAdd = true;
			data.addRemind({id: this.item.id, isUserAdd: this.item.is_user_add}, (res) => {
				this.isAdd = false;
				if (res.code == 200) {
					this.emit('updateTodayTotal');
					this.state.detail.hasRemind = true;
					this.forceUpdate();
				} else {
					this.emit('toast', res.msg);
				}
			});
		});
	}

	//获取html描述内容
	showDetail(detail = '') {
		if (!detail) {
			return (
				<Text style={_.noDetail}>此羊毛没有任何描述</Text>
			);
		} else {
			return (
				<View style={_.webview}>
					<AutoHeightWebview body={detail} onLoad={()=>{
						this.setState({webviewLoading: false});
					}}/>
				</View>
			);
		}
	}

	//显示办卡业务
	showCard(card){
		if(!card || typeof card != 'object' || !card.card) {
			return null;
		}

		return (
			<View style={_.cardBox}>
				<View style={_.cardText}>
					<Text style={_.cardTitle}>
						参与本活动需要
						<Text style={_.cardName}>{card.card}</Text>
					</Text>
					{card.canApply ? (<Text style={_.cardSubTitle}>未持有{card.card}用户可在此快速申请</Text>) : null}
				</View>
				{card.canApply ? (<Touchable style={_.cardApplyBtn} onPress={()=>{
					loginCheck(()=>{
						app.open(data.getAdUrl(data.AdTypeYm, this.item.id, card.applyUrl));
					});
				}}>
					<Text style={_.cardApplyBtnText}>在线办卡</Text>
				</Touchable>) : (<View></View>)}
			</View>
		);
	}

	//显示按钮
	showBtn(detail){
		let btn, favor;
		if (detail.hasRemind) {
			btn = (
				<View style={[_.rowCenter, _.btn, _.btnDisable]}>
					<Text style={_.btnText}>已添加到薅毛日程</Text>
				</View>
			);
		} else {
			btn = (
				<Touchable
					style={[_.rowCenter, _.btn, _.btnActive]}
					onPress={() => this.onAddBtnClick()}>
					<Text style={_.btnText}>添加到薅毛日程</Text>
				</Touchable>
			);
		}
		if(detail.hasFavor) {
			favor = (
				<View style={_.favorBox}>
					<Image source={require('../assets/Thumbsup_red_icon.png')} style={_.favorIcon}/>
					<Text style={_.favorNumText}>{detail.favorNum}</Text>
				</View>
			);
		} else {
			favor = (
				<Touchable style={_.favorBox} onPress={()=>this.addFavor()}>
					<Image source={require('../assets/Thumbsup_icon.png')} style={_.favorIcon}/>
					<Text style={_.favorNumText}>{detail.favorNum}</Text>
				</Touchable>
			);
		}

		return (
			<View style={_.btnBox}>
				{btn}{favor}
			</View>
		);
	}

	//对羊毛点赞
	addFavor(){
		loginCheck(()=>{
			data.addYmFavor({id: this.item.id, isUserAdd: this.item.is_user_add}, (res)=>{
				if(res.data.result) {
					this.state.detail.favorNum = res.data.favorNum;
					this.state.detail.hasFavor = true;
					// this.setState({detail: this.state.detail});
					this.forceUpdate();
				}
			});
		});
	}

	render() {
		let detail = this.state.detail;
		if(!detail || typeof detail != 'object'){
			return null;
		}

		return (
			<View style={[_.page]}>
				<Header
					menuType="share"
					navigation={this.props.navigation}
					callback={this.state.shareCallback}/>
				<ScrollView
					style={_.body}
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={()=>{
								this.setState({refreshing:true},()=>{
									setTimeout(()=>{
										data.getDetail({id: this.item.id, isUserAdd: this.item.is_user_add}, (res)=>{
											this.setState({
												refreshing:false,
												detail: res.data
											});
										});
									}, 1000)
								});
							}}
						/>
					}
				>
					<View>
						{detail.img ? <Image style={{width, height: width * 187 / 375}} resizeMode="cover" source={{uri:detail.img}}/> : null}
						{detail.isms ? (<View style={[_.rowCenter, _.msFlagBox]}>
							<Text style={_.msFlagText}>秒杀资源</Text>
						</View>) : null}
					</View>

					<View style={_.info}>
						<Text style={_.title}>{detail.title}</Text>
						<View style={_.dateinfo}>
							<Image style={_.clockIcon} resizeMode="cover"
								   source={require('../assets/Clock_icon.png')}/>
							<Text style={_.dateinfoText}>{detail.dateinfo}</Text>
						</View>
					</View>

					{this.showCard(detail.require)}

					<View style={_.webviewBox}>
						{this.showDetail(detail.detail)}
						{!detail.url?null:(<View style={_.source}>
							<Touchable style={_.sourcePress} onPress={() => this.viewSource(detail.url)}>
								<Text style={_.sourceText}>直达链接</Text>
								<View style={[_.pressArrowBox, _.rowCenter]}>
									<View style={_.sourceArrow}></View>
								</View>
							</Touchable>
						</View>)}
					</View>

					{this.item.is_user_add ? null : (<Comment item={this.item}/>)}
				</ScrollView>
				{this.showBtn(detail)}
				<CommentInput />
				<Toast />
				<Share/>
				{this.state.webviewLoading ? <Loading /> : null}
			</View>
		);
	}
}
