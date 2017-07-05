import {StyleSheet} from 'react-native';
import {commonStyle} from '../common/commonStyle';

export let S = StyleSheet.create(Object.assign({
	btntp: {
		flex: 1,
	},
	btnTouch: {
		paddingTop: 15,
		paddingBottom: 15,
		alignItems: 'center',
	},
	btnTouchWidthBorder: {
		borderStyle: 'solid',
		borderColor: '#d4d4d4',
		borderRightWidth: 1
	},
	btnP: {
		flexDirection: 'row'
	},
	btnT: {
		color: '#0076FF',
		fontSize: 17,
		padding: 0,
		margin:0
	},
	pmx: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	pin:{
		padding: 10,
		backgroundColor:'#d8d8d8',
		marginBottom: 10,
		height: 44,
		justifyContent: 'center'
	},
	pinT: {
		fontSize: 18,
		padding:0,
		margin:0,
		borderWidth: 0
	},
	pbox: {
		backgroundColor: '#fff',
		borderRadius: 10,
		marginLeft: 38,
		marginRight: 38,
		alignSelf: 'stretch'
	},
	pboxText: {
		padding: 20,
		alignItems: 'stretch',
		borderStyle: 'solid',
		borderColor: '#d4d4d4',
		borderBottomWidth: 1
	},
	pTitle: {
		fontSize: 18,
		color: '#666',
		alignSelf: 'center',
		marginBottom: 10
		// textAlign: 'center'
	},
	popup: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center'
	},
	dayInfo: {
		paddingTop: 10,
		paddingRight: 18,
		paddingBottom: 10,
		paddingLeft: 50,
		borderStyle: 'solid',
		borderColor: '#f2f2f2',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		marginTop: 5
	},
	diText: {
		fontSize: 14,
		color: '#666',
		flex: 1,
		textAlign: 'center'
	},
	diAdd:{
		position: 'absolute',
		right: 0,
		top: 0,
		bottom: 0,
		width: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	mxTip: {
		marginTop: 10
	},
	item: {
		padding: 10,
		borderStyle: 'solid',
		borderColor: '#F2F2F2',
		borderBottomWidth: 1
	},
	mTime: {
		marginBottom: 3,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	mInfo: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	label: {
		fontSize: 12,
		color: '#2f91EB',
		borderWidth: 1,
		borderColor: '#2f91EB',
		borderStyle: 'solid',
		marginLeft: 3,
		paddingTop:0,
		paddingBottom:0,
		paddingLeft:2,
		paddingRight:2,

		textAlign:'center'
	},
	nohm: {
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 10,
		paddingRight: 10
	},
	nohmBody: {
		backgroundColor: '#d8d8d8',
		borderRadius: 3,
		padding: 15
	},
	arrowTop: {
		position: 'absolute',
		borderTopWidth: 10,
		borderBottomWidth: 10,
		borderLeftWidth: 5,
		borderRightWidth: 5,
		borderStyle: 'solid',
		borderColor: '#d8d8d8',
		borderTopColor: 'transparent',
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		top: -20,
		right: 10
	}
}, commonStyle));