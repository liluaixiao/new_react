import {Dimensions, Platform} from 'react-native';
import reset from '../reset';

const {width, scale} = Dimensions.get('window');

let style = Object.assign({
    pager: {
        width
    },
    masterItem: {
        paddingBottom: 15,
        marginTop: 15,
        flexDirection: 'row',
        borderBottomWidth: 1/scale,
        borderColor: '#c0c0c0'
    },
    masterImg: {
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 134
    },
    masterInfo: {
        marginLeft: 20,
        width: width-140,
        justifyContent: 'space-between'
    },
    masterName: {
        fontSize: 15,
        lineHeight: 21,
        color: '#000',
        fontWeight: 'bold',
    },
    masterIntro: {
        fontSize: 10,
        color: '#999',
        marginTop: 3
    },
    masterUpdate: {
        position: 'absolute',
        top: 35,
        fontSize: 8,
        color: '#ccc',
        borderColor: '#999',
        borderRadius: 2,
        borderWidth: 1/scale,
        marginTop: 12,
        paddingTop: 2,
        paddingBottom: 1,
        paddingLeft: 3,
        paddingRight: 3
    },
    masterArticle: {
        fontSize: 16,
        lineHeight: 16,
        color: '#999',
        marginTop: 4
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        bottom: 15,
        right: 25
    },
    menuBox: {
        backgroundColor: '#fff',
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 17,
        paddingRight: 17,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    menu: {
        alignItems: 'center'
    },
    menuImg: {
        maxWidth: 36,
        maxHeight: 36,
        width: 36,
        height: 36
    },
    menuText: {
        fontSize:12,
        color: '#000',
        marginTop: 4
    },
    newsBox: {
        backgroundColor: '#fff',
    },
    newsWrap: {
        height: 62,
        width: width-20,
        marginLeft: 10,
        borderColor: '#c0c0c0',
        borderTopWidth: 1/scale,
        borderBottomWidth: 1/scale,
        flexDirection: 'row',
        alignItems: 'center',
    },
    news: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center'
    },
    newsSwiper: {
        marginLeft:10
    },
    newsLabel: {
        fontSize: 15,
        color: '#ff2843',
        width: 34,
        fontWeight: 'bold',
        letterSpacing: 1
    },
    newsIcon: {
        fontSize: 12,
        color: '#ff2843',
        borderColor: '#ff2843',
        borderWidth: 1/scale,
        lineHeight: 12,
        paddingTop: Platform.OS == 'ios' ?2: 0,
        paddingLeft: 3,
        paddingRight: 3,
        marginRight: 6,
        borderRadius: 2
    },
    newsText: {
        fontSize: 12,
        color: '#333',
        width: width-100
    },
    linkBox: {
        backgroundColor: '#fff',
        paddingTop: 6,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15
    },
    linkWrap: {
        paddingTop: 9,
        paddingBottom: 9,
        borderBottomWidth: 1/scale,
        borderColor: 'rgba(192,192,192,.3)',
        flexDirection: 'row',
        flex:1
    },
    link: {
        borderLeftWidth:1/scale,
        borderColor: 'rgba(192,192,192,.3)',
    },
    linkImg: {
        flex: 1,
        height: 80
    },
    discountBox: {
        backgroundColor: '#fff',
        paddingTop: 26,
        paddingLeft: 10,
        paddingRight: 10
    },
    discountTitWrap: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 21,
        paddingBottom: 16
    },
    discountTitItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    discountTit: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
        marginRight: 6
    },
    discountRefresh: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4
    },
    discountBody: {
        borderBottomWidth: 1/scale,
        borderColor: '#c0c0c0',
        paddingBottom: 9
    },
    discountItemWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    discountItem:{
        width: (width-30)/2,
        marginTop: 9
    },
    discountImg: {
        height: (width-30)/2,
    },
    discountTitle:{
        fontSize: 15,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 6,
        marginBottom: 6
    },
    discountIntro:{
        fontSize: 12,
        color: '#999'
    },
    discountLabel: {
        width: 48,
        textAlign: 'center',
        fontSize: 10,
        color: '#d0011b',
        borderColor: '#d0011b',
        borderRadius: 2,
        borderWidth: 1/scale,
        paddingTop: 2,
        marginTop: 6,
        marginBottom: 6
    },
    discountGap: {
        margin: 5,
        marginBottom: 0,
        height: 1/scale,
        width: (width-30)/2-10,
        backgroundColor: '#c0c0c0'
    },
    discoverMore: {
        height: 45,
        borderTopWidth: 1/scale,
        borderColor: '#c0c0c0',
        alignItems: 'center',
        justifyContent: 'center'
    },
    discoverText: {
        fontSize: 14,
        color: '#ff2943'
    },
    recommendMore: {
        fontSize: 14,
        color: '#ff2843'
    },
    recommendItem: {
        height: 120,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1/scale,
        borderColor: '#c0c0c0',
        flexDirection: 'row'
    },
    recommendImg: {
        width: 100,
        height: 100,
        marginRight: 6
    },
    recommendTit: {
        maxWidth: width-126,
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: 20,
        color: '#313131'
    },
    recommendIntro: {
        position: 'absolute',
        maxWidth: width-126,
        fontSize: 12,
        color: '#999',
        lineHeight: 17,
        top: 46
    },
    recommendBan: {
        borderBottomWidth: 1/scale,
        borderColor: '#c0c0c0',
        paddingBottom: 10,
        marginTop: 6
    },
    recommendBanImg: {
        width: width-20,
        height: width/355*160,
    },
    recommendBanTit: {
        fontSize: 15,
        color: '#313131',
        lineHeight: 20,
        marginTop: 7
    },
    recommendBanInfo: {
        fontSize: 12,
        color: '#999',
        lineHeight: 17
    }
}, reset);

export default style;