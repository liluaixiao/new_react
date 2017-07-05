import Component from '../../util/component';
import React from 'react';
import {View, FlatList, Platform} from 'react-native';
import _ from '../../style/search/SearchResult.js';

import Header from '../common/Header';
import ShopItem from '../common/ShopItem';
import data from '../../util/data';

export default class SearchResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            search: '',
            list: []
        };

        this.page = 0;
        this.isLastPage = false;
        this.pageSize = 15;

        this.isLoading = false;
    }

    componentDidMount(){
        let search = this.props.navigation.state.params.name;
        this.id = this.props.navigation.state.params.id;
        this.local = this.props.navigation.state.params.local;
        this.setState({
            search
        }, ()=>{
            //加载搜索结果
            this.loadOnePage();
        })
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
        let param = this.local;
        param.filterId = this.id;
        param.page = this.page;

        data.search(param, (res)=>{
            this.isLoading = false;
            this.isLastPage = res.data.isLastPage;

            if (this.page == 1){
               this.state.list = [];
            }
            let list = this.state.list.concat(res.data.list);
            this.setState({
                list
            }, ()=>{
                onLoad();
            })
        })
    }


    renderItem(item, index){
        return <ShopItem
            data={item}
            callback={()=>{
                this.props.navigation.navigate('SearchDetail', {item});
            }}
        />
    }

    render() {
        // if (!this.state.list || !this.state.list.length){
        //     return null;
        // }

        return (
            <View style={_.page}>
                <Header title={this.state.search} navigation={this.props.navigation}/>
                <FlatList
                    style={_.list}
                    refreshing={this.state.refreshing}
                    data={this.state.list}
                    keyExtractor={(item)=>item.id}
                    renderItem={({item, index}) => this.renderItem(item, index)}
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
        )
    }
}