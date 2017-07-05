import reset from '../reset';

let style = Object.assign({
	footerBox: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		borderStyle: 'solid',
		borderTopColor: '#f0f0f0',
		borderTopWidth: 1,
	},
	iconBox: {
		alignItems: 'center',
		width: 50,
		height: 50,
		justifyContent: 'center',
	},
	icon: {
		width: 25,
		height: 25,
		resizeMode: 'contain'
	},
	text: {
		fontSize: 10,
		color: '#999',
		marginTop: 3
	},
	textCurrent: {
		color: '#000'
	},

	iconImageBox: {
		width: 25,
		height: 25,
		overflow: 'hidden',
		backgroundColor: 'transparent'
	},
	iconAll: {
		width: 50,
		height: 25,
		flexDirection: 'row',
		position: 'absolute',
		top: 0,
		left: 0
	},
	iconActive: {
		left: -25
	}
}, reset);

export default style;