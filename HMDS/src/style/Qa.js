import reset from './reset';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
let style = Object.assign({
    body: {
        margin: 20
    },
    woolBody:{
        marginTop:0,
        marginBottom:20
    },
    dateWrap:{
        width,
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        height:22,
    },
    dateStyle:{
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#f0f0f0',
        borderStyle: 'solid',
        borderRadius: 10,
        maxHeight:22,
        width: 150,
        height:22,
        marginLeft: 10,
        paddingLeft:20,
        justifyContent: 'center'
    },
    dateTextStyle: {
        fontSize:12,
        color:'#000',
        marginLeft: 10
    },
    dateIcon: {
        position: 'absolute',
        width:6,
        height: 6,
        borderLeftWidth:1,
        borderBottomWidth:1,
        borderStyle: 'solid',
        borderColor: '#000',
        transform: [{rotate: '-45deg'}],
        right: (width-110)/2,
        top: 7
    },
    question: {
        fontSize: 16,
        color: '#000'
    },
    answer: {
        fontSize: 14,
        color: '#666',
        marginTop:10,
        marginBottom: 20
    },

    total:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 84
    },
    totalStyle:{
        fontSize: 40,
        color:'#000'
    },
    totalNum: {
        fontSize: 60,
        color: '#000'
    },
    totalText: {
        fontSize:20,
        color: '#000',
        marginTop:25
    },
    income:{
        marginTop: 20,
        flex: 1,
        flexDirection:'row'
    },
    incomeItem:{
        width:  width/2,
        height:78,
        borderTopWidth: 1,
        borderBottomWidth:1,
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    incomeName:{
        fontSize: 16,
        marginBottom: 6,
        color: '#333'
    },
    incomeNum: {
        fontSize: 15,
        color: '#ff2943'
    },
    consumeNum:{
        fontSize: 15,
        color: '#666'
    },
    woolList:{
        marginLeft:20,
        marginRight:20
    },
    woolItem: {
        flex: 1
    },
    woolDesc: {
        flex:1,
        height:59,
        borderBottomWidth:1,
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    woolName: {
        fontSize: 14,
        color: '#000'
    },
    woolNum:{
        fontSize: 14,
        color: '#000'
    },
    woolAction:{
        padding: 10,
        paddingRight: 0,
        flexDirection:'row'
    },
    woolChild: {
        marginLeft: 20,
        marginRight: 20,
        height: 59,
        flex:1,
        borderBottomWidth:1,
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
        justifyContent: 'center'
    },
    woolChildItem:{
        flex:1,
        maxHeight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    woolItemDate:{
        fontSize: 10,
        color:'#999'
    },
    woolItemNum: {
        fontSize: 12,
        color:'#000',
        maxWidth:180
    },
    arrow:{
        paddingRight: 10,
        paddingBottom:10,
        width:5,
        height:5,
        borderLeftWidth:1,
        borderTopWidth:1,
        borderStyle: 'solid',
        borderColor: '#ff2943',
        marginLeft: 18,
        transform: [{rotate: '45deg'},{translateY: 10}],
    },
    arrowExp:{
        transform: [{rotate: '-135deg'}, {translateY: -6}, {translateX: 4}],
    }
}, reset);

export default style;