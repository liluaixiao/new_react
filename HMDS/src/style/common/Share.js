import reset from '../reset';
import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

let style = Object.assign({
    shareMask: {
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height: height+(Platform.OS == 'ios' ? 20 : 0),
        backgroundColor: 'rgba(0,0,0,.4)',
    },
    share: {
        position: 'absolute',
        width,
        left: 0,
        backgroundColor: 'rgba(255,255,255,.95)',
        opacity: 1
    },
    shareBox: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: 7.5,
        borderColor: '#f0f0f0',
        flexWrap: 'wrap'
    },
    shareItem: {
        width: 72,
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10
    },
    shareImg: {
        width: 55
    },
    shareText: {
        width: 55,
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
        marginTop: 5
    },
    cancelBox: {
        flex: 1,
        width,
        height: 50,
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: 'rgba(0,0,0,.1)',
        justifyContent: 'center'
    },
    cancelText: {
        fontSize: 18,
        color: '#000',

    }
}, reset);

export default style;