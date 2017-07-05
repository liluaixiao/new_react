import reset from '../reset';
import {Platform} from 'react-native';

let style = Object.assign({
	container: {
		height: 44,
		borderStyle: 'solid',
		borderBottomColor: '#f0f0f0',
		borderBottomWidth: 1,
		backgroundColor: '#fff'
	},
	title: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row'
	},
	titleBox:{
		position: 'absolute',
		top: 0,
		left: 80,
		right: 80,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		zIndex: 100
	},
	titleText: {
		color: '#343434',
		fontSize: 17
	},
	titleNeg: {
		paddingTop: 10,
		paddingBottom: 10,
		marginLeft: 12,
		marginRight: 12,
	},
	titleAct: {
		borderStyle: 'solid',
		borderBottomColor: '#ff2943',
		borderBottomWidth: 2,
		paddingBottom: Platform.OS=='ios'?11:8,
		paddingTop:Platform.OS=='ios'?13:10,
	},
	navBackIcon: {
		width: 11,
		height: 11,
		borderStyle: 'solid',
		borderTopColor: '#000',
		borderLeftColor: '#000',
		borderTopWidth: 2,
		borderLeftWidth: 2,
		transform: [{rotate: '-45deg'}]

	},
	btn: {
		position: 'relative',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	backBox: {
		width: 44,
		height: 44,
		alignItems: 'center',
		justifyContent: 'center'
	},
	right: {
		height: 44,
		flexDirection: 'row',
		alignItems: 'center'
	},

	profile: {
		height: 44,
		width: 44,
		alignItems: 'center',
		justifyContent: 'center'
	},
	subs: {
		height: 44,
		paddingRight: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	profileIcon: {
		width: 24,
		height: 24,
		resizeMode: 'contain'
	},
	shareIcon: {
		width: 16,
		height: 20,
		resizeMode: 'contain'
	},
	subsIcon: {
		fontSize:16,
		color: '#ff2943'
	},
	disSubsIcon: {
		fontSize: 16,
		color: '#c0c0c0'
	},
	rowCenter: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},

	menuItem: {
		width: 55,
		height: 44
	},
	exchange: {
		height: 44,
		paddingLeft: 15,
		paddingRight: 15
	},
	editText: {
		fontSize: 14,
		color: '#000'
	},
	editTextRed: {
		color: '#FF2843'
	},
	canAddText: {
		fontSize: 14,
		color: '#FF2843'
	},
	canNotAddText: {
		fontSize: 14,
		color: '#999'
	}
}, reset);

export default style;