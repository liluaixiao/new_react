import reset from '../reset';
import {Dimensions} from 'react-native';

const {width: clientWidth} = Dimensions.get('window');

let style = Object.assign({
	toast: {
		maxWidth: clientWidth - 80,
		position: 'absolute',
		backgroundColor: '#000',
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 5,
		paddingBottom: 5,
		// borderRadius: 1
	},
	toastContent: {
		color: '#fff',
		fontSize: 12
	}
}, reset);

export default style;