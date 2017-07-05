import {StyleSheet} from 'react-native';
import commonStyle from '../common/commonStyle';
export let S = StyleSheet.create(Object.assign({
	date: {
		flexDirection: 'row',
	},
	dateItem: {
		borderStyle: 'solid',
		borderRightWidth: 1,
		borderRightColor: '#f2f2f2',
		minHeight: 50,
		flex: 1,
		alignItems: 'stretch'
	},
	diNoBorder: {
		borderRightWidth: 0
	},
	diTop: {
		paddingTop: 3,
		paddingBottom: 3,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	diText: {
		fontSize: 12,
		color: '#333',
		textAlign: 'center',
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: 'transparent',
		lineHeight: 14
	},
	diTextRed: {
		color: '#D0011B'
	},
	diTextWithBorder: {
		// borderStyle: 'solid',
		// borderWidth: 1,
		borderColor: '#000',
	},
	diTip: {
		fontSize:10,
		lineHeight: 10,
		height:12,
		textAlignVertical: 'center',
		color: '#fff',
		marginTop: 1
	}
}, commonStyle));