import reset from '../reset';
import {Dimensions, Platform} from 'react-native';

const {width,height} = Dimensions.get('window');
let style = Object.assign({
    body:{
        backgroundColor: '#f5f5f5'
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15
    },
    infoImg: {
        width: 80,
        height: 80,
        borderRadius: 4
    },
    info: {
        marginLeft: 15,
        justifyContent: 'space-between'
    },
    infoName: {
        fontSize: 18,
        color: '#313131'
    },
    infoType: {
        fontSize: 15,
        color: '#999'
    },
    discountBox:{
        flexDirection: 'row'
    },
    discount: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 2,
        // height: 12,
        marginRight: 10
    },
    discountText: {
        paddingLeft: 2,
        paddingRight: 2,
        fontSize: 10,
        color: '#d0011b'
    },
    localBox: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginBottom: 7,
        borderTopWidth: 1,
        borderColor: '#f5f5f1'
    },
    localAddr: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: width-76
    },
    localIcon: {
        width: 11
    },
    localText: {
        fontSize: 15,
        color: '#999',
        marginLeft: 16,
        paddingTop: 3,
        paddingBottom: 3
    },
    localPhone: {
        width: 35,
        height: 35,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    bankBox: {
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15
    },
    bankItem: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: Platform.OS == 'ios'?'#fff':'#ddd',
        shadowColor: '#8d8d8d',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 2,
        shadowOpacity: 0.5,
        marginBottom: 10,
        padding: 10
    },
    itemIconBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    itemIcon: {
        maxHeight: 18,
        width: 75
    },
    flag: {
        fontSize: 9,
        color:'#fff',
        width: 10,
        height: 10,
        textAlign: 'center',
        lineHeight: 10
    },
    itemTitle:{
        fontSize: 13,
        color: '#666',
        lineHeight: 16
    },
    itemDescBox: {
        marginTop: 16
    },
    itemDesc: {
        fontSize: 11,
        color: '#666'
    },
    itemDate: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems:'center'
    },
    dateText: {
        fontSize: 13,
        color: '#666',
        marginLeft: 8,
        marginRight:16
    }
}, reset);

export default style;