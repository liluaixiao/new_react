import {AppRegistry} from 'react-native';
import {StackNavigator} from 'react-navigation';

import Main from './page/Main';
import Master from './page/Master';
import Detail from './page/Detail';
import Profile from './page/Profile';
import MasterDetail from './page/MasterDetail';
import Subject from './page/Subject';
import Add from './page/Add';

import Favor from './page/profile/Favor';
import Comment from './page/profile/Comment';
import Subscribe from './page/profile/Subscribe';
import Exchange from './page/profile/Exchange';
import Task from './page/profile/Task';
import Mall from './page/Mall';
import GoodsDetail from './page/GoodsDetail';
import Calendar from './page/Calendar';
import Qa from './page/Qa';

import Discover from './page/search/Discover';
import ShopItem from './page/common/ShopItem';
import Search from './page/common/Search';
import SearchResult from './page/search/SearchResult';
import SearchDetail from './page/search/SearchDetail';
import CitySelect from './page/common/CitySelect';

import NewsSwiper from './page/common/NewsSwiper';

//临时禁止提示
console.ignoredYellowBox = ['Warning: BackAndroid'];

const HMDS = StackNavigator({
	Main: {screen: Main},
	Master: {screen: Master},
	Detail: {screen: Detail},
	Profile: {screen: Profile},
	MasterDetail: {screen: MasterDetail},
	Subject: {screen: Subject},
	Add: {screen: Add},
    Favor: {screen: Favor},
    Comment: {screen: Comment},
	Subscribe: {screen: Subscribe},
	Mall: {screen: Mall},
	GoodsDetail: {screen: GoodsDetail},
	Task: {screen: Task},
	Exchange: {screen: Exchange},
	Calendar: {screen: Calendar},
	Qa: {screen: Qa},

	// ShopItem: {screen: ShopItem},
	Search: {screen: Search},
	SearchResult: {screen: SearchResult},
	SearchDetail: {screen: SearchDetail},
	Discover: {screen: Discover},
	// CitySelect: {screen: CitySelect},
	NewsSwiper: {screen: NewsSwiper}
}, {
	initialRouteName: 'NewsSwiper',
	headerMode: 'none'
});

AppRegistry.registerComponent('HMDS', () => HMDS);