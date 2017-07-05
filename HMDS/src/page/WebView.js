import Component from '../util/component';
import React from 'react';
import {View,Dimensions} from 'react-native';
import AutoHeightWebview from './common/AutoHeightWebview';
import Header from './common/Header';
import app from '../util/app';

import _ from '../style/WebView';
export default class WebView extends Component{
    constructor(props){
        super(props);

        this.state = {
            uri: ''
        };
        const {width, height} = Dimensions;
        this.width = width;
        this.height = height;
    }

    componentDidMount(){
        let uri = this.props.navigation.state.params.uri;
        this.setState({
            uri: uri
        })
    }

    render(){
        return (
            <View style={_.page}>
                <Header navigation={this.props.navigation}/>

                <AutoHeightWebview style={{width: this.width, height: this.height}} uri={this.state.uri} navigation={this.props.navigation}/>
            </View>
        );
    }
}