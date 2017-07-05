import reset from './reset';

let style = Object.assign({
	inputBox: {
		backgroundColor: '#fff'
	},
	input: {
		height: 20,
		fontSize: 14,
		margin: 0,
		padding: 0
	},
	textarea: {
		height: 100,
		fontSize: 14,
		margin: 0,
		padding: 0,
		textAlignVertical: 'top'
	},
	inputItem: {
		height: 45,
		marginLeft: 10,
		alignItems: 'stretch',
		justifyContent: 'center',
	},
	url:{
		borderBottomColor: '#f0f0f0',
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderTopColor: '#f0f0f0',
		borderStyle: 'solid'
	},
	detail: {
		padding: 10
	},
	selectBox:{
		backgroundColor: '#fff',
		marginTop: 10
	},
	dateBox: {
		marginLeft: 10,
		paddingRight: 10,
		height: 45
	},
	dateBoxWithBorder: {
		borderTopWidth: 1,
		borderTopColor: '#f0f0f0',
		borderStyle: 'solid'
	},
	dateStyle: {
		flex: 1
	},
	datePress: {
		flex: 1,
		alignSelf: 'stretch',
		flexDirection: 'row',
		alignItems: 'center'
	},
	switch: {
		marginLeft: 10,
		paddingRight: 10,
		height: 45,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	}
}, reset);

export default style;