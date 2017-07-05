import reset from '../reset';
import {Dimensions, Platform} from 'react-native';

const {width,height} = Dimensions.get('window');
let style = Object.assign({
    shopBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15
    },
    shopInfoBox: {
        flexDirection: 'row',
        flex: 1
    },
    shopImgBox: {
        width:80,
        height:80,
    },
    shopImg: {
        width:80,
        height:80,
        borderRadius:4
    },
    shopInfo: {
        flex:1,
        height: 80,
        justifyContent:'space-between',
        // maxWidth: width-185,
        marginLeft: 15
    },
    infoName: {
        fontSize: 18,
        color: '#313131'
    },
    infoBox:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoType: {
        fontSize:15,
        color: '#999'
    },
    discount: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 2,
        // height: 12,
        marginLeft: 10
    },
    discountText: {
        paddingLeft: 2,
        paddingRight: 2,
        fontSize: 10,
        color: '#d0011b'
    },
    iconBox: {
        flexDirection: 'row'
    },
    iconStyle:{
        width:14,
        height:14,
        borderRadius:7,
        marginRight:2
    },
    shopLocal: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    localIcon: {
        width: 11
    },
    localText: {
        fontSize: 15,
        color: '#999',
        marginLeft: 6
    }
}, reset);

export default style;