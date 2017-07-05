import Component from '../../util/component';
import React from 'react';
import {View, Picker, Text, Platform} from 'react-native';
import _ from '../../style/common/Picker';
import Touchable from './Touchable';

/**
 * 包装通用选择器
 */
export default class CLPicker extends Component{
    constructor(props){
        super(props);

        this.state = {
            showPicker: false,
            value: props.defaultValue,
            label: this.getLabel(props.defaultValue, props.data),
            defaultValue: props.defaultValue
        };

        //渲染ios选择列表
        // this.emit('initCLPicker', {data: props});
        // this.props = {
        //     style:{},
        //     textStyle:{},
        //     data:[
        //         {
        //             label: '数量',
        //             value: 1,
        //         }
        //     ],
        //     defaultValue,
        //     valueChange: ()=>{}
        // }
    }
    componentDidMount(){
        //绑定iosPicker item改变事件
        this.on('CLPickerChange', (res)=>{
            this.state.value = res.value;
            this.state.label = this.getLabel(res.value);
            this.forceUpdate();

            this.props.valueChange &&　this.props.valueChange(res.value);
        });
    }

    componentWillReceiveProps(props){
        // console.log('props：', props);

        this.state.label = this.getLabel(props.defaultValue, props.data);
        this.state.value = this.state.defaultValue = props.defaultValue;
        this.forceUpdate();

        //渲染ios选择列表
        this.emit('initCLPicker', {data: props});
    }

    getLabel(val, data=this.props.data){
        let label = '';
        data.forEach((item)=>{
            if (item.value == val){
                label = item.label?item.label:item.value;
            }
        });
        return label
    }

    render(){
        let Items = this.props.data.map((item)=>{
            return  <Picker.Item label={item.label?item.label:item.value} value={item.value} key={item.value}/>
        });
        //根据系统判断picker的样式
        let pickerStyle = Platform.OS == 'ios'?_.picker:[this.props.style, {position:'absolute',top:0,left:0,opacity:0,backgroundColor:'red'}];

        this.picker = <Picker
            itemStyle={_.pickerItem}
            style={pickerStyle}
            model="dialog"
            selectedValue={this.state.value}
            onValueChange={(value)=>{
                this.state.value = value;
                this.state.label = this.getLabel(value);
                this.forceUpdate();

                this.props.valueChange &&　this.props.valueChange(value);
            }}>
            {Items}
        </Picker>;

        let androidPicker =null;
        if (Platform.OS == 'android'){
            androidPicker = this.picker;
        }

        return (
            <View >
                <Touchable style={this.props.style} onPress={()=> {
                    this.state.showPicker = true;
                    this.state.defaultValue = this.state.value;
                    this.forceUpdate();
                    this.emit('CLPickerShow', {});
                }}>
                    <Text style={this.props.textStyle || null}>{this.props.format?this.props.format(this.state.label):this.state.label}</Text>
                </Touchable>
                {androidPicker}
            </View>
        );
    }
}


CLPicker.IOS = class extends Component{
    constructor(props){
        super(props);

        this.state = {
            showPicker: false,
            value: '',
            label: '',
            defaultValue: ''
        };

        this.data = [];
    }

    componentDidMount(){
        this.on('CLPickerShow', ()=>{
            this.state.showPicker = true;
            this.forceUpdate();
        });


        this.on('initCLPicker', (res)=>{
            //初始化value
            res = res.data;
            this.data = res.data;
            this.state.value = this.state.defaultValue = res.defaultValue;
            this.state.label = this.getLabel(res.defaultValue);
            this.forceUpdate();
        });
    }

    emitItemChange(value){
        this.emit('CLPickerChange', {value});
    }

    getLabel(val){
        let label = '';
        this.data.forEach((item)=>{
            if (item.value == val){
                label = item.label?item.label:item.value;
            }
        });
        return label
    }

    render(){
        let Items = this.data.map((item)=>{
            return  <Picker.Item label={item.label?item.label:item.value} value={item.value} key={item.value}/>
        });

        // console.log('items：', Items);
        let picker = <Picker
            itemStyle={_.pickerItem}
            style={_.picker}
            model="dialog"
            selectedValue={this.state.value}
            onValueChange={(val)=>{
                this.state.value = val;
                this.state.label = this.getLabel(val);

                this.forceUpdate();
            }}>
            {Items}
        </Picker>;

        if (Platform.OS == 'ios' && this.state.showPicker){
            return <View style={_.pickerWrap}>
                <Touchable onPress={()=>{
                    this.state.showPicker = false;
                    this.forceUpdate();
                }} opacity={0.9} style={_.pickerShadow}/>
                <View style={_.pickerAction}>
                    <Touchable onPress={()=>{
                        this.state.showPicker = false;
                        this.forceUpdate();
                    }}>
                        <Text style={_.pickerText}>取消</Text>
                    </Touchable>
                    <Touchable onPress={()=>{
                        this.state.showPicker = false;
                        this.emitItemChange(this.state.value);
                        this.forceUpdate();
                    }}>
                        <Text style={_.pickerText}>完成</Text>
                    </Touchable>
                </View>
                {picker}
            </View>
        }
        return null;
    }
};


/*
//使用方式
<CLPicker
    style={}
    textStyle={}
    data = {[{
        label: '数量',
        value: 1,
    }]}
    defaultValue={}
    valueChange={()=>{}}
/> */
