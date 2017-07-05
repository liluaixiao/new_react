import React, { Component } from 'react';
import {
      AppRegistry,
      StyleSheet,
      Text,
      View,
      Image,
      TouchableOpacity,
      TouchableNativeFeedback,
      Linking,
      BackAndroid,
      Platform,
      NativeModules,
      ScrollView
} from 'react-native';

export default class About extends Component {
    constructor(props){
        super(props);
    }

    link(url){
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    componentDidMount(){
        BackAndroid.addEventListener('hardwareBackPress', ()=>{
			this.navBack();
			return true;
		});
    }

    navBack(){
        if(Platform.OS == 'android') {
            BackAndroid.exitApp(0);
        } else {
            NativeModules.CLRNBaseModuleIOS.pop();
        }
    }

    render() {
        return (
            <View style={styles.page}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.touchnav} onPress={()=>this.navBack()}>
                        <View style={styles.navBack}></View>
                    </TouchableOpacity>
                    <Text style={styles.title}>关于我们</Text>
                </View>

                <ScrollView>
                    <Text style={styles.h3}>关于</Text>

                    <View style={styles.icon}>
                        <Image source={require('./about_icon.png')} />
                        <Text style={styles.desc}>
                        车轮查违章是车轮旗下的一款汽车违章查询工具。车轮立志成为中国最大的以汽车为中心的服务平台，让我们的汽车生活变得更加简单而有趣。</Text>
                    </View>

                    <Text style={styles.h3}>官方网站</Text>
                    <TouchableOpacity>
                        <Text style={[styles.h4, styles.link]} onPress={()=>this.link('https://www.chelun.com')}>https://www.chelun.com</Text>
                    </TouchableOpacity>
                    <Text style={styles.h3}>产品交流区</Text>
                    <Text style={[styles.h4]}>微信公众号请搜：chelunhui</Text>
                    <Text style={styles.h3}>联系方式</Text>
                    <View style={styles.contact}>
                        <Text style={styles.contactText}>商务合作：
                            <Text style={styles.link}>business@eclicks.cn</Text>
                        </Text>
                        <Text style={styles.contactText}>渠道合作：
                            <Text style={styles.link}>marketing@eclicks.cn</Text>
                        </Text>
                        <Text style={styles.contactText}>人才招募：
                            <Text style={styles.link}>hr@eclicks.cn</Text>
                        </Text>
                    </View>
                    <Text style={styles.h3}>版本</Text>
                    <Text style={[styles.h4]}>当前版本：6.2.5</Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        marginTop: Platform.OS == 'ios' ? 20 : 0
    },
    touchnav: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
		borderStyle: 'solid',
		borderBottomColor: '#f1f1f1',
    },
    navBack: {
        borderStyle: 'solid',
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderColor: '#000',
        width:12,
        height: 12,
        transform: [{rotate:'-45deg'}],
    },
    title: {
        fontSize: 18,
        color: '#333',
        fontWeight: '500'
    },
    h3: {
        fontSize: 16,
        color: '#000',
        paddingTop: 3,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 3,
        backgroundColor: '#e0e0e0'
    },
    h4: {
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        fontSize: 14,
        color: '#333'
    },
    icon: {
        padding: 10,
        alignItems: 'center'
    },
    desc: {
        fontSize: 14,
        color: '#333',
        marginTop: 15
    },
    contact: {
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
    },
    contactText: {
        fontSize: 14,
        color: '#333',
    },
    link: {
        color: '#337ab7'
    }
});
