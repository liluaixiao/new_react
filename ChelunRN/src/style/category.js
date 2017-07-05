import {StyleSheet} from 'react-native';
import {commonStyle} from '../common/commonStyle';
import {Platform} from 'react-native';

export let S = StyleSheet.create(Object.assign({
	stHover: {
		height: 36,
		alignItems: 'center',
		justifyContent: 'center'
	},
	stItem:{
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: '#f2f2f2'
	},
	stBox: {
		backgroundColor: '#fff',
		overflow: 'hidden'
	},
	subType: {
		backgroundColor: 'rgba(0,0,0,.5)',
		position: 'absolute',
		left: 0,
		right: 0,
		top: Platform.OS == 'android' ? 122 : 137,
		bottom: 0,
		zIndex: 2
	},
	typeOption: {
		paddingTop: 10,
		paddingLeft: 10,
		paddingRight: 10,
		borderStyle: 'solid',
		borderBottomWidth: 1,
		borderColor: '#f2f2f2',
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	toItem: {
		fontSize: 16,
		padding: 0,
		margin: 0,
		color: '#999',
	},
	toView: {
		marginRight: 20,
		borderBottomWidth: 2,
		borderStyle: 'solid',
		borderColor: 'transparent',
		paddingBottom: 8
	},
	allsel: {
		height: 34,
		borderStyle: 'solid',
		borderColor: '#f2f2f2',
		borderBottomWidth: 1,
	},
	allselTouch: {
		flex: 1,
		justifyContent: 'center'
	},
	allselHover: {
		flexDirection:'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	arrowDomn: {
		borderStyle: 'solid',
		borderColor: '#999',
		borderLeftWidth: 1,
		borderBottomWidth: 1,
		width: 8,
		height: 8,
		marginLeft:10,
		top:-2,
		transform: [{rotate:'-45deg'}]
	},
}, commonStyle));
