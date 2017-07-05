import Component from '../../util/component';
import React from 'react';
import {View, FlatList, Platform, RefreshControl, Text, Alert} from 'react-native';

import _ from '../../style/profile/Favor';
import data from '../../util/data';
import Header from '../common/Header';
import MasterItem from '../common/MasterItem';

import SwipeableListView from 'SwipeableListView';
import SwipeableQuickActions from 'SwipeableQuickActions';
import SwipeableQuickActionButton from 'SwipeableQuickActionButton';


export default class Subscribe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            length: 0,
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
        //拉取我的订阅
        this.loadOnePage();

        // this.state.dataSource = this.state.dataSource.cloneWithRowsAndSections({
        //     s1:[{id:1,value:1},{id:2,value:1},{id:3,value:1},{id:4,value:1},
        //         {id:21,value:1},{id:22,value:1},{id:23,value:1},{id:24,value:1},
        //         {id:31,value:1},{id:32,value:1},{id:33,value:1},{id:34,value:1}]}, ['s1'], null);
        // this.forceUpdate();
    }

    //重置页面信息
    resetPageInfo(){
        this.page = 0;
        this.isLastPage = false;
        this.cacheList = [];
        this.rowId = [];
    }

    //加载一页数据
    loadOnePage(onLoad = ()=>{}){
        if(this.isLoading || this.isLastPage) {
            return ;
        }

        this.isLoading = true;
        this.page += 1;
        data.profileSubs({page: this.page}, (res)=>{
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


    //取消订阅
    cancelSubs(id, rowData){
        data.cancelSubs({id:rowData.mid}, (res)=>{
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
                    onPress={() => this.cancelSubs(rowId, rowData)}
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
            <MasterItem  data={item} style={itemRight} callback={()=>{
                this.props.navigation.navigate('Master', {item: {id: item.mid}});
            }}/>
        );
    }

    render(){
        return (
            <View style={_.page}>
                <Header
                    title={'我的订阅'}
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