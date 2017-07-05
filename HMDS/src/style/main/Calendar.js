import {Dimensions} from 'react-native';
import reset from '../reset';

const {width:clientWidth} = Dimensions.get('window');

let style = Object.assign({
	pager: {
		width: clientWidth,
		backgroundColor: 'black'
	},
	row: {
		flexDirection: 'row'
	},
	dateBox: {
		alignItems: 'stretch',
		backgroundColor: '#f9f9f9',
		borderBottomColor: '#f0f0f0',
		borderBottomWidth: 1,
		borderStyle: 'solid'
	},
	date: {
		height: 66,
		flexDirection: 'row',
		alignItems: 'stretch'
	},
	selectDay: {
		height: 49,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	day: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	dayActive: {
		backgroundColor: '#FF2843'
	},
	dateText: {
		fontSize: 17,
		color: '#666'
	},
	dateTextActive: {
		fontSize: 17,
		color: '#fff'
	},
	list: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 15,
		paddingLeft: 0,
		paddingRight: 15,
		paddingBottom: 15
	},
	displayFormat: {
		fontSize: 14,
		color: '#313131'
	},
	add: {
		width: 49,
		height: 49,
		position: 'absolute',
		top: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	addIcon: {
		width: 20,
		height: 20
	},
	timeline: {
		alignItems: 'center',
		width: 59,
		borderRightWidth: 1,
		borderRightColor: '#f0f0f0',
		borderStyle: 'solid',
		overflow: 'visible'
	},
	item: {
		flex: 1,
		paddingBottom:15
	},
	itemBox: {
		backgroundColor: '#f2f2f2',
		padding: 15,
		marginLeft: 12
	},
	typeIcon: {
		width: 24,
		height: 24
	},
	time: {
		color: '#a5a5a5',
		fontSize: 12,
		marginTop: 3
	},
	title: {
		fontSize: 15,
		color: '#313131',
		marginBottom: 10
	},
	icon: {
		width: 20,
		height: 20,
		marginRight: 5
	},
	iconBox: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	addCalendarBox: {
		height: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	addCalendar: {
		fontSize: 12
	},
	addCalendarActive: {
		color: '#FF2843'
	},
	addCalendarDisable: {
		color: '#666'
	},
	dot: {
		position: 'absolute',
		width: 5,
		height: 5,
		borderRadius: 2.5,
		left: 56,
		top: 20,
		backgroundColor: '#FF2843'
	},
	arrow: {
		borderStyle: 'solid',
		borderRightWidth: 8,
		borderLeftWidth: 8,
		borderTopWidth: 4,
		borderBottomWidth: 4,
		borderRightColor: '#f2f2f2',
		borderTopColor: 'transparent',
		borderLeftColor: 'transparent',
		borderBottomColor: 'transparent',
		position: 'absolute',
		left: 56,
		top: 18.7
	},
	remove: {
		width: 59,
		backgroundColor: '#FF2843',
		position: 'absolute',
		top: 0,
		bottom: 15,
		right: -59,

	},
	removeBtn: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	removeIcon: {
		width: 16,
		height: 17,
	},
	removeText: {
		color: '#fff',
		fontSize: 12,
		marginTop: 10
	},
	rowItem: {
		overflow: 'hidden'
	}
}, reset);

export default style;