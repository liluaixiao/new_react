import {StyleSheet} from 'react-native';
import {commonStyle} from '../common/commonStyle';

export let S = StyleSheet.create(Object.assign({
	header: {
		borderBottomWidth: 1,
		borderStyle: 'solid',
		flexDirection: 'row',
		borderBottomColor: '#f1f1f1',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	navBackBox: {
		height: 44,
		width: 44,
		justifyContent: 'center',
		alignItems: 'center'
	},
	navBack: {
		borderStyle: 'solid',
		borderTopWidth: 2,
		borderLeftWidth: 2,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		borderTopColor: '#333',
		borderLeftColor: '#333',
		width: 12,
		height: 12,
		transform: [{rotate: '-45deg'}]
	},
	title: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	titleText: {
		fontSize: 18,
		color: '#333',
		fontWeight: '500'
	},
	timeinfo: {
		borderStyle: 'solid',
		borderColor: '#f2f2f2',
		borderTopWidth: 1,
		borderBottomWidth: 1,
	},
	tiItem: {
		marginLeft: 10,
		paddingRight: 10,
		height: 35,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	tiiWithBot: {
		borderStyle: 'solid',
		borderColor: '#f2f2f2',
		borderBottomWidth: 1
	},
	tit1: {
		fontSize: 17,
		color: '#000'
	},
	tit2: {
		fontSize: 17,
		color: '#888'
	},
	smallTitle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 10,
		paddingRight: 10,
		marginBottom: 10
	},
	stTag: {
		fontSize: 12,
		color: '#fff',
		backgroundColor: '#d0011b'
	},
	otag: {
		fontSize:18,
		color:'#2f91eb',
		borderColor:'#2f91eb',
		borderStyle:'solid',
		borderWidth:1,
		marginRight: 5,
		lineHeight: 20
	},
	otagp: {
		justifyContent:'flex-start',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom:10,
		marginLeft:10,
		paddingRight: 10
	},
	remindBox: {
		marginTop: 15,
		marginBottom: 15,
		alignItems: 'center'
	},
	remind: {
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
		borderStyle: 'solid',
		borderColor: '#979797',
		borderWidth: 1
	},
	detail: {
		padding: 10
	},
	detTitle: {
		fontSize: 17,
		color: '#222',
		marginBottom: 5
	},
	detDesc: {
		fontSize: 13,
		color: '#999'
	},
	source: {
		marginLeft:10,
		paddingBottom: 10,
		paddingTop: 10,
		paddingRight: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		borderStyle: 'solid',
		borderColor: '#f2f2f2',
		borderTopWidth: 1,
	},
	arrRight: {
		borderStyle: 'solid',
		borderColor: '#c7c7c7',
		borderTopWidth: 2,
		borderRightWidth: 2,
		width: 8,
		height: 8,
		transform: [{rotate:'45deg'}]
	},
	webview: {
		backgroundColor: '#fff',
		padding: 0,
		margin: 0
	}

}, commonStyle));