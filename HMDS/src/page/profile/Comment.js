import Component from '../../util/component';
import React from 'react';
import {View, FlatList, Platform} from 'react-native';

import _ from '../../style/profile/Favor';
import data from '../../util/data';
import Header from '../common/Header';
import WoolItem from '../common/WoolItem';

export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            list: []
        };

        this.cacheList = [];
        this.page = 0;
        this.isLastPage = false;
        this.pageSize = 15;

        this.isLoading = false;
    }

    componentDidMount(){
        //拉取我的订阅
        this.loadOnePage();
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
        data.profileComment({page: this.page}, (res)=>{
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

    //显示列表的行
    renderItem(item, index){
        let itemRight = '';
        if(index == this.state.list.length - 1) {
            itemRight = {borderBottomWidth: 0};
        }
        return (
            <WoolItem data={item} style={itemRight} navigation={this.props.navigation} />
        );
    }

    render(){
        return (
            <View style={_.page}>
                <Header
                    title={'我评论过的资讯'}
                    navigation={this.props.navigation}
                />
                <View style={_.body}>
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
                            if(this.state.list.length >= this.pageSize && !this.isLastPage) {
                                this.loadOnePage();
                            }
                        }}
                        onEndReachedThreshold={Platform.OS=='ios'? 0 : 1}
                    />
                </View>

            </View>
        )
    }
}