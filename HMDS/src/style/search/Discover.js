import {Dimensions,Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

let style = Object.assign({
    page: {
        backgroundColor: '#fff',
        height: height-70,
        width
    },
    header: {
        height: 44,
        borderStyle: 'solid',
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft:10,
        // paddingRight: 10
    },
    localBox: {
        flexDirection: 'row',
        height: 44,
        maxWidth: 70,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    localText:{
        fontSize: 15,
        color: '#000',
        maxWidth: 70
    },
    localIcon: {
        width: 9,
        height: 9,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        marginLeft: 8,
        marginRight: 1,
        marginTop: Platform.OS=='ios'?-6:-2,
        borderColor: '#000',
        transform: [{rotate:'-45deg'}]
    },
    searchBox: {
        flexDirection: 'row',
        opacity: .3,
        backgroundColor: 'rgba(216,216,216,1)',
        alignItems: 'center',
        height:32,
        borderRadius: 80,
        flex: 1,
        marginLeft: 14,
        marginRight: 2,
        paddingLeft: 8
    },
    filterBox:{
        width: 44,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight:10
    },
    searchText: {
        fontSize: 14,
        marginLeft:8
    },
    scroll: {
        backgroundColor: '#f5f5f5'
    },
    section: {
        paddingBottom: 6,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff',
        marginBottom: 6
    },
    msTitleBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        paddingTop: 16,
        paddingBottom: 6,
        backgroundColor: '#fff'
    },
    msTitle: {
        fontSize: 15,
        color: '#000',
        marginRight: 6
    },
    masterList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    masterItem: {
        marginBottom: 10
    },
    masterImg: {
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    masterTitle: {
        color: '#fff',
        backgroundColor: 'transparent',
        fontSize: 16,
        marginBottom: 5
    },
    masterSubTitle: {
        color: '#fff',
        backgroundColor: 'transparent',
        fontSize: 12
    },
},{});

export default style;