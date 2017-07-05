import Component from '../../util/component';
import React from 'react';
import {View, FlatList, Platform, RefreshControl, Alert} from 'react-native';

import _ from '../../style/profile/Favor';
import data from '../../util/data';
import Header from '../common/Header';
import ArticleThumbItem from '../common/ArticleThumbItem';

import SwipeableListView from 'SwipeableListView';
import SwipeableQuickActions from 'SwipeableQuickActions';
import SwipeableQuickActionButton from 'SwipeableQuickActionButton';


export default class Favor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            list: [],
            dataSource: SwipeableListView.getNewDataSource()
        };

        this.rowId = [];

        this.cacheList = [];
        this.page = 0;
        this.isLastPage = false;
        this.pageSize = 15;

        this.isLoading = false;
    }

    componentDidMount(){
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
        data.profileFavor({page: this.page}, (res)=>{
            this.isLoading = false;
            this.isLastPage = res.data.isLastPage;

            if (res.data.list){
                let loadedList = res.data.list.map((item)=>{
                    item.key = item.id;
                    return item;
                });
                this.cacheList.push(...loadedList);
                for (let i=0,len=this.cacheList.length; i<len; i++){
                    this.rowId.push(i);
                }
                //加载完之后刷新列表，同时关闭图标
                this.state.dataSource = this.state.dataSource.cloneWithRowsAndSections({sid:this.cacheList}, ['sid'], [this.rowId]);
                this.forceUpdate();
                onLoad();
            }
        })

    }

    //取消收藏
    cancelFavor(id, rowData){
        data.cancelFavor({id:rowData.id}, (res)=>{
            if (res.code == 200){
                this.rowId = this.rowId.join('').replace(id, '').split('');
                // console.log('删除id之后的数组：', this.rowId);
                this.state.dataSource = this.state.dataSource.cloneWithRowsAndSections({sid:this.cacheList}, ['sid'], [this.rowId]);
                this.forceUpdate();
                // console.log('更新后的dataSource: ', this.state.dataSource);
            }
            Alert.alert(
                '',
                res.msg,
                [
                    {text: 'ok', onPress: () =>{}}
                ]
            )
        })
    }

    //绘制列表每一行的行为
    renderActions(rowData, sectionId, rowId){
        return (
            <SwipeableQuickActions>
                <SwipeableQuickActionButton
                    imageSource={{}} text={"删除"}
                    onPress={() => this.cancelFavor(rowId, rowData)}
                    style={_.btnAction} textStyle={_.btnText}
                />
            </SwipeableQuickActions>
        );
    }

    //绘制每一行
    renderRow(item, sectionId, rowId){
        // console.log('date：', item, 'sid：', sectionId, 'rid: ', rowId);
        let itemRight = '';
        if(rowId == this.cacheList.length - 1) {
            itemRight = {borderBottomWidth: 0};
        }
        item.btnText = '查看';
        return (
            <ArticleThumbItem data={item} style={itemRight} callback={()=>{
                this.props.navigation.navigate('MasterDetail', {item})
            }}/>
        );
    }

    render(){
        return (
            <View style={_.page}>
                <Header
                    title={'我的收藏'}
                    navigation={this.props.navigation}
                />
                <SwipeableListView
                    style={_.body}
                    bounceFirstRowOnMount={true}
                    maxSwipeDistance={60}
                    renderQuickActions={(rowData, sectionId, rowId) => this.renderActions(rowData, sectionId, rowId)}
                    enableEmptySections={true}
                    initialListSize={this.pageSize}
                    pageSize={1}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing= {this.state.refreshing}
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
                        />
                    }
                    onEndReached={()=>{
                        if(this.cacheList.length >= this.pageSize && !this.isLastPage) {
                            this.loadOnePage();
                        }
                    }}
                    onEndReachedThreshold={Platform.OS=='ios'? 0 : 1}
                />
            </View>
        )
    }
}