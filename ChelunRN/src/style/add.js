import {StyleSheet} from 'react-native';
import {commonStyle} from '../common/commonStyle';

let common = {
	marginTop: 10,
	backgroundColor: '#fff',
	borderStyle: 'solid',
	borderColor: '#e5e5e5',
	borderTopWidth: 1,
	borderBottomWidth: 1,
};

export let S = StyleSheet.create(Object.assign({
	titleText: {
		fontSize: 18,
		color: '#333',
		fontWeight: '500'
	},
	body: {
		flex: 1,
		backgroundColor: '#ededed'
	},
	btn: {
		height:50,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f6a623'
	},
	textInput: Object.assign({
		height:74,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
		paddingBottom: 10,
		fontSize:17,
		textAlignVertical: 'top'
	}, common),
	li: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		marginLeft: 15,
		// paddingRight: 15,
		borderStyle: 'solid',
		borderColor: '#e5e5e5',
		borderBottomWidth: 1,
	},
	liWithoutPad: {
		paddingTop: 0,
		paddingBottom: 0,
	},
	liLeft: {
		fontSize: 17,
		color: '#000'
	},
	liRight: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingRight: 15
	},
	lirt: {
		fontSize: 17,
		color: '#8888',
		marginRight: 10
	},
	arrowRight: {
		width: 10,
		height: 10,
		borderStyle: 'solid',
		borderColor: '#c7c7c7',
		borderTopWidth: 2,
		borderRightWidth: 2,
		transform: [{rotate: '45deg'}]
	},
	ul: Object.assign({}, common),
	withoutBt: {
		borderBottomWidth: 0
	},
	tip: {
		paddingTop: 10,
		paddingLeft: 15,
		paddingRight: 15,
		color:'#4a4a4a',
		fontSize: 14
	}

}, commonStyle));