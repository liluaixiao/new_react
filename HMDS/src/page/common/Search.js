import Component from '../../util/component';
import React from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    ScrollView,
    FlatList,
    Platform,
    Dimensions,
    Alert,
} from 'react-native';

import Touchable from '../common/Touchable';
import ShopItem from '../common/ShopItem';
import cache from '../../util/cache';
import data from '../../util/data';


//获取屏幕宽度
const {width, height} = Dimensions.get('window');

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            search: '',
            list: [],
            showClear: false,
            showHis: true,
            show: false
        };

        this.history = [];
        this.page = 0;
        this.isLastPage = false;
        this.pageSize = 15;

        this.isLoading = false;
    }

    componentDidMount(){
        /*
        this.on('showSearch', (res)=>{
            this.city = res.city;
            //读取本地缓存的搜索历史
            cache.getItem('hmds:searchHistory', (value)=>{
                // console.log('value：', value);
                this.history = value?JSON.parse(value): [];
                this.setState({
                    show: true,
                    showHis: true
                })
            });
        });*/
        this.local = this.props.navigation.state.params;
        //读取本地缓存的搜索历史
        cache.getItem('hmds:searchHistory', (value)=>{
            // console.log('value：', value);
            this.history = value?JSON.parse(value): [];
            this.setState({
                show: true,
                showHis: true
            })
        });

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
        let param = {
            page: this.page,
            search: this.state.search,
            city: this.local.city
        };
        if (this.local.lat){
            param.lat = this.local.lat;
            param.lon = this.local.lon;
            param.cityCode = this.local.cityCode;
        }

        data.search(param, (res)=>{
            this.isLoading = false;
            this.isLastPage = res.data.isLastPage;

            if (this.page == 1){
                this.state.list = [];
            }
            let list = this.state.list.concat(res.data.list);
            this.setState({
                list,
                showHis: false
            }, ()=>{onLoad()})
        })
    }

    //删除历史记录
    delHistory(index){
        this.history.splice(index,1);
        this.forceUpdate();
        cache.setItem('hmds:searchHistory', JSON.stringify(this.history));
    }

    //搜索历史记录
    searchHistory(item){
        this.setState({
            search: item
        }, ()=>{
            this.loadOnePage();
        });
    }

    showHistory() {
        if (!this.history.length || !this.state.showHis){
            return null;
        }

        let arr = this.history.map((item, index)=>{
            return  <View style={_.hisItem} key={index}>
                <Touchable
                    style={_.textBox}
                    onPress={()=>this.searchHistory(item)}
                >
                    <Text style={_.hisText}>{item}</Text>
                </Touchable>
                <Touchable
                    style={_.hisDel}
                    onPress={()=>this.delHistory(index)}
                >
                    <Image source={require('../../assets/Close_icon.png')}/>
                </Touchable>
            </View>
        });
        return  <ScrollView style={_.scroll}>
            <View style={_.hisBox}>
                <View style={_.tipBox}>
                    <Text style={_.hisTip}>搜索历史</Text>
                </View>

                {arr}
            </View>
        </ScrollView>
    }

    //跳转店铺详情
    jumpDetail(item){
        this.props.navigation.navigate('SearchDetail', {item});
    }

    showSearch() {
        if (!this.state.list.length){
            return null;
        }

        return <FlatList
            style={_.scroll}
            refreshing={this.state.refreshing}
            data={this.state.list}
            keyExtractor={(item)=>item.id}
            renderItem={({item, index}) =>{
                return <ShopItem
                    data={item}
                    callback={()=>this.jumpDetail(item)}
                    key={index}
                />
            }}
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
        />;
    }

    cancelSearch() {
        this.setState({
            show: false,
            list: [],
            shoHis: true,
            search: '',
            showClear: false
        });
        this.props.navigation.goBack(null);
    }

    clearSearch(){
        this.setState({
            search: '',
            showClear: false
        })
    }

    //搜索
    search(){
        let flag = false;
        //记录搜索记录
        this.history.forEach((item)=>{
            if (item == this.state.search){
                flag = true;
            }
        });
        if (!flag){
            this.history.unshift(this.state.search);
            cache.setItem('hmds:searchHistory', JSON.stringify(this.history));
        }


        this.resetPageInfo();
        this.loadOnePage();
    }

    render() {
        if (!this.state.show){
            return null;
        }

        return (
            <View style={_.page}>
                <View style={_.header}>
                    <View style={_.searchBox}>
                        <Image style={{opacity:0.3}} source={require('../../assets/Search_icon.png')}/>
                        <TextInput
                            style={_.searchText}
                            value={this.state.search}
                            autoFocus={true}
                            placeholder={'请输入餐厅名称或分类'}
                            returnKeyType={'search'}
                            underlineColorAndroid={'transparent'}
                            placeholderTextColor={'#c0c0c0'}
                            onSubmitEditing={()=>this.search()}
                            onChangeText={(search) =>{
                                this.setState({
                                    search,
                                    showClear: !!search
                                });
                            }}
                        />
                        <Touchable
                            style={[_.closeBox, this.state.showClear?null:{display:'none'}]}
                            onPress={()=>this.clearSearch()}
                        >
                            <Image source={require('../../assets/Close_icon.png')}/>
                        </Touchable>
                    </View>
                    <Touchable
                        style={_.cancelBox}
                        onPress={()=>{this.cancelSearch()}}
                    >
                        <Text style={_.cancelText}>取消</Text>
                    </Touchable>
                </View>
                {this.showHistory()}
                {this.showSearch()}
            </View>
        )
    }
}

//样式
const _ = {
    page: {
        // backgroundColor: '#fff',
        // height:Platform.OS=='ios'?height-70:height-70,
        // marginTop : -44
        flex: 1,
        backgroundColor: '#fff',
        paddingTop : Platform.OS == 'ios' ? 20 : 0
    },
    header: {
        width,
        height: 44,
        borderStyle: 'solid',
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    searchBox: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        width: 260,
        backgroundColor: 'rgba(216,216,216, .3)',
        borderRadius: 100,
        height: 32,
        paddingLeft: 10,
        paddingRight: 10
    },
    searchText: {
        height: Platform.OS == 'ios'?32:40,
        fontSize:14,
        width: 200,
        paddingLeft: 10,
    },
    closeBox: {
        position: 'absolute',
        right: 10,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#c0c0c0'
    },
    cancelBox: {
        width: 44,
        height: 44,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    cancelText: {
        fontSize: 15,
        color: '#ff2943'
    },
    scroll: {
        backgroundColor: '#f5f5f5'
    },
    tipBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 28,
        backgroundColor: '#f5f5f5',
    },
    hisTip: {
        fontSize: 12,
        color: '#999',
        paddingLeft: 10,
    },
    hisItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 40,
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
    },
    textBox:{
        // backgroundColor: 'red',
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        width: width-60
    },
    hisText: {
        fontSize:15,
        color: '#333'
    },
    hisDel: {
        width: 50,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
};