import reset from './reset';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
let style = Object.assign({
    list: {
        backgroundColor: '#fff',
    },
    rowBox: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemBox: {
        maxWidth: (width-60)/2,
        flex: 1,
        marginBottom: 20,
        overflow: 'hidden'
    },
    album: {
    },
    title: {
        fontSize: 15,
        color: '#313131',
        marginTop: 3,
        marginBottom: 3
    },
    textBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    priceBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    priceIcon: {
        width: 12,
        height: 12,
        marginRight: 2
    },
    price: {
        fontSize:12,
        color: '#999'
    },
    num: {
        fontSize: 12,
        color: '#999'
    },
    uiBox: {
        backgroundColor: '#fff',
        alignItems: 'center',
        borderTopWidth: 10,
        borderBottomWidth: 10,
        borderColor: '#f5f5f5'
    },
    totalBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    scoreBox: {
        alignSelf: 'stretch',
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    moneyIcon: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
        marginRight: 10
    },
    qaIcon: {
        width: 12,
        height: 12,
        resizeMode: 'contain'
    },
    totalScore: {
        fontSize: 20,
        color: '#333',
        marginRight: 5
    },
    ymText: {
        fontSize: 14,
        color: '#666',
        marginRight: 5
    },
    dueText: {
        color: '#666',
        fontSize: 12
    }
}, reset);

export default style;