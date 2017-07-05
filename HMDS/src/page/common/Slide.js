import Component from '../../util/component';
import React from 'react';
import {
    View,
    Text,
    FlatList,
    Animated,
    Easing,
    Dimensions,
    PanResponder
} from 'react-native';

import _ from '../../style/common/Slide';
import Touchable from './Touchable';
import data from '../../util/data';

const {width} = Dimensions.get('window');
const minVal = width/375*175,
      maxVal = width/375*200;

export default class Slide extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            length: 0,
            transX: new Animated.Value(minVal),
            show: false,
        };

        this.local = '';
        this.transX = 0;
    }

    componentDidMount(){
        this.on('showSlide', (res)=>{
            this.local = res;
            data.filter(res, (res)=>{
                this.setState({
                    show: true,
                    list: res.data.list,
                    length: res.data.list.length
                })
            });
        });

        //手势关闭筛选
        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            // onStartShouldSetPanResponder: (evt, gestureState) => false,
            // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            // onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                // return gestureState.dy/gestureState.dx
                //!!!RN触摸响应事件的大坑,设置捕捉事件的条件，让其他事件有机会获取事件
                return Math.abs(gestureState.dy)<Math.abs(gestureState.dx)
            },

            onPanResponderMove: (evt, gestureState) => {
                // 最近一次的移动距离为gestureState.move{X,Y}
                if (Math.abs(gestureState.vx) > Math.abs(gestureState.vy) &&
                    Math.abs(gestureState.dx) > Math.abs(gestureState.dy)){
                    if (gestureState.moveX > maxVal && gestureState.moveX < width
                    && this.transX+gestureState.dx > 0 && this.transX+gestureState.dx < minVal){
                        Animated.timing(
                            this.state.transX,
                            {
                                toValue: this.transX+gestureState.dx,
                                duration: 0
                            }
                        ).start();
                    }
                }

                // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > 10 && Math.abs(gestureState.vx) > Math.abs(gestureState.vy)){
                    this.cancelSlide();
                }else{
                    this.cancelSlide(()=>{}, true);
                }

                // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
                // 一般来说这意味着一个手势操作已经成功完成。
            },
            onShouldBlockNativeResponder: (evt, gestureState) => false
        });
    }

    cancelSlide(callback=()=>{}, init = false){
        Animated.timing(
            this.state.transX,
            {
                toValue: init?0:minVal,
                easing: Easing.linear,
                duration: 150
            },
        ).start((e)=>{
            if (e.finished){
                !init && this.setState({
                    show: false
                }, ()=>{})
            }
        });
    }

    selectItem(item){
        item.local = this.local;
        this.props.navigation.navigate('SearchResult', (item));
    }

    renderItem(item, index){
        if (item.id < 0)   return null;
        let style = _.itemText, itemStyle = _.item;
        if (this.props.select && item.id == this.props.select){
            style = [_.itemText, {color: '#ff2943'}]
        }


        if (index == this.state.list.length - 1){
            itemStyle = [_.item, {borderColor: 'transparent'}]
        }

        return <Touchable
            style={itemStyle}
            key={index}
            onPress={()=>this.selectItem(item)}>
                <Text style={style}>{item.name}</Text>
        </Touchable>
    }

    render(){
        if (!this.state.show){
            return null;
        }

        return (
            <View style={_.slide}>
                <Touchable
                    style={_.mask}
                    onPress={()=>this.cancelSlide()}
                />
                <Animated.View
                    {...this._panResponder.panHandlers}
                    style={[_.body, {transform:[{translateX: this.state.transX}]}]}
                    onLayout={(e)=>{
                        Animated.timing(
                            this.state.transX,
                            {
                                toValue: 0,
                                easing: Easing.linear,
                                duration: 150
                            }
                        ).start();
                    }}
                >
                    <View style={_.container}>
                        <Touchable
                            style={_.backBox}
                            onPress={()=>this.cancelSlide()}
                        >
                            <View style={_.navBackIcon}/>
                        </Touchable>
                        <View style={_.title}>
                            <Text style={_.titleText}>筛选</Text>
                        </View>
                    </View>
                    <FlatList
                        style={_.scroll}
                        data={this.state.list}
                        keyExtractor={(item)=>item.id}
                        renderItem={({item, index}) => this.renderItem(item, index)}
                    />
                </Animated.View>
            </View>
        )
    }
}

