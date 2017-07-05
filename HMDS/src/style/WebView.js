import {Dimensions} from 'react-native';
import reset from './reset';
const {width} = Dimensions.get('window');

let style = Object.assign({
	body: {
		flex: 1,
		backgroundColor: '#f5f5f5'
	}
}, reset);

export default style;