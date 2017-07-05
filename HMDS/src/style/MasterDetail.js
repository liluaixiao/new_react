import reset from './reset';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
let style = Object.assign({
    intro: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
        overflow: 'hidden',
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 20,
        marginRight: 20
    },
    info: {
        flexDirection: 'row',
        width: width-110,
        overflow: 'hidden'
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    desc: {
        marginLeft:8,
        justifyContent: 'space-between'
    },
    name:{
        fontSize: 18,
        color: '#000',
    },
    slogon:{
        fontSize: 12,
        color: '#999',
        lineHeight: 12,
    },
    sub:{
        width: 64,
        height: 30,
        lineHeight: 26,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#ff2943',
        borderRadius: 4,
        marginTop: 2.5,
        fontSize: 16,
        color:'#ff2943'
    },
    subGray:{
        width: 64,
        height: 30,
        lineHeight: 26,
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 2.5,
        fontSize: 16,
        borderColor: '#999',
        color: '#999'
    },
    articleTit:{
        fontSize: 20,
        color: '#666',
        margin: 20,
        lineHeight: 28,
    },
    bottomBox: {
        flex: 1,
        width,
        position: 'absolute',
        height: 49,
        bottom: 0,
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width, height: 1},
        shadowRadius: 3,
        shadowOpacity: 0.5,
        borderTopColor: '#f0f0f0',
        borderTopWidth: 1,
        backgroundColor: '#fff'
    },
    bottomItem: {
        alignItems: 'center',
        width: 100,
        overflow: 'hidden'
    },
    bottomImg1: {
        width: 25,
        height: 21,
        marginTop: 9,
        marginBottom: 3
    },
    bottomImg2: {
        width: 22,
        height: 21,
        marginTop: 9,
        marginBottom: 3
    },
    bottomImg3: {
        width: 25,
        height: 25,
        marginTop: 5,
        marginBottom: 3
    },
    bottomText: {
        fontSize: 10,
        color: '#6d7478',
        lineHeight: 14
    },
    webView: {
        // margin: 20,
        // marginBottom: 70
        marginLeft: 20,
        marginRight: 20
    }
}, reset);

export default style;