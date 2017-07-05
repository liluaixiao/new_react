import reset from '../reset';

let style = Object.assign({
	item: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20
	},
	itemRight: {
		flex: 1,
		paddingBottom: 20,
		borderStyle: 'solid',
		borderBottomWidth: 0.5,
		borderBottomColor: '#e0e0e0',
	},
	itemImageBox: {
		width: 60,
		height: 60,
		marginRight: 15
	},
	itemMSBox: {
		position: 'absolute',
		left: 0,
		top: 8,
		height: 16,
		width: 30,
		backgroundColor: '#FF2843',
		alignItems: 'center',
		justifyContent: 'center',
	},
	itemMSText: {
		color: '#fff',
		fontSize: 10
	},
	itemImage: {
		width: 60,
		height: 60,
		resizeMode: 'cover'
	},
	itemInfoBox: {
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	viewBox: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	itemTitle: {
		fontSize: 15,
		color: '#313131'
	},
	botText: {
		fontSize: 12,
		color: '#999'
	},
	viewIcon: {
		width: 14,
		height: 10,
		resizeMode: 'contain',
		marginRight: 5
	}
}, reset);

export default style;