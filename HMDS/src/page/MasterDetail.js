import Component from '../util/component';
import React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';

import _ from '../style/MasterDetail';
import Header from './common/Header';
import AutoHeightWebview from './common/AutoHeightWebview';
import data from '../util/data';
import Touchable from './common/Touchable';
import loginCheck from '../util/login';
import Share from './common/Share';
import Toast from './common/Toast';
import app from '../util/app';
import Comment from './detail/Comment';
import CommentInput from './detail/CommentInput';

import Loading from './common/Loading';


export default class MasterDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                id: 0,
                mid: 0,
                avatar: '',
                name: '',
                intro: '',
                hasSub: '',
                title: '',
                favorNum: 0,
                collectNum: 0,
                commentNum: 0,
                body: '',
                hasFavor: false,
                hasCollect: false,
                hasSubs: false
            },

            shareCallback: ()=>{},
			webviewLoading: true
        };
    }

    getUserInfo(){
        return (
            <View style={_.intro}>
                <Touchable style={_.info} onPress={()=>{
                    this.props.navigation.navigate('Master', {item: {id: this.state.data.mid}});
                }}>
                    <Image style={_.avatar} source={this.state.data.avatar?{uri:this.state.data.avatar}:null}/>
                    <View style={_.desc}>
                        <Text style={_.name}>{this.state.data.name}</Text>
                        <Text style={_.slogon}>{this.state.data.intro}</Text>
                    </View>
                </Touchable>
                <Touchable onPress={()=>this.subs()}>
                    <Text style={this.state.data.hasSub?_.subGray:_.sub}>{this.state.data.hasSub?'已订阅': '+ 订阅'}</Text>
                </Touchable>
            </View>
        )
    }

    subs(){
        app.stat('hmds-Article', '大师文章页订阅点击');
        if (!this.state.data.hasSub){
            loginCheck(()=>{
                data.subsMaster({id: this.state.data.mid}, (res)=>{
                    if (res.code == 200){
                        this.state.data.hasSub = true;
                        // this.setState({data});
                        this.forceUpdate();
                    }
                    this.emit('toast', res.msg);
                })
            });
        }
    }

    getBottom(){
        return (
            <View style={_.bottomBox}>
                <Touchable onPress={()=>{
                    if (!this.state.hasFavor){
                        data.favorArticle({id: this.state.data.id}, (res)=>{
                            if (res.code == 200 && res.data.result == 1){
                                this.state.data.hasFavor = true;
                                this.state.data.favorNum = res.data.favorNum;
                                this.forceUpdate();
                            }
                        });
                    }
                }}>
                    <View style={_.bottomItem}>
                        <Image style={_.bottomImg1}  source={this.state.data.hasFavor?require('../assets/zan2_icon.png'):require('../assets/zan_icon.png')}/>
                        <Text style={[_.bottomText,this.state.data.hasFavor?{color: '#c0c0c0'}:{}]}>{this.state.data.hasFavor?'已点赞':'点赞'}({this.state.data.favorNum})</Text>
                    </View>
                </Touchable>
                <Touchable onPress={()=>{
                    app.stat('hmds-Article', '大师文章页收藏点击');
                    if (!this.state.hasFavor){
                        data.collectArticle({id: this.state.data.id}, (res)=>{
                            if (res.code == 200 && res.data.result == 1){
                                this.state.data.hasCollect = true;
                                this.forceUpdate();
                            }
                        });
                    }
                }}>
                    <View style={_.bottomItem}>
                        <Image style={_.bottomImg2}  source={this.state.data.hasCollect?require('../assets/shoucang.png'):require('../assets/shoucang2.png')}/>
                        <Text style={[_.bottomText,this.state.data.hasCollect?{color: '#c0c0c0'}:{}]}>{this.state.data.hasCollect?'已收藏':'收藏'}</Text>
                    </View>
                </Touchable>
                <Touchable onPress={()=>{
                    this.emit('showComment', {id: this.state.data.id,type:'article'});
                }}>
                    <View style={_.bottomItem}>
                        <Image style={_.bottomImg3}  source={require('../assets/reply_article_icon.png')}/>
                        <Text style={_.bottomText}>评论</Text>
                    </View>
                </Touchable>
            </View>
        )
    }

    componentDidMount(){
        app.stat('hmds-Article', '大师文章页点击');
        const {state} = this.props.navigation;
        let id = state.params.item.id;
        //拉取文章
        data.masterArticleDetail({id: id}, (res)=>{
            res.data.body = decodeURIComponent(res.data.body);
            this.setState({
                data: res.data,
                shareCallback: ()=>{
                    app.stat('hmds-Article', '大师文章分享点击');
                    this.emit('share', {
                        channel:'',
                        param: {
                            title: res.data.title,
                            summary: res.data.intro,
                            image: res.data.avatar,
                            url: 'https://h5.chelun.com/2017/rn_share/article.html?id='+id
                        },
                        callback: (res)=>{
                            if (res){
                                data.shareWool({id:this.id, type:'article'});
                            }
                        }
                    });
                }
            })
        });
    }

    render(){
        let comment = null;
        if (this.state.data.id){
            comment = <Comment item={{id: this.state.data.id}} type={'article'}/>
        }
        return (
            <View style={_.page}>
                <Header
                    title="文章详情"
                    menuType="share"
                    navigation={this.props.navigation}
                    callback={this.state.shareCallback}
                />
                <ScrollView alwaysBounceVertical={false} style={{marginBottom: 50}}>
                    <Text style={_.articleTit}>{this.state.data.title}</Text>
                    {this.getUserInfo()}
                    <View style={_.webView}>
                        <AutoHeightWebview body={this.state.data.desc} onLoad={()=>{
                        	this.setState({webviewLoading: false});
						}}/>
                    </View>
                    {comment}
                </ScrollView>
                {this.getBottom()}

                <CommentInput />
                <Share/>
                <Toast/>
				{this.state.webviewLoading ? <Loading /> : null}
            </View>
        )
    }
}