import Component from '../../util/component';
import React from 'react';
import {View, Image, Text} from 'react-native';

import _ from '../../style/common/ShopItem';
import Touchable from './Touchable';


export default class ShopItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data || null,
        };
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

        return render;
    }

    showBank(banks){
        if (!banks || !banks.length){
            return null;
        }

        let render = banks.map((item, index)=>{
            return <View style={_.iconStyle} key={index}>
                <Image style={_.iconStyle} source={{uri:item}}/>
            </View>
        });

        return render;
    }


    render(){
        let data = this.state.data;
        if(!data || typeof data != 'object' || !data.id) {
            return null;
        }
        let local = null;
        if (data.distance){
            local =  <View style={_.shopLocal}>
                <Image style={_.localIcon} source={require('../../assets/location_icon.png')}/>
                <Text style={_.localText}>{data.distance}</Text>
            </View>
        }

        return (
            <Touchable style={_.shopBox} onPress={()=>this.props.callback()}>
                <View style={_.shopInfoBox}>
                    <View style={_.shopImgBox}>
                        <Image style={_.shopImg} source={data.img?{uri:data.img}: null}/>
                    </View>
                    <View style={_.shopInfo}>
                        <Text style={_.infoName} numberOfLines={1}>{data.name}</Text>
                        <View style={_.infoBox}>
                            <Text style={_.infoType}>{data.type}</Text>
                            {this.showDiscount(data.discounts)}
                        </View>
                        <View style={_.iconBox}>
                            {this.showBank(data.banks)}
                        </View>
                    </View>
                </View>
                {local}
            </Touchable>
        )
    }
}


