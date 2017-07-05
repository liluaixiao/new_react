import Component from '../../util/component';
import React from 'react';
import {View, Text, FlatList, Platform, Image, Dimensions, Alert} from 'react-native';
import _ from '../../style/search/Discover.js';

import ShopItem from '../common/ShopItem';
import Slide from '../common/Slide';
import Search from '../common/Search';
import CitySelect from '../common/CitySelect';

import Touchable from '../common/Touchable';
import data from '../../util/data';
import app from '../../util/app';

//获取屏幕宽度
const {width} = Dimensions.get('window');

export default class Discover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            local: {
                city: '',
                cityCode: 0,
                lon: 0,
                lat: 0
            },
            subList: [],
            shopList: [],
            type: 'index'
        };

        this.page = 0;
        this.isLastPage = false;
        this.pageSize = 15;

        this.isLoading = false;
        this.filterId = '';   //筛选条件

        this.location = '';
    }

    //重置页面信息
    resetPageInfo(){
        this.page = 0;
        this.isLastPage = false;
    }

    componentDidMount(){
        this.on('triggerDiscoverLoad', ()=>{
            //网络请求，获取发现页详情数据
            //获取城市定位
            app.getLocation().then((local)=>{
                // console.log('local：', local);
                this.setState({
                    local: {
                        cityCode: local.gdCityCode || 0,
                        city: local.city,
                        lat: local.gcjLat || 0,
                        lon: local.gcjLng || 0,
                        local: true
                    }
                }, ()=>{
                    if (this.state.local.city == '城市'){
                        Alert.alert('', '定位失败，请选择所在城市', [
                            {text: '去选择城市', onPress: ()=>{this.showCity()}}
                        ])
                    }else{
                        this.local = this.state.local.city;
                    }
                });
                this.loadOnePage();
            });

            //获取专题数据
            data.homeRecommendSubject({location:1}, (res)=>{
                this.setState({subList: res.data});
            })
        });

    }

    //加载一页数据
    loadOnePage(onLoad = ()=>{}){
        if(this.isLoading || this.isLastPage) {
            return ;
        }
        this.isLoading = true;
        this.page += 1;
        let param = {
            city: this.state.local.city,
            page: this.page
        };
        if (this.state.local.local){
            param.lat = this.state.local.lat;
            param.lon = this.state.local.lon;
            param.cityCode = this.state.local.cityCode
        }
        if (this.state.type == 'filter'){
            param = {
                page: this.page,
                filterId: this.filterId
            }
        }
        data.search(param, (res)=>{
            this.isLoading = false;
            this.isLastPage = res.data.isLastPage;

            if (this.page == 1){
                this.state.shopList = [{id: -1}, {id:0}];
            }
            let list = this.state.shopList.concat(res.data.list);
            this.setState({
                shopList: list
            }, ()=>{onLoad()})
        })
    }

    //筛选的回调
    finishFilter(id){
        this.filterId = id;
        this.resetPageInfo();
        this.setState({
            type: 'filter'
        }, ()=>{this.loadOnePage()})
    }

    //显示专题推荐
    showSubject(data){
        if(!data || !Array.isArray(data) || data.length == 0) {
            return null;
        }

        //158*90
        let imgStyle = {width: (width - 60) / 2};
        imgStyle.height = imgStyle.width * 90 / 158;

        let list = data.map((item)=>{
            let title = item.title;
            if(item.isAd) {
                title = `#${item.title}#`;
            }
            let img = item.img ? {uri: item.img} : null;
            return (
                <Touchable style={_.masterItem}
                           key={`${item.id},${this.key++}`}
                           onPress={()=>this.jumpSubject(item)}>
                    <Image style={[_.masterImg, imgStyle]} source={img}>
                        <Text style={_.masterTitle}>{title}</Text>
                        <Text style={_.masterSubTitle}>{item.subTitle}</Text>
                    </Image>
                </Touchable>
            );
        });

        return (
            <View style={_.section}>
                <View style={_.msTitleBox}>
                    <Text style={_.msTitle}>专题推荐</Text>
                    <Image source={require('../../assets/arrow_icon.png')}/>
                </View>

                <View style={_.masterList}>{list}</View>
            </View>
        );
    }

    //显示附近优惠标题
    showTitle(){
        if (this.state.shopList.length < 3)
            return null;
        return  <View style={[_.msTitleBox,{marginBottom: 0}]}>
            <Text style={_.msTitle}>附近优惠</Text>
            <Image source={require('../../assets/arrow_icon.png')}/>
        </View>
    }

    //跳转专辑页面
    jumpSubject(item){
        if(item.isAd) {
            app.open(data.getAdUrl(data.AdTypeSubject, item.id, item.adUrl));
        } else {
            this.props.navigation.navigate('Subject', {item});
        }
    }

    //跳转店铺详情
    jumpDetail(item){
        this.props.navigation.navigate('SearchDetail', {item});
    }

    renderItem(item, index){
        if (item.id == -1){
            return this.showSubject(this.state.subList);
        }else if(item.id == 0){
            return this.showTitle();
        }else{
            return <ShopItem
                data={item}
                callback={()=>this.jumpDetail(item)}
                key={index}
            />
        }
    }

    //显示筛选
    showSlide(){
        let param = {
            city: this.state.local.city
        };
        if (this.state.local.local){
            param.lat = this.state.local.lat;
            param.lon = this.state.local.lon;
            param.cityCode = this.state.local.cityCode
        }
        this.emit('showSlide', param);
    }

    //显示城市选择
    showCity(){
        this.emit('showCity');
    }

    //显示搜索
    showSearch(){
        let param = {
            city: this.state.local.city
        };
        if (this.state.local.local){
            param.lat = this.state.local.lat;
            param.lon = this.state.local.lon;
            param.cityCode = this.state.local.cityCode
        }
        this.props.navigation.navigate('Search', (param));
        // this.emit('showSearch', {city: this.state.local.city});
    }

    //选择城市
    selCity(city){
        this.state.local.city = city;
        if (this.local != city){
            this.state.local.local = false;
        }else{
            this.state.local.local = true;
        }

        this.forceUpdate();
        this.resetPageInfo();
        this.loadOnePage();
    }

    render(){
        let city = null;
        if (this.state.local.city){
            city = <CitySelect local={this.state.local} selCity={this.selCity.bind(this)}/>
        }

        return (
            <View style={_.page}>
                <View style={_.header}>
                    <Touchable style={_.localBox} onPress={()=>this.showCity()}>
                        <Text style={_.localText} numberOfLines={1}>{this.state.local.city}</Text>
                        <View style={_.localIcon}/>
                    </Touchable>
                    <Touchable style={_.searchBox} onPress={()=>this.showSearch()}>
                        <Image source={require('../../assets/Search_icon.png')}/>
                        <Text style={_.searchText}>请输入餐厅名称或分类</Text>
                    </Touchable>
                    <Touchable style={_.filterBox} onPress={()=>this.showSlide()}>
                        <Image source={require('../../assets/shaixuan.png')}/>
                    </Touchable>
                </View>
                <FlatList
                    style={_.scroll}
                    refreshing={this.state.refreshing}
                    data={this.state.shopList}
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
                        if(this.state.shopList.length >= this.pageSize && !this.isLastPage) {
                            this.loadOnePage();
                        }
                    }}
                    onEndReachedThreshold={Platform.OS=='ios'? 0 : 1}
                />
                <Slide select={this.filterId} finish={this.finishFilter.bind(this)} navigation={this.props.navigation}/>
                {city}
            </View>
        )
    }
}

