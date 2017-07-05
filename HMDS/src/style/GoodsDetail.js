import reset from './reset';
import {Dimensions, Platform} from 'react-native';

const {width,height} = Dimensions.get('window');
let style = Object.assign({
    body: {
        flex:1,
        backgroundColor: '#f5f5f5',
    },
    detailBox: {
        paddingTop:20,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor: '#fff',
        marginBottom: 60
    },
    title: {
        fontSize: 20,
        color: '#313131',
        lineHeight: 28
    },
    detail: {
        flex: 1,
        marginTop: 3,
        flexDirection: 'row',
        alignItems: 'center'
    },
    priceBox:{
        flex: 1,
        height: 22,
        flexDirection: 'row',
        alignItems: 'center'
    },
    pickerWrap: {
        width: 40,
        height: 40,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    priceIcon:{
        width: 16,
        height: 16,
    },
    price: {
        fontSize: 16,
        color: '#ff2943'
    },
    num: {
        fontSize: 12,
        height: 22,
        color: '#999'
    },
    accountWrap:{
        borderBottomWidth:1,
        borderColor:'#f0f0f0',
        borderStyle: 'solid'
    },
    account:{
        marginTop: 12,
        fontSize: 14,
        color: '#666',
        paddingBottom: 10
    },
    numBox:{
        flex: 1,
        height:40,
        alignItems: 'center',
        justifyContent:'space-between',
        flexDirection: 'row'
    },
    numWrap: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    numText:{
        width: 30,
        fontSize: 16,
        color: '#666',
        marginLeft: 0,
        marginRight: 0,
        textAlign: 'center'
    },
    numShowText:{
        height: 40,
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#f0f0f0',
        width,
        alignSelf: 'stretch',
        textAlign: 'center'
    },
    exchangeNum: {
        height: 40,
        position: 'relative',
        width: width-110,
        justifyContent: 'center'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        height:50,
        width,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {width, height: 1},
        shadowRadius: 3,
        shadowOpacity: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    exchange: {
        width:335,
        height:40,
        backgroundColor:'#ff2943',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    disable: {
        width:335,
        height:40,
        backgroundColor:'#c0c0c0',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    exchangeText: {
        fontSize: 18,
        color: '#fff'
    }
}, reset);

export default style;