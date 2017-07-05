import reset from '../reset';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
let style = Object.assign({
    intro: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        // borderTopWidth: 1,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
        backgroundColor: '#fff',
        overflow: 'hidden',
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: 20,
        marginLeft: 20
    },
    info: {
        flexDirection: 'row',

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
        maxWidth: width-80
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
    }
}, reset);

export default style;