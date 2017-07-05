import {Platform} from 'react-native';

let common = {
	page: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop : Platform.OS == 'ios' ? 20 : 0
	}
};

export default common;