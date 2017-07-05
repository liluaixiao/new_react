import Component from '../../util/component';
import React from 'react';
import {
    View,
    Image,
    Text,
    ScrollView,
    Dimensions,
    Animated,
    Easing
} from 'react-native';

import _ from '../../style/main/Index';
import ShopItem from '../common/ShopItem';
import data from '../../util/data';

import loginCheck from '../../util/login';
import Touchable from '../common/Touchable';
import app from '../../util/app';
import Header from '../common/Header';
import Swiper from 'react-native-swiper';

//获取屏幕宽度
const {width} = Dimensions.get('window');

export default class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recommend: [],
            recommendBan: [],
            master: [],
            banner: [],
            menu: [],
            link: [],
            news: [],
            discount: [],
            discover: [],
            discountRotate: new Animated.Value(0),
            masterRotate: new Animated.Value(0),
        };

        this.key = 0;

        this.discountPage = 0;
        this.discountLoading = false;

        this.masterPage = 0;
        this.masterLoading = false;

        //折扣、大师刷新动画对象
        this.discountAnimte = false;
        this.masterAnimate = false;
    }

    componentDidMount(){

        //初始化加载一次
        this.on('triggerHomeLoad', ()=>{
            //获取顶部banner
            data.indexBanner((res)=>{
                if (res.code == 200){
                    // alert(JSON.stringify(res.data.banner));
                    this.setState({
                        banner: res.data.banner
                    })
                }
            });

            //获取分类菜单和跳转链接
            data.indexMenu((res)=>{
                if (res.code == 200){
                    this.setState({
                        menu: res.data.menu,
                        link: res.data.link
                    })
                }
            });

            //获取滚动新闻
            data.indexNews((res)=>{
                if (res.code == 200){
                    this.setState({
                        news: res.data.news
                    })
                }
            });

            //获取折扣
            // this.loadDiscount();

            //获取大师
            this.loadMaster();

            //获取推荐的列表，支持多种格式
            data.homeRecommend((res)=>{
                if(res.code == 200) {
                    this.setState({
                        recommend: res.data.list,
                        recommendBan: res.data.banner
                    })
                }
            });

            //获取附件优惠餐厅
            app.getLocation().then((local)=> {
                this.setState({
                    local: {
                        cityCode: local.gdCityCode || 0,
                        city: local.city,
                        lat: local.gcjLat || 0,
                        lon: local.gcjLng || 0,
                        local: true
                    }
                }, ()=> {
                    if (this.state.local.city == '城市') {
                        Alert.alert('', '定位失败，请选择所在城市', [
                            {
                                text: '去选择城市', onPress: ()=> {
                                this.showCity()
                            }
                            }
                        ])
                    } else {
                        this.local = this.state.local.city;
                    }
                });
            });
        });
    }

    mixJump(item){
        app.stat('hmds-recommend-click', '今日推荐'+(item.detail.id || item.id));
        if(item.type == 1) {
            this.props.navigation.navigate('Detail', {item:item.detail});
        } else if(item.type == 2) {
            this.props.navigation.navigate('MasterDetail', {item:item.detail});
        } else if(item.type == 3) {
            app.open(data.getAdUrl(data.AdTypeBanner, item.id, item.detail.adUrl));
        }else if(item.type == 4){
            //跳转办卡入口
            this.emit('changeTab', 1);
        }
    }

    //显示banner位
    showBanner(){
        if(!this.state.banner || !this.state.banner.length) {
            return null;
        }

        //375*150
        let bigImageStyle = {width};
        bigImageStyle.height = bigImageStyle.width * 150 / 375;
        let list = this.state.banner.map((item)=>{
            return (
                <Touchable key={`${item.id},${this.key++}`} onPress={()=>this.mixJump(item)}>
                    <Image source={{uri: item.img}} resizeMode="cover"
                           style={bigImageStyle}/>
                </Touchable>
            );
        });

        let dotStyle = {
            width: 6,
            height: 6,
            borderRadius: 3
        };

        return (
            <Swiper
                width={bigImageStyle.width}
                height={bigImageStyle.height}
                dotStyle={dotStyle}
                activeDotStyle={dotStyle}
                dotColor="rgba(0,0,0,0.3)"
                activeDotColor="#f5f5f5"
                autoplay={true}
                autoplayTimeout={5}
                paginationStyle={_.pagination}
            >{list}</Swiper>
        );
    }


    //编辑精选
    showRecommend(){
        if (!this.state.recommend || !this.state.recommend.length){
            return null;
        }
        let banner = <Touchable style={_.recommendBan} onPress={()=>this.mixJump(this.state.recommendBan[0])}>
            <Image style={_.recommendBanImg} source={{uri: this.state.recommendBan[0].img}}/>
            <Text style={_.recommendBanTit} numberOfLines={1}>{this.state.recommendBan[0].title}</Text>
            <Text style={_.recommendBanInfo} numberOfLines={1}>{this.state.recommendBan[0].dateinfo}</Text>
        </Touchable>;

        let list = this.state.recommend.map((item, index)=>{
            return <Touchable style={_.recommendItem} key={index} onPress={()=>this.mixJump(item)}>
                <Image style={_.recommendImg} source={{uri: item.img}}/>
                <View>
                    <Text style={_.recommendTit} numberOfLines={2}>{item.title}</Text>
                    <Text style={_.recommendIntro} numberOfLines={2}>{item.dateinfo}</Text>
                </View>
            </Touchable>
        });

        return <View style={_.discountBox}>
            <View style={_.discountTitWrap}>
                <View style={_.discountTitItem}>
                    <Text style={_.discountTit}>编辑精选</Text>
                    <Image source={require('../../assets/arrow_icon.png')}/>
                </View>
                <Touchable style={_.discountTitItem} onPress={()=>{this.emit('changeTab', 3)}}>
                    <Text style={_.recommendMore}>查看全部</Text>
                </Touchable>
            </View>
            {banner}
            {list}
        </View>
    }

    //跳转专辑页面
    jumpSubject(item){
        app.stat('hmds-album-click', '大师精选栏'+item.id);
        if(item.isAd) {
            app.open(data.getAdUrl(data.AdTypeSubject, item.id, item.adUrl));
        } else {
            this.props.navigation.navigate('Subject', {item});
        }
    }

    //显示薅毛大师列表
    showMaster(){
        if(!this.state.master || !this.state.master.length) {
            return null;
        }

        let list = this.state.master.map((item, index)=>{
            return <Touchable style={_.masterItem} key={index}
                    onPress={()=>{this.props.navigation.navigate('Subject', {item: {id: item.id}})}}
                >
                <Image style={_.masterImg} source={{uri: item.avatar}}/>
                <View style={_.masterInfo}>
                    <View>
                        <Text style={_.masterName} numberOfLines={1}>{item.name}</Text>
                        <Text style={_.masterIntro} numberOfLines={1}>{item.remark}</Text>
                        <Text style={_.masterUpdate}>{item.update}</Text>
                    </View>
                    <View>{
                        item.article.map((value, key)=>{
                            return <Touchable key={key}
                                    onPress={()=>{this.props.navigation.navigate('MasterDetail', {item: {id: value.id}})}}
                                >
                                <Text style={_.masterArticle} numberOfLines={1}>{value.title}</Text>
                            </Touchable>
                        })
                    }</View>
                </View>
            </Touchable>
        });


        return <View style={_.discountBox}>
            <View style={_.discountTitWrap}>
                <View style={_.discountTitItem}>
                    <Text style={_.discountTit}>专栏合作</Text>
                    <Image source={require('../../assets/arrow_icon.png')}/>
                </View>
                <Touchable style={_.discountTitItem} onPress={()=>this.loadMaster()}>
                    <Animated.Image
                        source={require('../../assets/refresh.png')}
                        style={{transform: [{rotate: this.state.masterRotate.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg','720deg']})}]
                        }}>
                    </Animated.Image>
                    <Text style={_.discountRefresh}>换一批</Text>
                </Touchable>
            </View>
            {list}
        </View>

    }

    /**
     * 滚动新闻
     * @return {XML}
     */
    showNews(){
        if (!this.state.news || !this.state.news.length){
            return null;
        }

        let list = [];
        for (let i=0; i<this.state.news.length/2;i++){
            list.push([
                this.state.news[i*2],
                this.state.news[i*2+1]
            ])
        }

        let swipe = list.map((item, index)=>{
            return  <View key={index} style={{height: 62}}>
                <Touchable style={_.news} onPress={()=>{this.props.navigation.navigate('MasterDetail', {item:item[0]})}}>
                    <Text style={_.newsIcon}>文章</Text>
                    <Text style={_.newsText} numberOfLines={1}>{item[0].text}</Text>
                </Touchable>
                <Touchable style={_.news} onPress={()=>{this.props.navigation.navigate('Detail', {item:item[1]})}}>
                    <Text style={_.newsIcon}>优惠</Text>
                    <Text style={_.newsText} numberOfLines={1}>{item[1].text}</Text>
                </Touchable>
            </View>
        });

        return <View style={_.newsBox}>
            <View style={_.newsWrap}>
                <Text style={_.newsLabel}>优惠新闻</Text>
                <Swiper
                    style={_.newsSwiper}
                    height={62}
                    horizontal={false}
                    autoplay={true}
                    autoplayTimeout={5}
                >
                    {swipe}
                </Swiper>
            </View>
        </View>
    }

    /**
     * 首屏菜单
     */
    showMenu(){
        if (!this.state.menu || !this.state.menu.length){
            return null;
        }
        return <View style={_.menuBox}>{
            this.state.menu.map((item, index)=>{
                return   <Touchable style={_.menu} key={index}
                    onPress={()=>{
                        if (/url:/.test(item.link)){
                            app.open(item.link.replace('url:', ''))
                        }else{
                            let reg = /app:\/\/([a-zA-Z]*)\/(\d*)/.exec(item.link);
                            this.props.navigation.navigate(reg[1], {item: {id: reg[2]}});
                        }
                    }}
                >
                    <Image style={_.menuImg} source={{uri:item.img}} resizeMode="cover"/>
                    <Text style={_.menuText}>{item.text}</Text>
                </Touchable>
            })
        }</View>
    }

    /**
     * 图文链接
     * @return
     */
    showLink(){
        if (!this.state.link || !this.state.link.length){
            return null;
        }
        return <View style={_.linkBox}>
            {this.state.link.map((item, index)=>{
                return <View style={_.linkWrap} key={index}>
                    {item.map((value, key)=>{
                        return <Touchable key={key} style={[_.link, {flex: parseInt(value.weight), borderColor:key?'rgba(192,192,192,.3)':'#fff'}]}
                            onPress={()=>{
                                if (/url:/.test(value.link)){
                                    app.open(value.link.replace('url:', ''))
                                }else{
                                    let reg = /app:\/\/([a-zA-Z]*)\/(\d*)/.exec(value.link);
                                    this.props.navigation.navigate(reg[1], {item: {id: reg[2]}});
                                }
                            }}
                        >
                            <Image style={_.linkImg} source={{uri: value.img}}/>
                        </Touchable>
                    })}
                </View>
            })}
        </View>;
    }

    /**
     * 五折餐厅
     * @return
     */
    showDiscount(){
        if (!this.state.discount || !this.state.discount.length){
            return null
        }
        let list = null, discount = [];
        for (let i=0;i<this.state.discount.length/2-1; i++){
            discount.push([
                this.state.discount[2*i],
                this.state.discount[2*i+1]
            ])
        }
        if (this.state.discount.length%2){
            discount.push([this.state.discount[this.state.discount.length-1]]);
        }

        list = discount.map((item, index)=>{
            let gap = null;
            if (index != discount.length-1){
                gap = <Text style={_.discountGap}/>
            }
            return <View style={_.discountItemWrap} key={index}>
                <Touchable style={_.discountItem}
                           onPress={()=>{this.props.navigation.navigate('SearchDetail', {item: {id: item[0].id}});}}
                >
                    <Image style={_.discountImg} source={{uri: item[0].img}}/>
                    <Text style={_.discountTitle} numberOfLines={1}>{item[0].title}</Text>
                    <Text style={_.discountIntro} numberOfLines={1}>{item[0].intro}</Text>
                    <Text style={_.discountLabel}>50%折扣</Text>
                    {gap}
                </Touchable>{
                item[1]? <Touchable  style={_.discountItem}
                                     onPress={()=>{this.props.navigation.navigate('SearchDetail', {item: {id: item[1].id}});}}
                        >
                    <Image style={_.discountImg} source={{uri: item[1].img}}/>
                    <Text style={_.discountTitle} numberOfLines={1}>{item[1].title}</Text>
                    <Text style={_.discountIntro} numberOfLines={1}>{item[1].intro}</Text>
                    <Text style={_.discountLabel}>50%折扣</Text>
                    {gap}
                </Touchable>:null
            }
            </View>
        });

        return <View style={_.discountBox}>
            <View style={_.discountTitWrap}>
                <View style={_.discountTitItem}>
                    <Text style={_.discountTit}>五折餐厅</Text>
                    <Image source={require('../../assets/arrow_icon.png')}/>
                </View>
                <Touchable style={_.discountTitItem} onPress={()=>this.loadDiscount()}>
                    <Animated.Image
                        source={require('../../assets/refresh.png')}
                        style={{transform: [{rotate: this.state.discountRotate.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg','720deg']})}]
                        }}>
                    </Animated.Image>
                    <Text style={_.discountRefresh}>换一批</Text>
                </Touchable>
            </View>
            <View style={_.discountBody}>
                {list}
            </View>
        </View>
    }

    /**
     * 刷新五折餐厅
     */
    loadDiscount(){
        if (this.discountLoading){
            return;
        }
        this.discountLoading = true;
        this.discountPage += 1;

        let animate = null;
        if (this.discountAnimte){
            animate = Animated.loop(
                Animated.timing(this.state.discountRotate, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true
                })
            );
            animate.start();
        }else{
            this.discountAnimte = true;
        }

        data.loadDiscount({page: this.discountPage}, (res)=>{
            this.discountLoading = false;
            this.isLastPage?this.discountPage = 0: null;

            //关闭刷新动画
            setTimeout(()=>{
                animate && animate.stop();
                animate && this.state.discountRotate.setValue(0)
            }, 3000);


            this.setState({
                discount: res.data.discount
            })
        })
    }

    /**
     * 刷新大师
     */
    loadMaster(){
        if (this.masterLoading){
            return;
        }
        this.masterLoading = true;
        this.masterPage += 1;
        let animate = null;
        if (this.masterAnimate){
            animate = Animated.loop(
                Animated.timing(this.state.masterRotate, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true
                })
            );
            animate.start();
        }else{
            this.masterAnimate = true;
        }
        data.loadMaster({page: this.masterPage, size: 3} , (res)=>{
            this.masterLoading = false;
            res.data.isLastPage?this.masterPage = 0: null;

            //关闭刷新动画
            setTimeout(()=>{
                animate && animate.stop();
                animate && this.state.masterRotate.setValue(0)
            }, 3000);

            this.setState({
                master: res.data.list
            })
        })
    }

    /**
     * 发现优惠列表
     * @return
     */
    showDiscover(){
        // if (!this.state.discover || !this.state.discover.length){
        //     return null
        // }
        this.state.discover = [
            {
                "id":1,
                "img":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                "name":"麦当劳（车轮互联店）",
                "type":"快餐",
                "discounts":[
                    {
                        "name":"50%折扣",
                        "color":"#ff2943"
                    },
                    {
                        "name":"买一送一",
                        "color":"#aa6789"
                    }
                ],
                "banks":[
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg"
                ],
                "distance":"10m"
            },
            {
                "id":2,
                "img":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                "name":"麦当劳（车轮互联店）",
                "type":"快餐",
                "discounts":[
                    {
                        "name":"50%折扣",
                        "color":"#ff2943"
                    },
                    {
                        "name":"买一送一",
                        "color":"#aa6789"
                    }
                ],
                "banks":[
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg"
                ],
                "distance":"10m"
            },
            {
                "id":3,
                "img":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                "name":"麦当劳（车轮互联店）",
                "type":"快餐",
                "discounts":[
                    {
                        "name":"50%折扣",
                        "color":"#ff2943"
                    },
                    {
                        "name":"买一送一",
                        "color":"#aa6789"
                    }
                ],
                "banks":[
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg"
                ],
                "distance":"10m"
            },
            {
                "id":4,
                "img":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                "name":"麦当劳（车轮互联店）",
                "type":"快餐",
                "discounts":[
                    {
                        "name":"50%折扣",
                        "color":"#ff2943"
                    },
                    {
                        "name":"买一送一",
                        "color":"#aa6789"
                    }
                ],
                "banks":[
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg"
                ],
                "distance":"10m"
            },
            {
                "id":5,
                "img":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                "name":"麦当劳（车轮互联店）",
                "type":"快餐",
                "discounts":[
                    {
                        "name":"50%折扣",
                        "color":"#ff2943"
                    },
                    {
                        "name":"买一送一",
                        "color":"#aa6789"
                    }
                ],
                "banks":[
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg"
                ],
                "distance":"10m"
            },
            {
                "id":6,
                "img":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                "name":"麦当劳（车轮互联店）",
                "type":"快餐",
                "discounts":[
                    {
                        "name":"50%折扣",
                        "color":"#ff2943"
                    },
                    {
                        "name":"买一送一",
                        "color":"#aa6789"
                    }
                ],
                "banks":[
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg"
                ],
                "distance":"10m"
            },
            {
                "id":7,
                "img":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                "name":"麦当劳（车轮互联店）",
                "type":"快餐",
                "discounts":[
                    {
                        "name":"50%折扣",
                        "color":"#ff2943"
                    },
                    {
                        "name":"买一送一",
                        "color":"#aa6789"
                    }
                ],
                "banks":[
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg"
                ],
                "distance":"10m"
            },
            {
                "id":8,
                "img":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                "name":"麦当劳（车轮互联店）",
                "type":"快餐",
                "discounts":[
                    {
                        "name":"50%折扣",
                        "color":"#ff2943"
                    },
                    {
                        "name":"买一送一",
                        "color":"#aa6789"
                    }
                ],
                "banks":[
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg",
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2354028297,3791795748&fm=23&gp=0.jpg"
                ],
                "distance":"10m"
            }
        ];

        let list = this.state.discover.map((item, index)=>{
            return <ShopItem
                data={item}
                callback={()=>{this.props.navigation.navigate('SearchDetail', {item})}}
                key={index}
            />
        });

        return <View style={_.discountBox}>
            <View style={_.discountTitWrap}>
                <View style={_.discountTitItem}>
                    <Text style={_.discountTit}>优惠大全</Text>
                    <Image source={require('../../assets/arrow_icon.png')}/>
                </View>
            </View>
            {list}
            <Touchable style={_.discoverMore} onPress={()=>{this.emit('changeTab', 1)}}>
                <Text style={_.discoverText}>点此查看全部优惠</Text>
            </Touchable>
        </View>
    }


    render() {
        return (
            <View style={_.pager}>
                <Header
                    navigation={this.props.navigation}
                    menuType="profile"
                />
                <ScrollView>
                    {this.showBanner()}
                    {this.showMenu()}
                    {this.showNews()}
                    {this.showLink()}
                    {this.showRecommend()}
                    {this.showDiscount()}
                    {this.showMaster()}
                    {this.showDiscover()}
                </ScrollView>
            </View>
        );
    }
}