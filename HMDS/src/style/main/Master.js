import {Dimensions} from 'react-native';
import reset from '../reset';

const {width:clientWidth} = Dimensions.get('window');

let style = Object.assign({
	pager: {
		width: clientWidth,
		backgroundColor: '#fff',
	},
	littleTextBox: {
		height: 42,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center'
	},
	littleText: {
		fontSize: 12,
		color: '#999'
	},
	swiper: {
		backgroundColor: '#fff',
		// marginBottom: 10
		paddingTop: 20
	},
	slide: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 20,
		backgroundColor: '#fff'
	},
	slideTextBox: {
		height: 64
	},
	slideInfoBox: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 10
	},
	slideTitle: {
		fontSize: 16,
		color: '#000',
		marginTop: 10
	},
	slideNameBox: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	slideName: {
		fontSize: 12,
		color: '#999'
	},
	slideIntro: {
		marginLeft: 10
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

	subjectBox: {
		paddingTop: 15,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#fff',
		marginTop: 10,
	},
	subjectTitle: {
		fontSize: 22,
		color: '#000',
		fontWeight: 'bold',
		fontFamily: 'PingFangSC-Semibold',
		marginBottom: 10
	},
	masterBox: {
		paddingTop: 15,
		paddingBottom: 20,
		backgroundColor: '#fff',
		marginTop: 10,
	},
	masterBoxTitle: {
		marginLeft: 20
	},
	masterListBox: {
		backgroundColor: '#fff'
	},

	masterAvatarBox: {
		marginLeft: 20,
		width: 116,
		height: 168,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#e0e0e0',
		paddingTop: 10,
		paddingBottom: 10,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	masterAvatarBoxWithRight: {
		marginRight: 20
	},
	uaBox: {
		width: 66,
		height: 66
	},
	ua: {
		width: 66,
		height: 66,
		borderRadius: 33
	},
	uname: {
		fontSize: 16,
		color: '#000'
	},
	uintro: {
		fontSize: 10,
		color: '#999'
	},
	udy: {
		height: 30,
		width: 64,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#FF2943',
		borderRadius: 3,
		justifyContent: 'center',
		alignItems: 'center'
	},
	udyText: {
		fontSize: 16,
		color: '#FF2943'
	},

	udyGray: {
		borderColor: '#999',
	},
	udyTextGray: {
		color: '#999'
	},

	artBox: {
		marginTop: 10
	},
	artItemWithoutBottom: {
		marginBottom: 0,
	},
	loadMore: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 44,
		backgroundColor: '#fff',
		marginTop: 1,
		flexDirection: 'row'
	},
	loadMoreText: {
		// color: '#4990E2',
		color: '#FF2843',
		fontSize: 16
	},
	loadMoreTextGray: {
		color: '#666',
		fontSize: 16,
		marginLeft: 5
	},
	loadingIcon: {
		width: 16,
		height: 16,
		resizeMode:'contain',
		marginRight: 5
	}
}, reset);

export default style;