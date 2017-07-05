import {Dimensions,Platform} from 'react-native';
import reset from './reset';

const {width:clientWidth, height:clientHeight} = Dimensions.get('window');

let adWidth = clientWidth-60,
	adHeight = 380*adWidth/320,
	adTop = (clientHeight-adHeight)/2 - (Platform.OS == 'ios' ? 90 : 70);

let style = Object.assign({
	body: {
		backgroundColor: '#f5f5f5',
		flex: 1
	},
	main: {
		width: clientWidth*4,
		position: 'absolute',
		top: 0,
		bottom: 0,
		flexDirection: 'row',
		alignItems: 'stretch'
	},

	footerBox: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		borderStyle: 'solid',
		borderTopColor: '#f0f0f0',
		borderTopWidth: 1,
	},
	iconBox: {
		alignItems: 'center',
		width: 50,
		height: 50,
		justifyContent: 'center',
	},
	icon: {
		width: 25,
		height: 25,
		resizeMode: 'contain'
	},
	text: {
		fontSize: 10,
		color: '#999',
		marginTop: 3
	},
	textCurrent: {
		color: '#000'
	},

	iconImageBox: {
		width: 25,
		height: 25,
		overflow: 'hidden',
		backgroundColor: 'transparent'
	},
	iconAll: {
		width: 50,
		height: 25,
		flexDirection: 'row',
		position: 'absolute',
		top: 0,
		left: 0
	},
	iconActive: {
		left: -25
	},

	//开屏弹框
	splashAd: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.7)',
		alignItems: 'center'
	},
	adBody: {
		position: 'relative',
		top: adTop
	},
	adClose: {
		height: 90,
		alignSelf: 'stretch'
	},
	adCloseIconBox: {
		position: 'absolute',
		right: 0,
		top: 0
	},
	adCloseIcon: {
		width: 30,
		height: 30
	},
	adCloseLine: {
		position: 'absolute',
		width: 2,
		height: 60,
		backgroundColor: '#fff',
		bottom: 0,
		right: 14
	},
	adImg: {
		width: adWidth,
		height: adHeight,
		resizeMode:'contain'
	}
}, reset);

export default style;