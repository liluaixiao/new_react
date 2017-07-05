import Component from '../../util/component';
import React from 'react';
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

export default class Touchable extends Component{
    constructor(props){
        super(props);
    }

    render(){
        /**
         * opacity区分组件的透明程度
         * 1表示不透明，没有反馈
         * 全局默认为0.6
         */
        if (this.props.opacity == 1){
            return <TouchableWithoutFeedback
                onPress={this.props.onPress}
                style={this.props.style}
            >{this.props.children}</TouchableWithoutFeedback>
        }else{
            return <TouchableOpacity
                activeOpacity={this.props.opacity || 0.6}
                onPress={this.props.onPress}
                style={this.props.style}
            >{this.props.children}</TouchableOpacity>
        }
    }
}