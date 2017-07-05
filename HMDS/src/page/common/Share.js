/**
 * This exposes the native Share module as a JS module. This has a function share
 * which takes the following parameters:
 *
 *
 * share(channel : string, content : Object) : Promise<boolean>
 *     @param channel String详细见补充说明
 *     @param content String
 *     @param title String 分享的标题
 *     @param summary String 分享的内容
 *     @param image String 分享的图片链接
 *     @param url String 分享的url
 *     @return boolean true 分享成功
 *
 * channel:
 *     0 wxMessage	微信好友
 *     1 wxTimeline	微信朋友圈
 *     2 qq	        QQ好友
 *     3 sina	微博
 *
 * errorCode:
 *      share	101	主动取消分享
 *      share	102	分享失败，原因分享数据为空
 *      share	103	分享失败，原因native方法出错
 *      share	104	分享失败，详见原因sdk内部错误
 *
 *  example:
 *      Share.doShare(Share.QQ, {
            title: 'jjz',
            summary: '1234565221内容',
            image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
            url: 'http://www.baidu.com'
        }).then((result) => {
            alert(‘分享成功’);
            console.log(result);
        }).catch((error) => {
            console.log(error.code);
            console.log(error.message);
        });
 */
import React from 'react';
import {NativeModules, View, Image, Text, Dimensions, Animated, Easing} from 'react-native';
import Component from '../../util/component';
import _ from  '../../style/common/Share';
import Touchable from './Touchable';

export default class Share extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
            init: false,
            bottom: new Animated.Value(Dimensions.get('window').height),
            boxHeight: 0
        };

        this.content = {
            channel: '',
            param: {
                title: 'mdzz',
                summary: '1234565221内容',
                image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                url: 'http://www.baidu.com'
            },
            callback: ()=>{},
            error: ()=>{}
        };

        this.CLShare = NativeModules.CLRNShareModule;
    }

    componentDidMount(){
        this.on('share', (content)=>{
            this.content = content;
            if (!content.callback){
                this.content.callback = ()=>{}
            }
            if (!content.error){
                this.content.error = ()=>{}
            }
            if (!content.channel){
                this.setState({show: true});
            }else{
                this.doShare(content.channel);
            }
        })
    }

    //执行客户端分享
    doShare(channel){
        this.setState({
            show: false,
            init: false,
            bottom: this.state.boxHeight
        });
        this.CLShare.share(
            channel,
            this.content.param,
        ).then(
            (res)=>{
                if (res){
                    this.content.callback(res)
                }else{
                    this.content.error()
                }
            }
        ).catch(
            (res)=>{
                this.content.error(res)
            }
        )
    }

    //收起分享面板
    hideShare(){
        Animated.timing(
            this.state.bottom,
            {
                toValue: this.state.boxHeight,
                easing: Easing.linear,
                duration: 150
            },
        ).start((e)=>{
            if(e.finished){
                this.setState({
                    show: false,
                    init: false,
                    bottom: this.state.boxHeight
                });
            }
        })
    }

    render(){
        if (this.state.show){
            return (
                <View style={_.shareMask}>
                    <Animated.View style={[_.share,{
                        bottom: this.state.bottom
                    }]} onLayout={(e)=>{
                        if (this.state.init) return;
                        this.setState({
                            init: true,
                            bottom: new Animated.Value(0-e.nativeEvent.layout.height),
                            boxHeight: 0-e.nativeEvent.layout.height
                        }, ()=>{
                            Animated.timing(
                                this.state.bottom,
                                {
                                    toValue: 20,
                                    easing: Easing.linear,
                                    duration: 150
                                },
                            ).start();
                        });
                    }}>
                        <View style={_.shareBox}>
                            <Touchable style={_.shareItem} onPress={()=>this.doShare(this.CLShare.wxMessage)}>
                                <Image style={_.shareImg}  source={require('../../assets/cl_share_wx.png')}/>
                                <Text style={_.shareText}>微信好友</Text>
                            </Touchable>
                            <Touchable style={_.shareItem} onPress={()=>this.doShare(this.CLShare.wxTimeline)}>
                                <Image style={_.shareImg}  source={require('../../assets/cl_share_pyq.png')}/>
                                <Text style={_.shareText}>朋友圈</Text>
                            </Touchable>
                        </View>
                        <Touchable style={_.cancelBox} onPress={()=>this.hideShare()}>
                            <Text style={_.cancelText} >取消</Text>
                        </Touchable>
                    </Animated.View>
            </View>
           );
        }
        return null;
    }
}