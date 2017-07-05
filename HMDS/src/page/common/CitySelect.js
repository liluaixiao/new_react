import Component from '../../util/component';
import React from 'react';
import {
    View,
    Image,
    Text,
    ListView,
    Platform,
    Dimensions,
    Alert,
    Animated,
    Easing,
} from 'react-native';

import Touchable from '../common/Touchable';
import app from '../../util/app';
import data from '../../util/data';
// import city from '../json/city.json';

const {width, height} = Dimensions.get('window');
export default class CitySelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource:new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            }),
            letters: [],
            transY: new Animated.Value(height),
            show:　false
        };

        this._listView = null;
        this.heightList = [];
        this.maxHeight = this.minHeight = 0;
    }

    componentDidMount(){
        var city = null;
        data.cityList((res)=>{
            if (res.code == 200){
                city = res.data;

                //填充城市定位
                city.list.push({
                    code: this.props.local.cityCode,
                    name: this.props.local.city=='城市'?'未开启定位':this.props.local.city,
                    name_en: '0'
                });

                let letters = ['0', '#'], list = [], citySource = {}, del = [];
                //提取城市首字母
                for(let i=0;i<26;i++){
                    letters.push(String.fromCharCode(65+i));
                }

                //按首字母排序城市
                for (let i=0; i<letters.length; i++){
                    let _city = [];
                    for (let j=0; j<city.list.length; j++){
                        if (letters[i] == city.list[j].name_en[0].toUpperCase()){
                            //直辖市放到一个数组里
                            if (letters[i] == '#'){
                                if (!_city.length){
                                    _city.push(city.list[j].name);
                                }else{
                                    _city[0] += '&'+city.list[j].name;
                                }
                            }else{
                                _city.push(city.list[j].name);
                            }
                        }
                    }
                    if (_city.length){
                        list.push({
                            index: letters[i],
                            name: _city
                        });
                        //计算每一块城市的高度
                        this.heightList.push(28+_city.length*40);
                    }else{
                        del.push(i);
                    }
                }

                //删除城市中没有的字母
                for (let i=0;i<del.length;i++){
                    letters.splice(del[i]-i, 1);
                }

                //拼装citySource
                let sectionIDs=[], rowIDs=[];
                for (let i=0; i<list.length; i++){
                    let secName = 'sec'+list[i].index;
                    sectionIDs.push(secName);
                    citySource[secName] = {};

                    let _row = [];
                    for (let j=0; j<list[i].name.length; j++){
                        let rowName = 'row'+j;
                        _row.push(rowName);
                        citySource[secName][rowName] = list[i].name[j];
                    }
                    rowIDs.push(_row);
                }

                //拼接完成的数据
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(citySource, sectionIDs, rowIDs),
                    letters: letters
                });

                //计算触摸的最高距离和最短距离
                this.minHeight = (height-18*letters.length)/2;
                this.maxHeight = height - (height-18*letters.length)/2;
            }
        });


        //监听是否点击城市选择
        this.on('showCity', ()=>{
            this.setState({
                show: true
            })
        });
    }

    //绘制城市字母导航
    renderLetter() {
        let letters = this.state.letters.map((item, index)=>{
            if (item == '0'){
                return <Image style={_.geoIcon} key={index} source={require('../../assets/location_icon.png')}/>
            }
            return <Text style={_.letterItem} key={index}>{item}</Text>
        });
        return <View style={_.letters}
                 onStartShouldSetResponder={(evt)=>true}
                 onMoveShouldSetResponder={(evt)=>true}
                 onResponderMove={(evt)=>{
                     let y = parseInt(evt.nativeEvent.pageY);
                     if (y < this.maxHeight && y > this.minHeight-10){
                         this.scroll(this.state.letters.length - 1 - parseInt((this.maxHeight - y)/18));
                     }
                 }}
        >
            {letters}
        </View>
    }

    //滚动事件
    scroll(index=10){
        let timer = 0,last = 0,threshhold =0;
        return (()=>{
            let now = +new Date;
            if (last && now<last+threshhold){
                clearTimeout(timer);
                timer = setTimeout(()=>{
                    last = now;
                    let pos = 0;
                    for(let i = 0;i<index;i++){
                        pos += this.heightList[i]
                    }
                    this._listView.scrollTo({
                        y:pos
                    })
                }, threshhold);
            }else{
                last = now;
                let pos = 0;
                for(let i = 0;i<index;i++){
                    pos += this.heightList[i]
                }
                this._listView.scrollTo({
                    y:pos,
                    animated: false
                })
            }
        })()
    }

    //绘制城市首字母
    renderSectionHeader(city, letter){
        // console.log('传递过来的参数：', arguments);
        letter = letter=='sec#'?'直辖市':letter=='sec0'?'当前定位城市':letter[3];
        return <View style={_.letterBox}>
            <Text style={_.letter}>{letter}</Text>
        </View>

    }

    //选择城市
    selCity(city){
        if (city == '未开启定位') return false;
        this.setState({
            show: false
        });
        this.props.selCity(city);
    }

    //绘制城市
    renderRow(city, secID, rowID){
        let style = _.cityBox, len=0;
        for (let key in this.state.dataSource._dataBlob[secID]){
            len++;
        }
        if (rowID.substr(3) == len-1){
            style = [_.cityBox, {borderColor:'transparent'}];
        }

        //特殊绘制直辖市
        if (secID == 'sec#'){
            return <View style={_.municipal}>
                {city.split('&').map((item,index)=>{
                    return  <Touchable key={index} style={_.municipalCity} onPress={()=>this.selCity(item)}>
                        <Text style={_.city}>{item}</Text>
                    </Touchable>
                })}
            </View>
        }

        return <Touchable style={style} onPress={()=>this.selCity(city)}>
            <Text style={_.city}>{city}</Text>
        </Touchable>
    }

    //隐藏城市选择控件
    cancel(){
        //判断是否选择城市，如果未选择，不能关闭
        if (this.props.local.city == '城市'){
            Alert.alert('', '请选择所在城市');
            return false;
        }
        Animated.timing(
            this.state.transY,
            {
                toValue: height,
                easing: Easing.linear,
                duration: 150
            },
        ).start((e)=>{
            if (e.finished){
                this.setState({
                    show: false
                })
            }
        });
    }

    render() {
        if (!this.state.dataSource.rowIdentities.length || !this.state.show){
            return null;
        }
        return (
            <Animated.View
                style={[_.page, {transform:[{translateY: this.state.transY}]}]}
                onLayout={(e)=>{
                    Animated.timing(
                        this.state.transY,
                        {
                            toValue: 0,
                            easing: Easing.linear,
                            duration: 150
                        }
                    ).start();
                }}
            >
                <View style={_.header}>
                    <Touchable style={_.closeBox} onPress={()=>this.cancel()}>
                        <Image style={_.close} source={require('../../assets/Close_icon.png')}/>
                    </Touchable>
                </View>
                <ListView
                    style={_.wrap}
                    ref={listView =>{this._listView = listView}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderSectionHeader={this.renderSectionHeader.bind(this)}
                    enableEmptySections={true}
                    initialListSize={100}
                />

                {this.renderLetter()}
            </Animated.View>
        )
    }
}

//样式
const _ = {
    page: {
        backgroundColor: '#fff',
        marginTop : -44,
        height: height-70
    },
    header: {
        position: 'absolute',
        top: 0,
        width,
        height: 44,
        borderStyle: 'solid',
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
    },
    closeBox: {
        width: 44,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center'
    },
    close:{
        width: 16,
        height: 16,
        marginLeft:10
    },
    wrap: {
        marginTop: 44,
    },
    letter: {
        fontSize: 12,
        color: '#999'
    },
    letterBox: {
        height: 28,
        flex: 1,
        paddingLeft:10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
    },
    city: {
        fontSize: 15,
        color: '#333'
    },
    municipal:{
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        flexWrap: 'wrap'
    },
    municipalCity:{
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        width: 65
    },
    cityBox:{
        height: 40,
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
    },
    geoIcon: {
        width: 8,
        height:11.6,
        resizeMode: 'cover',
        marginBottom: 4
    },
    letters:{
        position: 'absolute',
        top: 44,
        bottom: 0,
        right: 5,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    letterItem: {
        textAlign: 'center',
        fontSize: 12,
        color:'#030303',
        paddingLeft: 12,
        paddingRight: 12,
        height: 18,
    }
};