import {Dimensions} from 'react-native';
import reset from '../reset';

const {width:clientWidth} = Dimensions.get('window');

let style = Object.assign({
	pager: {
		width: clientWidth
	},
	listBox: {
		flex: 1
	},
	tabBox: {
		borderStyle: 'solid',
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
		backgroundColor: '#fff'
	},
	tabBoxScroll: {
		paddingLeft: 20,
		paddingRight: 20
	},
	tabItem: {
		height: 44,
		borderBottomColor: '#FF2943',
		borderStyle: 'solid',
		borderBottomWidth: 1,
		justifyContent: 'center',
		marginRight: 30
	},
	tabItemWithoutMargin: {
		marginRight: 0
	},
	tabItemClickable: {
		borderBottomColor: 'transparent'
	},
	tabItemText: {
		fontSize: 15,
		color: '#313131'
	},
	tabItemTextClickable: {
		color: '#999'
	}
}, reset);

export default style;