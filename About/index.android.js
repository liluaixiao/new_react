import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import Main from './about'

export default class About extends Component {
    render(){
        return <Main />
    }
}

AppRegistry.registerComponent('About', () => About);
