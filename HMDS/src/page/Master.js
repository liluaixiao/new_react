import Component from '../util/component';
import React from 'react';
import {View, Text, Image, Picker, FlatList, Platform, Alert} from 'react-native';

import _ from '../style/Master';
import Header from './common/Header';
import ArticleItem from './common/ArticleItem';
import data from '../util/data';
import loginCheck from '../util/login';
import Toast from './common/Toast';
import app from '../util/app';
import CLPicker from './common/Picker';

export default class Master extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            userInfo: {},
            list: [],
            type: [],
            curType: '',
            order: 'time',  //(time|good)时间或点击数,默认是时间
        };

        this.id = '';
        this.page = 0;
        this.isLastPage = false;
        this.pageSize = 15;

        this.isLoading = false;
    }

    componentDidMount(){
        app.stat('hmds-intro', '大师介绍页点击');
        this.id = this.props.navigation.state.params.item.id;
        //获取banner
        data.masterInfo({id:this.id}, (res)=>{
            this.setState({
                userInfo: res.data
            })
        });
        //加载文章列表
        this.loadOnePage();
    }

    //重置页面信息
    resetPageInfo(){
        this.page = 0;
        this.isLastPage = false;
    }


    //加载一页数据
    loadOnePage(onLoad = ()=>{}){
        if(this.isLoading || this.isLastPage) {
            return ;
        }

        this.isLoading = true;
        this.page += 1;
        let id = this.props.navigation.state.params.item.id;
        let param = {id:this.id, page: this.page};
        if (this.order){
            param.order = this.state.order;
        }
        if (this.state.curType){
            param.cate = this.state.curType;
        }
        data.masterArticleList(param, (res)=>{
            this.isLoading = false;
            this.isLastPage = res.data.isLastPage;

            let preList = this.state.list;
            if (this.page == 1){
                preList = [];
            }
            if (!preList.length){
                preList.unshift({id:-1},{id:0});
            }
            let list = preList.concat(res.data.list);
            this.state.type = [];
            res.data.cate = ['全部分类', '经验', '入门'];
            res.data.cate.forEach((item)=>{
               this.state.type.push(
                   {value: item}
               );
            });
            if (!this.state.curType)
                this.state.curType = res.data.cate[0];
            this.state.list = list;
            this.forceUpdate();
            onLoad();
        })
    }

    //获取用户信息
    getUserInfo(){
        return (
            <View style={_.intro}>
                <View style={_.infoBox}>
                    <Image style={_.avatar} source={this.state.userInfo.avatar?{uri:this.state.userInfo.avatar}:null}/>
                    <View style={_.textBox}>
                        <Text style={_.textDesc}>{this.state.userInfo.intro}</Text>
                        <View style={_.textInfo}>
                            <View>
                                <Text style={_.infoNum}>{this.state.userInfo.articleNum}</Text>
                                <Text style={_.infoText}>他的文章</Text>
                            </View>
                            <View>
                                <Text style={_.infoNum}>{this.state.userInfo.favorNum}</Text>
                                <Text style={_.infoText}>获得点赞</Text>
                            </View>
                            <View>
                                <Text style={_.infoNum}>{this.state.userInfo.subsNum}</Text>
                                <Text style={_.infoText}>订阅</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Text style={_.desc} numberOfLines={3}>
                    {this.state.userInfo.desc}
                </Text>
            </View>
        )
    }

    //获取导航信息
    getNavInfo(){
        return (
            <View style={_.nav}>
                <View style={_.navItems}>
                    <CLPicker style={_.navPick}
                              textStyle={_.navTit}
                              data={this.state.type}
                              defaultValue={this.state.curType}
                              valueChange={(val)=>this.changeType(val)}
                    />
                    <View style={_.navIcon}/>
                </View>
                <View style={_.navItems}>
                    <Text style={[_.navItem, this.state.order=='time'?_.navItemActive:null]} onPress={()=>this.sort('time')}>按时间</Text>
                    <Text style={_.seg}>|</Text>
                    <Text style={[_.navItem, this.state.order=='time'?null:_.navItemActive]} onPress={()=>this.sort('order')}>按人气</Text>
                </View>
            </View>
        )
    }

    //点击跳转
    pressArticle(id){
        const { navigate } = this.props.navigation;
        navigate('MasterDetail', {item:{id: id}});
    }

    renderItem(item, index){
        if (item.id == -1){
            return this.getUserInfo();
        }else if(item.id == 0){
            return this.getNavInfo();
        }else{
            let cls = _.articleItem;
            if (index == this.state.list.length-1){
                cls = [_.articleItem, _.articleNoMargin];
            }
            return <ArticleItem
                onPress={()=>{this.pressArticle(item.id)}}
                data={item} style={cls}
            />
        }
    }

    //选择分类
    changeType(type){
        this.state.curType = type;
        this.forceUpdate();
        this.loadOnePage();
    }

    //改变排序规则
    sort(order){
        this.setState({
            order
        });
        this.forceUpdate();
        this.resetPageInfo();
        this.loadOnePage();
    }

    render(){
        return (
            <View style={_.page}>
                <Header
                    title={this.state.userInfo.name}
                    menuType={'subs'}
                    text={this.state.userInfo.hasSub?'已订阅': '订阅'}
                    navigation={this.props.navigation}
                    callback={()=>{
                        app.stat('hmds-intro', '大师介绍页订阅点击');
                        loginCheck(()=>{
                            if(!this.state.userInfo.hasSub){
                                data.subsMaster({id: this.state.userInfo.id}, (res)=>{
                                    if (res.code == 200){
                                        this.state.userInfo.hasSub = '已订阅';
                                        this.state.userInfo.hasSub = true;
                                        this.forceUpdate();
                                    }
                                    Alert.alert('系统消息', res.msg);
                                })
                            }
                        });
                    }}
                />
                <FlatList
                    style={_.scroll}
                    refreshing={this.state.refreshing}
                    data={this.state.list}
                    keyExtractor={(item)=>item.id}
                    renderItem={({item, index}) => this.renderItem(item, index)}
                    onRefresh={() => {
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
                        if(this.state.list.length >= this.pageSize && !this.isLastPage) {
                            this.loadOnePage();
                        }
                    }}
                    onEndReachedThreshold={Platform.OS=='ios'? 0 : 1}
                />
                <Toast />
                <CLPicker.IOS/>
            </View>
        )
    }
}
