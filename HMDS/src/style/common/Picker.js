import reset from '../reset';
import {Dimensions, Platform} from 'react-native';

const {width,height} = Dimensions.get('window');
let style = Object.assign({
    pickerWrap:{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height: height+(Platform.OS == 'ios' ? 20 : 0),
        backgroundColor: 'gray',
        flex: 1,
        zIndex: 100
    },
    pickerShadow:{
        height: height-260,
        width,
        backgroundColor: 'rgba(0,0,0,.7)',
    },
    pickerAction:{
        flex: 1,
        height: 40,
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingLeft:10,
        paddingRight:10,
        justifyContent: 'space-between',
        width: width,
    },
    pickerText: {
        color: '#3aacff',
        fontSize: 18,
        marginTop: 10,
    },
    picker: {
        // color:'#313131',
        flex: 1,
        height: 240,
        // height:40,
        // borderColor: 'transparent',
        alignItems: 'center',
        backgroundColor: '#c0c0c0',
        position: 'absolute',
        width,
        left: 0,
        bottom: 0,
        zIndex:100
        // left: 0

    },
    pickerItem: {
        color:'#313131',
        fontSize: 20,
        width,
        paddingLeft: 0,
        zIndex: -1,
        textAlign: 'center'
        // marginLeft: -115,
        // height:40,

        // backgroundColor: '#336',
    }
}, reset);

export default style;