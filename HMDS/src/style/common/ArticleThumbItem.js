import reset from '../reset';

let style = Object.assign({
	itemBox: {
		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#fff'
	},
	item: {
		borderStyle: 'solid',
		borderColor: '#f5f5f5',
		borderBottomWidth: 1,
		flexDirection: 'row',
		paddingBottom: 20
	},
	imgBox: {
		width: 100,
		height: 100,
		marginRight: 15
	},
	img: {
		width: 100,
		height: 100,
		resizeMode: 'cover'
	},
	detail: {
		flex: 1,
		height: 100,
		justifyContent: 'space-between'
	},
	title: {
		fontSize: 15,
		color: '#313131'
	},
	infoBox: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center'
	},
	date: {
		fontSize: 12,
		color: '#666'
	},
	visitBox: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	visitIcon: {
		width: 14,
		height: 10,
		resizeMode: 'contain',
		marginRight :5
	}
}, reset);

export default style;