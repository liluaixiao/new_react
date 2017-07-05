import React from 'react';
import {AppRegistry} from 'react-native';
import {StackNavigator} from 'react-navigation';

import Main from './src/main';
import Add from './src/add';
import Calendar from './src/calendar';
import Category from './src/category';
import Detail from './src/detail';

const ChelunRN = StackNavigator({
	Main: { screen: Main },
	Add: { screen: Add },
	Calendar: { screen: Calendar },
	Category: { screen: Category },
	Detail: { screen: Detail },
}, {
	initialRouteName: 'Main',
	headerMode: 'none'
});

AppRegistry.registerComponent('ChelunRN', () => ChelunRN);
