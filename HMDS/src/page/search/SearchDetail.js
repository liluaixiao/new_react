import Component from '../../util/component';
import React from 'react';
import {View, ScrollView, Image, Text, Alert} from 'react-native';
import _ from '../../style/search/SearchDetail.js';

import Header from '../common/Header';
import data from '../../util/data';
import Touchable from '../common/Touchable';

import app from '../../util/app';

export default class SearchDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        }
    }

    componentDidMount(){
        let id = this.props.navigation.state.params.item.id;
        //获取商品详情
        data.searchDetail({id}, (res)=>{
            if (res.code == 200){
                this.setState({
                    data: res.data
                })
            }else{
                Alert.alert(
                    '',
                    res.msg,
                    [
                        {text: 'ok', onPress: () =>{}}
                    ]
                )
            }
        });
    }

    showDiscount(discounts){
        if (!discounts || !discounts.length){
            return null;
        }

        let render = discounts.map((item, index)=>{
            return <View style={[_.discount, {borderColor: item.color}]} key={index}>
                <Text style={[_.discountText, {color: item.color}]}>{item.name}</Text>
            </View>
        });

        return  render;
    }

    showBankInfo(banks){
        if (!banks || !banks.length){
            return null;
        }

        let render = banks.map((item, index)=>{
            let desc = null;
            if (item.desc && item.desc.length) {
                desc = item.desc.map((item, index)=> {
                    return <Text style={_.itemDesc} key={index}>{item}</Text>
                });
                desc = <View style={_.itemDescBox}>{desc}</View>
            }
            return <View key={index} style={_.bankItem}>
                <View style={_.itemIconBox}>
                    <Image style={_.itemIcon} source={{uri: item.icon}}/>
                    <Text style={[_.flag,item.flagColor?{backgroundColor: item.flagColor}:null]}>{item.flag}</Text>
                </View>
                <Text style={_.itemTitle}>{item.title}</Text>
                {desc}
                <View style={_.itemDate}>
                    <Image source={require('../../assets/time_icon.png')}/>
                    <Text style={_.dateText}>{item.date}</Text>
                    <Image source={require('../../assets/date_icon.png')}/>
                    <Text style={_.dateText}>{item.week}</Text>
                </View>
            </View>
        });

        return <View style={_.bankBox}>
            {render}
        </View>;
    }

    render() {
        let data = this.state.data;
        if(!data || typeof data != 'object' || !data.name) {
            return null;
        }

        return (
            <View style={_.page}>
                <Header title={'详情'} navigation={this.props.navigation}/>
                <ScrollView style={_.body}>
                    <View style={_.infoBox}>
                        <Image style={_.infoImg} source={{uri: data.img}}/>
                        <View style={_.info}>
                            <Text style={_.infoName}>{data.name}</Text>
                            <Text style={_.infoType}>{data.type}</Text>
                            <View style={_.discountBox}>
                                {this.showDiscount(data.discounts)}
                            </View>
                        </View>
                    </View>
                    <View style={_.localBox}>
                        <View style={_.localAddr}>
                            <Image style={_.localIcon} source={require('../../assets/location_icon.png')}/>
                            <Text style={_.localText}>{data.addr}</Text>
                        </View>
                        <Touchable style={_.localPhone} onPress={()=>{
                            //唤起打电话
                            app.open(`tel:${this.state.data.phone}`)
                        }}>
                            <Image source={require('../../assets/phone_icon.png')}/>
                        </Touchable>

                    </View>
                    {this.showBankInfo(data.bankInfo)}
                </ScrollView>
            </View>
        )
    }
}