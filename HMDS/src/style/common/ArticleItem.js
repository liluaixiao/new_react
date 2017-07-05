import reset from '../reset';

let style = Object.assign({
	art: {
		padding: 20,
		backgroundColor: '#fff',
		marginBottom: 10
	},

	artUser: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15
	},
	artAvatar: {
		resizeMode: 'cover',
		width: 16,
		height: 16,
		borderRadius: 8
	},
	artName: {
		fontSize: 14,
		color: '#000',
		marginLeft: 10,
	},
	artIntro: {
		fontSize: 14,
		color: '#999',
		marginLeft: 10,
		fontWeight: 'bold'
	},
	artTitle: {
		fontSize: 18,
		color: '#333',
		marginBottom: 15
	},
	artImage: {
		marginBottom: 15
	},
	artDesc: {
		fontSize: 14,
		color: '#666',
		marginBottom: 15
	},
	artOther: {
		fontSize: 12,
		color: '#999'
	}
}, reset);

export default style;