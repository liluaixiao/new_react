import reset from './reset';

let style = Object.assign({
	btnBox: {
		height: 50,
		flexDirection: 'row'
	},
	btn: {
		flex: 1,
		height: 50
	},
	btnDisable: {
		backgroundColor: '#cacaca'
	},
	btnActive: {
		backgroundColor: '#FF2843'
	},
	btnText: {
		color: '#fff',
		fontSize: 17
	},
	body:{
		flex: 1,
		backgroundColor: '#f5f5f5'
	},
	msFlagBox: {
		width: 78,
		height: 30,
		backgroundColor: '#FF2843',
		position: 'absolute',
		left: 0,
		top: 20
	},
	msFlagText: {
		color: '#fff',
		fontSize: 15
	},
	info: {
		marginBottom: 10,
		padding: 10,
		backgroundColor: '#fff'
	},
	title: {
		fontSize: 17,
		color: '#313131',
		marginBottom: 10
	},
	dateinfo: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	clockIcon: {
		width: 12,
		height: 12,
		marginRight: 5
	},
	dateinfoText: {
		fontSize: 12,
		color: '#FF2843'
	},
	webviewBox: {
		alignSelf: 'stretch',
		backgroundColor: '#fff'
	},
	webview: {
		margin: 10,
		padding: 0
	},
	source: {
		marginLeft: 10,
		borderTopWidth: 1,
		borderStyle: 'solid',
		borderColor: '#f0f0f0',
		height: 40,
		alignItems: 'stretch',
		paddingRight: 10
	},
	sourcePress: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	pressArrowBox: {
		width: 40,
		height: 40,
		position: 'absolute',
		top: 0,
		right: -12
	},
	noDetail: {
		fontSize: 14,
		color: '#999',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10
	},
	sourceText: {
		fontSize: 14,
		color: '#313131'
	},
	sourceArrow: {
		width: 10,
		height: 10,
		borderStyle: 'solid',
		borderTopColor: '#c7c7c7',
		borderLeftColor: '#c7c7c7',
		borderTopWidth: 2,
		borderLeftWidth: 2,
		transform: [{rotate: '135deg'}]
	},
	comment: {
		marginTop: 10,
		backgroundColor: '#fff',
	},
	commentTip: {
		fontSize: 17,
		color: '#313131',
		margin: 10
	},
	commentBtn: {
		flexDirection: 'row',
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 20,
	},
	cbIcon: {
		width: 30,
		height: 30
	},
	cbIconImage: {
		width: 30,
		height: 30
	},
	cbClick: {
		flex: 1,
		backgroundColor: '#f5f5f5',
		justifyContent: 'center',
		alignItems: 'flex-start',
		marginLeft: 15,
		paddingLeft: 10,
		paddingRight: 10
	},
	cbClickText: {
		fontSize: 14,
		color: '#313131'
	},

	commentList: {
		paddingLeft: 10
	},
	clItem: {
		flexDirection: 'row',
		borderStyle: 'solid',
		borderBottomColor: '#f0f0f0',
		borderBottomWidth: 1,
		paddingBottom: 15,
		paddingTop: 15
	},
	clItemWithoutBorder: {
		borderBottomWidth: 0,
	},
	avatarBox: {
		width: 30,
		height: 30,
		marginRight: 15
	},
	avatar: {
		width: 30,
		height: 30,
		borderRadius: 15
	},
	user: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10
	},
	usertext: {
		color: '#999',
		fontSize: 12
	},
	replyBox: {
		padding: 5,
		backgroundColor: '#f0f0f0',
		marginBottom: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignSelf: 'stretch',
		alignItems: 'center'
	},
	replyText: {
		fontSize: 12,
		color: '#666'
	},
	replyUser: {
		color: '#4990E2',
	},
	contentBox: {
		flex: 1,
		paddingRight: 10
	},
	content: {
		fontSize: 14,
		color: '#313131',
		marginBottom: 10
	},
	commentTimeBox: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	commentTime: {
		fontSize: 12,
		color: '#999'
	},
	favor: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 15
	},
	replyBtn: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	replyImage: {
		width: 10,
		height: 9,
		marginRight: 5
	},
	loadMoreBox: {
		height: 44
	},
	loadMoreTexgt: {
		// color: '#4990E2',
		color: '#FF2843',
		fontSize: 14
	},
	rowCenter: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},

	cardBox: {
		padding: 10,
		backgroundColor: '#fff',
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	cardTitle: {
		fontSize: 15,
		color: '#313131'
	},
	cardName: {
		color: '#FF2843'
	},
	cardSubTitle: {
		marginTop: 5,
		fontSize: 10,
		color: '#999'
	},
	cardApplyBtn: {
		width: 90,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FF2843',
		borderRadius: 3
	},
	cardApplyBtnText: {
		fontSize: 14,
		color: '#fff'
	},

	favorIcon: {
		resizeMode:'contain',
		width: 20,
		height: 18
	},
	favorBox: {
		height: 50,
		width: 60,
		alignItems: 'center',
		justifyContent: 'center',
		// borderStyle: 'solid',
		// borderTopWidth: 1,
		// borderColor: '#f0f0f0'
		// backgroundColor: '#f9f9f9'
	},
	favorNumText: {
		fontSize: 10,
		color: '#6D7478',
		marginTop: 2
	}
}, reset);

export default style;