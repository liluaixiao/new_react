import {Dimensions} from 'react-native';
import reset from './reset';

const {scale} = Dimensions.get('window');
let style = Object.assign({
	body: {
		backgroundColor: '#f5f5f5',
		flex: 1
	},
	tool: {
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#fff'
	},
	toolTitle: {
		paddingTop: 20,
		paddingBottom: 10
	},
	toolItemBox: {
		height: 52,
		alignItems: 'stretch',
		justifyContent: 'center',
		borderStyle: 'solid',
		borderTopWidth: 1/scale,
		borderTopColor: '#f0f0f0'
	},
	toolItemBoxNoBorder: {
		borderTopWidth: 0,
		borderTopColor: '#fff'
	},
	toolItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		flex: 1,
	},
	textBox:{
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingRight: 10
	},
	toolItemText: {
		fontSize: 18,
		color: '#666'
	},
	toolItemDesc: {
		fontSize: 14,
		color: '#ff2943'
	},
	triIcon: {
		resizeMode: 'contain',
		width: 6,
		height: 10
	},
	titleBig: {
		fontSize: 22,
		color: '#000',
		fontWeight: 'bold',
		fontFamily: 'PingFangSC-Semibold'
	},

	uiBox: {
		backgroundColor: '#fff',
		alignItems: 'center'
	},
	avatarBox: {
		width: 80,
		height: 80,
		marginTop: 20,
		marginBottom: 20
	},
	avatar: {
		width: 80,
		height: 80,
		resizeMode: 'cover',
		borderRadius: 40
	},
	uiNameBox: {
		marginBottom: 30
	},
	uiName: {
		color: '#333',
		fontSize: 20
	},
	totalBox: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	scoreBox: {
		alignSelf: 'stretch',
		paddingLeft: 20,
		paddingRight: 20,
		justifyContent: 'space-between',
		marginBottom: 40,
		flexDirection: 'row',
		alignItems: 'center'
	},
	moneyIcon: {
		width: 22,
		height: 22,
		resizeMode: 'contain',
		marginRight: 10
	},
	qaIcon: {
		width: 12,
		height: 12,
		resizeMode: 'contain'
	},
	totalScore: {
		fontSize: 20,
		color: '#333',
		marginRight: 5
	},
	ymText: {
		fontSize: 14,
		color: '#666',
		marginRight: 5
	},
	dueText: {
		color: '#666',
		fontSize: 12
	}
}, reset);

export default style;