import Component from '../util/component';
import React from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    FlatList,
    Platform,
    Dimensions,
    ScrollView,
    Picker,
    Alert,
    TouchableWithoutFeedback,
    KeyboardAvoidingView
} from 'react-native';
import _ from '../style/GoodsDetail';

import Header from './common/Header';
import Touchable from './common/Touchable';
import data from '../util/data';
import Swiper from 'react-native-swiper';
import Share from './common/Share';
import Toast from './common/Toast';

//获取屏幕宽度
const {width} = Dimensions.get('window');

export default class GoodsDetail extends Component {
    constructor(props){
        super(props);

        this.state = {
            status: 0,    //0表示售罄，1表示积分不足，2表示可兑换
            exchangeNum: 1,
            showPicker: false,
            goods: {
                id:1,
                imgList: [],
                account: 0,
                price: 0,
                num: 1,
                title: '',
            },
            canAdd: true,
            canMinus: false
        };
        this.exchangeNum = 0;
    }

    componentDidMount(){
        let id = this.props.navigation.state.params.item.id;
        //获取商品详情
        data.getGoodsDetail({id}, (res)=>{
            if (res.code == 200){
                this.state.goods = res.data;
                if (this.state.num == 0){
                    this.state.status = 0;
                }else if (this.state.goods.account < this.state.goods.price*this.state.exchangeNum){
                    this.state.status = 1;
                }else{
                    this.state.status = 2;
                }

                //判断兑换数量的状态
                if (this.state.goods.account < this.state.goods.price*this.state.exchangeNum
                    || this.state.goods.num < 2){
                    this.state.canAdd = false;
                }
                this.forceUpdate();
            }else{
                Alert.alert(res.msg);
            }
        })
    }

    exchange(){
        //兑换商品
        data.exchangeGoods(({id: this.state.goods.id,num: this.state.exchangeNum}), (res)=>{
             if (res.code == 200){
                 this.state.goods.account = res.data.account;
                 this.state.goods.num = res.data.num;
                 this.forceUpdate();
                 this.updateStatus(1);
                 this.emit('toast', '兑换成功');
             }else{
                 this.emit('toast', res.msg);
             }
        });
    }

    //更新按钮状态
    updateStatus(val){
        if (!val){
            this.state.exchangeNum = '';
        }else{
            val = parseInt(val);
            this.state.exchangeNum = val;
        }
        //判断加减号的可用性
        if (val < 2) {
            this.state.canMinus = false;
        }else{
            this.state.canMinus = true;
        }

        if(val > 98
            || val > this.state.goods.num
            || (this.state.goods.price*(val+1)) > this.state.goods.account){
            this.state.canAdd = false;
        }else{
            this.state.canAdd = true
        }

        if (this.state.goods.num == 0){
            this.state.status = 0;
        }else if (this.state.goods.account < this.state.goods.price*val){
            this.state.status = 1;
        }else{
            this.state.status = 2;
        }
        this.forceUpdate();
    }

    showSwiper(list){
        if(!list || !Array.isArray(list) || list.length == 0) {
            return null;
        }

        let imgStyle = {resizeMode: 'cover'};
        imgStyle.width = imgStyle.height = width;

        let dotStyle = {
            position: 'relative',
            marginBottom: 0,
            width: 8,
            height: 8,
            borderRadius: 4
        };

        let slides = list.map((item, index)=>{
            return <Image source={item?{uri:item}:null} style={imgStyle} key={index}/>
        });

        return (
            <View style={_.swiper}>
                <Swiper
                    height={imgStyle.height}
                    dotStyle={dotStyle}
                    activeDotStyle={dotStyle}
                    dotColor="#fff"
                    activeDotColor="#ff2943"
                    autoplay={true}
                    autoplayTimeout={5}
                >
                    {slides}
                </Swiper>
            </View>
        );
    }

    render(){
        let input =
            <ScrollView style={_.body}>
                {this.showSwiper(this.state.goods.imgList)}
                <View style={_.detailBox}>
                    <Text style={_.title}>{this.state.goods.title}</Text>
                    <View style={_.detail}>
                        <View style={_.priceBox}>
                            <Image style={_.priceIcon} source={require('../assets/moeny_icon_red.png')}/>
                            <Text style={_.price}>{this.state.goods.price}羊毛</Text>
                        </View>
                        <Text style={_.num}>剩余：{this.state.goods.num}</Text>
                    </View>
                    <View style={_.accountWrap}>
                        <Text style={_.account}>我的羊毛：{this.state.goods.account}羊毛</Text>
                    </View>
                    <View style={_.numBox}>
                        <Text>选择兑换数量：</Text>
                        <View style={_.numWrap}>
                            <TouchableWithoutFeedback style={_.pickerWrap}
                                onPress={()=>{
                                    if (this.state.exchangeNum < 2){
                                        this.setState({
                                            canMinus: false
                                        })
                                    }else{
                                        this.updateStatus(this.state.exchangeNum-1);
                                    }
                                }}
                            ><View style={_.pickerWrap}>
                                <Image style={[_.priceIcon, this.state.canMinus?null:{opacity:0.3}]} source={require('../assets/minus_icon.png')}/>
                                </View>
                            </TouchableWithoutFeedback>
                            <TextInput style={[_.numText,{}]}
                                       value={''+this.state.exchangeNum}
                                       maxLength={2}
                                       keyboardType={'numeric'}
                                       returnKeyType={'next'}
                                       onChangeText={(num) =>{
                                           this.updateStatus(num);
                                       }}
                            />
                            <TouchableWithoutFeedback style={_.pickerWrap}
                                onPress={()=>{
                                    if (this.state.canAdd){
                                        this.updateStatus(this.state.exchangeNum+1);
                                    }
                                }}
                            ><View style={_.pickerWrap}>
                                <Image style={[_.priceIcon, this.state.canAdd?null:{opacity:0.3}]} source={require('../assets/add_icon.png')}/>
                            </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </ScrollView>


        if (Platform.OS == 'ios'){
            input = <KeyboardAvoidingView style={{flex:1}} behavior="padding">
                {input}
                {Platform.OS == 'ios' ?
                    <View>
                        <TextInput
                            value={'' + this.state.exchangeNum}
                            maxLength={2}
                            keyboardType={'numeric'}
                            returnKeyType={'next'}
                            onChangeText={(num) => {
                                this.updateStatus(num);
                            }}
                            style={_.numShowText}/>
                    </View>

                    :null}
            </KeyboardAvoidingView>
        }

        return (
            <View style={_.page}>
                <Header
                    title="商品详情"
                    navigation={this.props.navigation}
                />
                {input}
                <View style={_.footer}>
                    <Touchable
                        style={this.state.status==2?_.exchange:_.disable}
                        onPress={()=>{
                        if (this.state.status == 2){
                            if (this.state.exchangeNum == 0){
                                this.emit('toast', '请选择兑换数量');
                                return;
                            }
                            Alert.alert(
                                '是否兑换?',
                                '一旦兑换成功将不可取消',
                                [
                                    {text: '取消', onPress: () =>{}},
                                    {text: '确定', onPress: () =>this.exchange()}
                                ]
                            )
                        }
                    }}>
                        <Text style={_.exchangeText}>{this.state.status==0?'已售罄':'立即兑换'}</Text>
                    </Touchable>
                </View>
                <Share/>
                <Toast/>
            </View>
        );
    }
}