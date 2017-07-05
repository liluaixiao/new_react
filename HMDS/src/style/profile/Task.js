import reset from '../reset';

let style = Object.assign({
	body: {
		flex: 1,
		backgroundColor: '#f5f5f5'
	},
	secBox: {
		paddingLeft: 10,
		paddingRight: 10,
		height: 37,
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
	secTitle: {
		fontSize: 12,
		color: '#333'
	},

	item: {
		padding: 10,
		paddingTop: 13,
		marginBottom: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#fff',
		alignItems: 'center'
	},
	itemWithoutBorder: {
		borderBottomWidth: 0
	},
	taskTitle: {
		fontSize: 14,
		color: '#333',
		marginBottom: 10
	},
	taskScore: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	scoreIcon: {
		width: 14,
		height: 14,
		resizeMode: 'contain',
		marginRight: 10
	},
	score: {
		fontSize: 14,
		color: '#333',
	}
}, reset);

export default style;