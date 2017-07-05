import reset from '../reset';

let style = Object.assign({
	inputBox: {
		position: 'absolute',
		top: -20,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'flex-end'
	},
	input: {
		backgroundColor:'#f8f8f8',
		paddingBottom: 10,
		bottom: 0
	},
	inputTextBox: {
		marginLeft: 10,
		marginRight: 10,
		borderStyle: 'solid',
		borderTopColor: '#dadada',
		borderTopWidth: 1
	},
	titleBox: {
		height: 40,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems:'center'
	},
	titleTextBox: {
		position: 'absolute',
		height: 40,
		left: 0,
		right: 0,
		top: 0,
		justifyContent: 'center',
		alignItems: 'center'
	},
	titleText: {
		fontSize: 17,
		color: '#313131'
	},
	closeIconBox: {
		height: 40,
		width: 40,
		paddingLeft: 10,
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
	closeIcon: {
		width: 12,
		height: 12
	},
	emitBox: {
		height: 40,
		width:50,
		paddingRight: 10,
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	emit: {
		fontSize: 17,
		color: '#FF2843'
	},
	emitDisable: {
		fontSize: 17,
		color: '#818181'
	},
	textarea: {
		alignSelf: 'stretch',
		padding: 0,
		height: 150,
		textAlignVertical: 'top',
		fontSize: 15
	}
}, reset);

export default style;