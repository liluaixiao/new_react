import {Platform} from 'react-native';


let page = {
	flex: 1,
	backgroundColor: '#fff'
};
if(Platform.OS == 'ios') {
	page.paddingTop = 20;
}

export let commonStyle = {
	page,
	rowCenter: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	flexRow: {
		flexDirection: 'row'
	},
	text: {
		paddingTop: 0,
		paddingBottom: 0,
		paddingLeft: Platform.OS == 'ios' ? 0 :2,
		paddingRight: Platform.OS == 'ios' ? 0 :2,
		textAlign: 'center',
		// alignItems:'center',
		// justifyContent: 'center',
		textAlignVertical: 'center'
	}
};