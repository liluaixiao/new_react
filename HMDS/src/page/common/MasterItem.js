import Component from '../../util/component';
import React from 'react';
import {View, Image, Text, Dimensions} from 'react-native';

import _ from '../../style/common/MasterItem';
import Touchable from './Touchable';
import app from '../../util/app';


export default class MasterItem extends Component{
    constructor(props){
        super(props);

        this.state = {
            id: 0,
            avatar: '',
            name: '',
            intro: '',
            hasSub: '',
            btnText: '',
            callback: ()=>{}
        };
    }


    render(){
        let text = '';
        if (this.props.data.btnText == '订阅'){
            text = <Text style={this.props.data.hasSub?_.subGray:_.sub}>{this.props.data.hasSub?'已订阅': '+ 订阅'}</Text>
        }else if (this.props.data.btnText == '查看'){
            text = <Text style={_.sub}>查看</Text>
        }

        return (
            <View style={{backgroundColor: '#fff'}}>
                <Touchable onPress={()=>{
                    app.stat('hmds-subsItem-click', '订阅大师点击'+this.props.data.id);
                    this.props.callback()
                }}>
                    <View style={[_.intro, this.props.style || {}]}>
                        <View style={_.info}>
                            <Image style={_.avatar} source={this.props.data.avatar?{uri:this.props.data.avatar}:null}/>
                            <View style={_.desc}>
                                <Text style={_.name}>{this.props.data.name}</Text>
                                <Text style={_.slogon} numberOfLines={1}>{this.props.data.intro}</Text>
                            </View>
                        </View>
                        {/*{text}*/}
                    </View>
                </Touchable>
            </View>
        )
    }
}