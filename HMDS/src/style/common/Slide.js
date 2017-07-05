import reset from '../reset';
import {Dimensions, Platform} from 'react-native';

const {width,height} = Dimensions.get('window');
let style = Object.assign({
    slide:{
        position: 'absolute',
        top: Platform.OS == 'ios'?-20:0,
        left: 0,
        width,
        height:Platform.OS == 'ios'?height-50:height-70,
        backgroundColor: 'rgba(0,0,0,.4)',
        flex:1,
        flexDirection: 'row',
        zIndex: 100
    },
    mask: {
        width: width/375*200,
        height,
    },
    body: {
        paddingTop : Platform.OS == 'ios' ? 20 : 0,
        width: width/375*175,
        backgroundColor: '#fff'
    },
    item: {
        height: 40,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#eee',
        justifyContent: 'center'
    },
    itemText:{
        fontSize: 15,
        color: '#333',
        paddingLeft: 16
    },
    container:{
        height: 44,
        borderStyle: 'solid',
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1
    },
    backBox: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 100
    },
    navBackIcon: {
        width: 11,
        height: 11,
        borderStyle: 'solid',
        borderTopColor: '#000',
        borderLeftColor: '#000',
        borderTopWidth: 2,
        borderLeftWidth: 2,
        transform: [{rotate: '-45deg'}]
    },
    title: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    titleText: {
        color: '#000',
        fontSize: 17
    }
}, reset);

export default style;