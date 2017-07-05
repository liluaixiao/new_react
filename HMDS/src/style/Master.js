import reset from './reset';


let style = Object.assign({
    body: {
        backgroundColor: '#f5f5f5',
        flex: 1
    },
    intro: {
        flex: 1,
        maxHeight: 183,
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 10,
        borderStyle: 'solid',
        borderBottomColor: '#f0f0f0',
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
    infoBox:{
        flexDirection: 'row',
    },
    avatar: {
        width: 60,
        borderRadius: 30
    },
    textBox: {
        flex: 1,
        marginLeft: 20,
        height:60,
        overflow: 'hidden',
        justifyContent: 'space-between'
    },
    textDesc: {
        fontSize: 16,
        color: '#999',
        paddingBottom: 5,
        lineHeight: 16
    },
    textInfo: {
        borderTopColor: '#f0f0f0',
        borderTopWidth: 1,
        borderStyle: 'solid',
        flexDirection: 'row',
        paddingTop: 4,
    },
    infoNum: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20
    },
    infoText: {
        fontSize: 10,
        lineHeight: 12,
        color: '#333',
        opacity: 0.4,
        marginRight: 44,
        width:41,
        marginTop: -1
    },
    desc: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
        letterSpacing: 0.08,
        marginTop: 15,
    },
    nav: {
        height:50,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
        backgroundColor: '#fff'
    },
    navTit: {
        fontSize: 16,
        color: '#666',
    },
    navPick:{
        width: 70
    },
    navIcon: {
        borderLeftWidth:1,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#666',
        width: 6,
        height: 6,
        transform: [{rotate: '-45deg'}],
        marginLeft:10,
        marginTop: -2
    },
    navItems: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    navItem: {
        fontSize:　12,
        // color: '#2a2a2a',
        color: '#999',
        paddingTop: 16,
        paddingBottom: 16
    },
    seg: {
        // color: '#2a2a2a',
        color: '#999',
        marginLeft: 6,
        marginRight: 6,
        marginTop: -2
    },
    navItemActive: {
        color: '#000'
    },
    scroll: {
        backgroundColor: '#f5f5f5',
    },
    articleItem: {
        paddingTop: 0,
    },
    articleNoMargin: {
        marginBottom: 0
    }
}, reset);

export default style;