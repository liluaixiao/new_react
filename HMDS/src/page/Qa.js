import Component from '../util/component';
import React from 'react';
import {View, Image, Text, Platform, Dimensions, ScrollView, Alert} from 'react-native';
import _ from '../style/Qa';

import Header from './common/Header';
import Touchable from './common/Touchable';
import moment from 'moment';
import CLPicker from './common/Picker';
import data from '../util/data';

export default class Qa extends Component {
    constructor(props){
        super(props);

        let date = this.end = moment().format("YYYY-MM");

        this.state = {
            type: 'wool',
            incomeType: 'income',
            date: date,
            wool: {
                date: [],
                total: 0,
                income:{
                    income: 0,
                    consume: 0
                },
                list: [],
                item:{
                    income:[],
                    consume:[]
                }
            }
        };
    }

    componentDidMount(){
        let type = this.props.navigation.state.params.type;
        this.emit('switch', {type});
        this.showType(type);
        if (type == 'wool')
            this.getWoolData();
    }

    //获取当前月份的数据
    getWoolData(date = this.state.date){
        data.getWoolData({date}, (res)=>{
            if (res.code == 200){
                this.state.wool = res.data;
                this.state.wool.total = res.data.total.toString().replace(/\+|-/, '');
                this.state.wool.item.income.forEach((item)=>{
                    item.childCls = _.arrow;
                });
                this.state.wool.item.consume.forEach((item)=>{
                    item.childCls = _.arrow;
                });
                this.state.wool.list = this.state.wool.item.income;
                this.state.wool.date.forEach((item, index)=>{
                    this.state.wool.date[index] = {
                        value: item
                    }
                });


                this.forceUpdate();
                // console.log('当前state里的date：', this.state.wool.date);
            }else{
                Alert.alert(res.msg);
            }
        });
    }

    //显示帮助栏目
    showType(type){
        this.state.type = type;
        this.forceUpdate();
    }

    //显示羊毛收入
    showWoolList(wool){
        let woolList = wool.map((item, index)=>{
            let child = null;
            if (item.childCls != _.arrow){
                child = item.child && item.child.map((value, key)=>{
                    return <View style={_.woolChild} key={key}>
                        <View style={_.woolChildItem}>
                            <Text style={_.woolItemDate}>{value.date}</Text>
                            <Text style={_.woolItemNum}>{value.num}</Text>
                        </View>
                        <View style={_.woolChildItem}>
                            <Text numberOfLines={1} style={_.woolItemNum}>{value.name}</Text>
                            <Text style={_.woolItemDate}>(有效期至{value.expire})</Text>
                        </View>
                    </View>
                });
            }
            return <View style={_.woolItem}>
                <View style={_.woolDesc}>
                    <Text style={_.woolName}>{item.name}</Text>
                    <Touchable style={_.woolAction} onPress={()=>{
                        this.state.wool.list.forEach((value)=>{
                            if (value.name == item.name){
                                if (item.childCls == _.arrow){
                                    value.childCls = [_.arrow, _.arrowExp];
                                }else{
                                    value.childCls = _.arrow;
                                }
                            }
                        });
                        this.forceUpdate();
                    }}>
                        <Text style={_.woolNum}>{item.num}</Text>
                        <View style={item.childCls}/>
                    </Touchable>
                </View>
                {child}
            </View>
        });

        return <View style={_.woolList}>
            {woolList}
        </View>
    }

    render(){
        let content = null, defaultDate='';


        if (this.state.type == 'problem'){
            content = <View style={_.body}>
                <Text style={_.question}>什么是羊毛？</Text>
                <Text style={_.answer}>羊毛是我们回馈用户的一种积分体系，在这里使用羊毛可以兑换非常丰厚的物品。</Text>
                <Text style={_.question}>羊毛如何获得？</Text>
                <Text style={_.answer}>羊毛可以通过完成新手任务以及在车轮查违章消费获取。</Text>
                <Text style={_.question}>羊毛有什么用？</Text>
                <Text style={_.answer}>羊毛是车主生活惠创造出来的一套虚拟货币体系，在后期用户可以在车主生活惠中直接兑换商品、里程、酒店，我们也正在和各大服务商谈合作，未来用户可以直接用羊毛兑换各大银行的信用卡积分等。</Text>
            </View>
        }else{
            if (this.state.wool.date[0]){
                // console.log('日期对比：', this.state.wool.date, this.state.date);
                defaultDate = this.state.wool.date[0].value;
                this.state.wool.date.forEach((item)=>{
                    if (item.value == this.state.date){
                        defaultDate = this.state.date;
                    }
                })
            }
            content = <ScrollView style={_.woolBody}>
                <View style={_.dateWrap}>
                    <CLPicker style={_.dateStyle}
                              data={this.state.wool.date}
                              textStyle={_.dateTextStyle}
                              valueChange={(val)=>{this.state.date = val;this.forceUpdate();this.getWoolData();}}
                              format={(val)=>{
                                  return val.replace('-', '年')+'月'
                              }}
                              defaultValue={defaultDate}
                    />
                    <View style={_.dateIcon}/>
                </View>

                <View style={_.total}>
                    <Text style={_.totalStyle}>{/-/.test(this.state.wool.total)?'-':'+'}</Text>
                    <Text style={_.totalNum}>{this.state.wool.total}</Text>
                    <Text style={_.totalText}>羊毛</Text>
                </View>
                <View style={_.income}>
                    <Touchable
                        onPress={()=>{
                            this.state.incomeType = 'income';
                            this.state.wool.list = this.state.wool.item.income;
                            this.forceUpdate();
                        }}
                        style={[_.incomeItem, this.state.incomeType=='income'?{backgroundColor:'#e3e3e3'}:null]
                    }>
                        <Text style={_.incomeName}>羊毛收入</Text>
                        <Text style={_.incomeNum}>+{this.state.wool.income.income}羊毛</Text>
                    </Touchable>
                    <Touchable
                        onPress={()=>{
                            this.state.incomeType = 'consume';
                            this.state.wool.list = this.state.wool.item.consume;
                            this.forceUpdate();
                        }}
                        style={[_.incomeItem, this.state.incomeType=='income'?null:{backgroundColor:'#e3e3e3'}]
                    }>
                        <Text style={_.incomeName}>羊毛支出</Text>
                        <Text style={_.consumeNum}>-{this.state.wool.income.consume}羊毛</Text>
                    </Touchable>
                </View>
                {this.showWoolList(this.state.wool.list || [])}
            </ScrollView>;
        }

        return (
            <View style={_.page}>
                <Header
                    navigation={this.props.navigation}
                    menuType="QA"
                    callback={(type)=>this.showType(type)}
                />
                {content}
                <CLPicker.IOS/>
            </View>
        );
    }
}