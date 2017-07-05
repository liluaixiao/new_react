import Component from '../../util/component';
import React from 'react';
import {
    View,
    Text,
    FlatList,
    Platform,
    Image,
    Dimensions,
    Alert
} from 'react-native';

import data from '../../util/data';
import app from '../../util/app';
import Touchable from '../common/Touchable';
import Header from '../common/Header';

//获取屏幕宽度
const {width} = Dimensions.get('window');

export default class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            list:[]
        };

        this.page = 0;
        this.isLastPage = false;
        this.pageSize = 15;

        this.isLoading = false;
    }

    //重置页面信息
    resetPageInfo(){
        this.page = 0;
        this.isLastPage = false;
    }

    componentDidMount(){
        this.on('triggerCardLoad', ()=>{
            this.emit('hideNavBack');
            this.loadOnePage();
        });
    }

    //加载一页数据
    loadOnePage(onLoad = ()=>{}){
        if(this.isLoading || this.isLastPage) {
            return ;
        }
        this.isLoading = true;
        this.page += 1;

        data.cardList({page: this.page}, (res)=>{
            this.isLoading = false;
            this.isLastPage = res.data.isLastPage;

            if (this.page == 1){
                this.state.list = [];
            }
            let list = this.state.list.concat(res.data.list);
            this.setState({
                list
            }, ()=>{onLoad()})
        })
    }


    mixJump(item){

        app.stat('hmds-card', '办卡入口点击');
        if(item.type == 1) {
            this.props.navigation.navigate('Detail', {item:item.detail});
        } else if(item.type == 2) {
            this.props.navigation.navigate('MasterDetail', {item:item.detail});
        } else if(item.type == 3) {
            app.open(data.getAdUrl(data.AdTypeBanner, item.id, item.detail.url));
        }
    }

    renderItem(item, index){
        let style = _.imgBox;
        if (index == this.state.list.length - 1){
            style = [_.imgBox, {paddingBottom:10}]
        }
        return <Touchable style={style} key={index} onPress={()=>this.mixJump(item)}>
            <Image style={_.img} source={{uri:item.img}}  resizeMode="cover"/>
        </Touchable>
    }

    render(){
        // if (!this.state.list || !this.state.list.length){
        //     return null;
        // }

        return (
            <View style={_.page}>
                <Header
                    navigation={this.props.navigation}
                    title={"车轮独家申卡"}
                    hideNavBack = {true}
                />
                <FlatList
                    style={_.scroll}
                    refreshing={this.state.refreshing}
                    data={this.state.list}
                    keyExtractor={(item)=>item.id}
                    renderItem={({item, index}) => this.renderItem(item, index)}
                    onRefresh={() => {
                        this.setState({refreshing: true}, ()=>{
                        //保证下拉动画持续一秒以上
                            setTimeout(()=>{
                                this.resetPageInfo();
                                this.loadOnePage(()=>{
                                    this.setState({refreshing: false});
                                })
                            }, 1000);
                        });
                    }}
                    onEndReached={()=>{
                        if(this.state.list.length >= this.pageSize && !this.isLastPage) {
                            this.loadOnePage();
                        }
                    }}
                    onEndReachedThreshold={Platform.OS=='ios'? 0 : 1}
                />
            </View>
        )
    }
}

//样式
const _ = {
    page: {
        flex: 1,
        width
    },
    scroll: {
        backgroundColor: '#f5f5f5',
    },
    imgBox: {
        width: width,
        padding: 10,
        paddingBottom: 0,
        backgroundColor: '#fff'
    },
    img: {
        flex: 1,
        width: width-20,
        height: (width-20)/355*180,
        borderRadius: 10,
        overflow: 'hidden'
    }
};