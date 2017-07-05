import {Dimensions} from 'react-native';
import reset from '../reset';

const {width:clientWidth} = Dimensions.get('window');

let style = Object.assign({
	pager: {
		width: clientWidth
	},
	today: {
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
		borderStyle: 'solid'
	},
	todayBox: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		height: 49
	},
	todayLeft: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	calendarIcon: {
		marginRight: 10,
		width: 19,
		height: 19,
		resizeMode: 'contain'
	},
	todayTip: {
		color: '#313131',
		fontSize: 14
	},
	todayArrow: {
		width: 10,
		height: 10,
		borderStyle: 'solid',
		borderTopColor: '#313131',
		borderLeftColor: '#313131',
		borderTopWidth: 1,
		borderLeftWidth: 1,
		transform: [{rotate: '135deg'}]
	},

	//推荐羊毛
	section: {
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#fff',
		marginBottom: 10
	},
	titleBig: {
		fontSize: 22,
		color: '#000',
		fontWeight: 'bold',
		fontFamily: 'PingFangSC-Semibold'
	},
	titleSmall: {
		fontSize: 12,
		color: '#666',
		marginBottom: 15,
		marginTop: 3
	},
	hmtitle: {
		fontSize: 15,
		color: '#313131',
		marginTop: 5,
		marginBottom: 5
	},
	timeinfoBox: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	timeinfo: {
		fontSize: 12,
		color: '#999',
	},
	hmItemRow: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	hmItem: {
		marginBottom: 20,
	},
	hmItemGrid: {
		// flex: 1
	},
	msTitle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	moreMs: {
		fontSize: 15,
		color: '#FF2943'
	},
	moreMsBox: {
		marginBottom: 10
	},

	masterList: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between'
	},
	masterItem: {
		marginBottom: 20
	},
	masterImg: {
		resizeMode: 'cover',
		justifyContent: 'center',
		alignItems: 'center'
	},
	masterTitle: {
		color: '#fff',
		backgroundColor: 'transparent',
		fontSize: 16,
		marginBottom: 5
	},
	masterSubTitle: {
		color: '#fff',
		backgroundColor: 'transparent',
		fontSize: 12
	},

	//tool
	tool: {
		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#fff'
	},
	toolIntro: {
		alignItems: 'center'
	},
	toolIntroImage: {
		resizeMode: 'contain',
		width: 254,
		height: 30,
		marginBottom: 10,
	},
	toolIntroText: {
		color: '#A9B7BB',
		fontSize: 14,
		marginBottom: 15,
	},
	toolBtnBox: {
		backgroundColor: '#5F7D86',
		height: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 10,
		paddingRight: 10,
		marginBottom: 20,
	},
	toolBtnText: {
		fontSize: 14,
		color: '#fff'
	},
	swiper: {
		marginBottom: 20,
	}
}, reset);

export default style;