import {Dimensions} from 'react-native';
import reset from './reset';
const {width} = Dimensions.get('window');

let style = Object.assign({
	body: {
		flex: 1,
		backgroundColor: '#f5f5f5'
	},
	topBox: {
		marginBottom: 1
	},
	topImg: {
		width,
		height: width*200/375,
		resizeMode: 'cover'
	},
	titleBox: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: '#fff'
	},
	title: {
		fontSize: 18,
		color: '#000'
	},
	subTitle: {
		marginTop: 10,
		fontSize: 12,
		color: '#999'
	}
}, reset);

export default style;