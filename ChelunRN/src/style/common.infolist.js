import {StyleSheet} from 'react-native';
import {commonStyle} from '../common/commonStyle';

export let S = StyleSheet.create(Object.assign({
	flag: {
		fontSize: 16,
		color: '#fff',
		textAlign: 'center',
		backgroundColor: '#d0011b',
		marginRight: 2
	},
	recItem: {
		flexDirection: 'row',
		paddingTop: 10,
		paddingBottom: 10,
		borderBottomWidth: 6,
		borderColor: '#f2f2f2',
		borderStyle: 'solid',
		alignItems: 'center'
	},
	recIB: {
		flexDirection: 'row',
		borderColor: '#f2f2f2',
		borderStyle: 'solid',
		borderTopWidth: 1,
		paddingTop: 5,
		alignItems: 'center'
	},
	rcib1: {
		fontSize: 12,
		color: '#2F91EB',
		borderColor: '#2F91EB',
		borderStyle: 'solid',
		borderWidth: 1,
		marginRight: 10,
		lineHeight: 14
	},
	rcib2: {
		fontSize: 12,
		color: '#333',
		flex: 1,
		marginRight: 10
	},
	rcib3: {
		width: 27,
		height: 14,
		backgroundColor: '#F6A623',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10
	}
}, commonStyle));