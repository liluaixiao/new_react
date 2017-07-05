import reset from '../reset';

let style = Object.assign({
	body: {
		flex: 1,
		backgroundColor: '#f5f5f5'
	},
	item: {
		backgroundColor: '#fff',
		marginTop: 15,
		marginLeft: 15,
		marginRight: 15,
		height: 80,
		flexDirection: 'row',
		alignItems: 'stretch'
	},
	itemWithBottom: {
		marginBottom: 15
	},
	left: {
		backgroundColor: '#fcfcfc',
		width: 100,
		justifyContent: 'center',
		alignItems: 'center'
	},
	right: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'flex-start',
		paddingLeft: 20
	},
	price: {
		fontSize: 24,
		color: '#000',
		marginBottom: 10
	},
	minUse: {
		fontSize: 12,
		color: '#999',
	},
	name: {
		fontSize: 16,
		color: '#000',
	},
	expiredTime: {
		fontSize: 12,
		color: '#999',
	}
}, reset);

export default style;