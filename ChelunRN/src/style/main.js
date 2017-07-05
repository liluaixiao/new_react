import {StyleSheet} from 'react-native';
import {commonStyle} from '../common/commonStyle';

export let S = StyleSheet.create(Object.assign({
	flag: {
		fontSize: 12,
		color: '#2F91EB',
		borderColor: '#2F91EB',
		borderStyle: 'solid',
		borderWidth: 1,
		marginLeft: 5
	},
	//--------newest--------
	newest: {
		backgroundColor: '#70D8FA',
		borderRadius: 6,
		marginTop: 3,
		marginLeft:10,
		marginRight: 10,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	nstText: {
		color: '#fff',
		fontSize: 18
	},

	//-------viewToday--------
	viewToday: {
		padding: 10,
		alignItems: 'center',
		borderBottomWidth: 6,
		borderColor: '#f2f2f2',
		borderStyle: 'solid'
	},
	vtText: {
		fontSize: 14,
		color: '#62D0FB'
	},

	//---------tab-----------
	tab: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 20,
		paddingRight: 20,
		borderBottomWidth: 6,
		borderColor: '#f2f2f2',
		borderStyle: 'solid'
	},

	tabItem: {
		alignItems: 'center'
	},
	tabText: {
		marginTop: 10,
		fontSize: 16,
		color: '#030303'
	},
	tabIcon: {
		width: 48,
		height:48,
		borderRadius: 24,
		borderColor: '#333',
		borderStyle: 'solid',
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	dailyJX: {
		alignItems: 'center',
		paddingTop: 10,
	},
	jxTitle: {
		fontSize: 16,
		color: '#333',
		fontWeight: 'bold'
	},
	jxSubTitle: {
		fontSize: 12,
		color: '#333',
		marginTop: 5
	},
	jxRedText: {
		fontSize: 12,
		color: '#D0011B',
		paddingLeft: 5
	},
	jxDash: {
		width: 30,
		height: 2,
		backgroundColor: '#000',
		marginTop: 5,
		marginBottom: 10
	},

	//--------mxli---------
	mxli: {
		padding: 10,
		borderColor: '#f2f2f2',
		borderStyle: 'solid',
		borderBottomWidth: 1,
		flexDirection: 'row'
	},
	mxliLeft: {
		paddingRight: 10
	},
	mxliRight: {
		paddingLeft: 10,
		alignItems: 'center',
		borderLeftWidth: 1,
		borderColor: '#f2f2f2',
		borderStyle: 'solid',
		justifyContent: 'space-between'
	},
	//-------recmmend-------
	recmmend: {
		borderTopWidth: 6,
		borderColor: '#f2f2f2',
		borderStyle: 'solid'
	},
}, commonStyle));