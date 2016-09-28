
'use strict';

import React,{ Component,PropTypes } from 'react';
import {
  Image,
  Platform,
  Animated,
  StyleSheet,
  Text,
  ScrollView,
  TouchableHighlight,
  InteractionManager,
  ActivityIndicatorIOS,
  TouchableOpacity,
  View,
} from 'react-native';

import ProductDetail1 from './ProductDetail1';
import ProductDetail2 from './ProductDetail2';
import ProductDetail3 from './ProductDetail3';

import OrderCommit from '../order/OrderCommit';

import Constant from '../common/Constant';

let defaultTab=Constant.strings.detailTabStringAarray;

export default class ProductDetail extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            pageIndex:0,
            // 排序视图Y值
            sortTypeViewY: new Animated.Value(0),
            coverViewOpacity: new Animated.Value(0),
            backgroundColor:new Animated.Value(0),
            isDrop:true,
        };
    }
    _fetchData(){


    }
    // 排序View动画
    handleSortTypesViewAnimation() {
        this.setState({
            isDrop:!this.state.isDrop,
        });
        Animated.parallel([
            Animated.timing(this.state.sortTypeViewY, {
                toValue: this.state.isDrop ? 0 : 1,
                duration: 300,
            }),
            Animated.timing(this.state.coverViewOpacity, {
                toValue: this.state.isDrop ? 0 : 1,
                duration: 300,
            }),
            Animated.timing(this.state.backgroundColor, {
                toValue: this.state.isDrop ? 0 : 1,
                duration: 300,
            })
        ]).start();
    }


    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this._fetchData();
        });
    }
    _onClick() {
        this.props.navigator.pop();
    }
    _onPayClick(){
        let navigator = this.props.navigator;
        navigator.push({
            name: '订单填写',
            component: OrderCommit,
            params: {
                title:'订单填写',
            }
        })
    }
    _onCartClick(){
        this.handleSortTypesViewAnimation();

    }
    _onFollowClick(){

    }

    _renderTab(){
        let tab = defaultTab.map((item,i)=>{
            return (
                <TouchableOpacity key={i} activeOpacity={0.7} onPress = {()=> this.setState(
              {pageIndex: i})}>
                    <View style={{alignItems:'center',marginRight:15}}>
                        <Text style={[styles.defaultText,this.state.pageIndex==i?styles.selectText:null]}>{item}</Text>
                        <View style={[styles.defaultLine,this.state.pageIndex==i?styles.selectLine:null]}/>
                    </View>
                </TouchableOpacity>
            )
        });
        return (
            <View style={styles.tabContainer}>
                {tab}
            </View>
        );
    }

    // 所有营养素View
    renderSortTypesView() {
        let typesStyle = [styles.sortTypesView];
        typesStyle.push({
            top: this.state.sortTypeViewY.interpolate({
                inputRange: [0, 1],
                outputRange: [Constant.window.height, Constant.window.height/3]
            })
        })
        return (
            <Animated.View style={typesStyle}>
                <View style={{backgroundColor:'white',height:Constant.window.height-Constant.window.height/3}}>
                    <View style={{flexDirection:'row',alignItems:'center',margin:10}}>
                        <Image source={require('../image/default_banner_@2x.jpg')} style={{width:100,height:100}}/>
                        <Text style={{marginLeft:15,}}>2016款愤怒的小鸟主题</Text>
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center',margin:10}}>
                        <Text>购买数量</Text>
                        <Text style={{marginLeft:15,}}>12件</Text>
                    </View>



                </View>
            </Animated.View>
        )
    }

    // 遮盖层
    renderCoverView() {
        return (
            <TouchableOpacity
                style={{position: 'absolute',top: 0}}
                activeOpacity={1}
                onPress={()=>this.handleSortTypesViewAnimation()}
            >
                <Animated.View
                    style={{
                        width: Constant.window.width,
                        height: Constant.window.height,
                        backgroundColor: 'rgba(131, 131, 131, 0.5)',
                        opacity: this.state.coverViewOpacity,
                    }}
                />
            </TouchableOpacity>
        )
    }

    render() {
        let page;
        switch (this.state.pageIndex) {
            case 0:
                page = < ProductDetail1 prodId={this.props.prodId}/>
                break;
            case 1:
                page = < ProductDetail2 prodId={this.props.prodId}/>
                break;
            case 2:
                page = < ProductDetail3 />
                break;

        };

        let bgStyle = [styles.bottom];
        bgStyle.push({
            backgroundColor: this.state.backgroundColor.interpolate({
                inputRange: [0, 1],
                outputRange: ['#808080', '#808080']
            })
        })
        let content = <View style={{flex:1}}>
            {page}
            {!this.state.isDrop?this.renderCoverView():null}
            {this.renderSortTypesView()}
            <View style={styles.separate}/>
            <Animated.View style={bgStyle}>
                <TouchableOpacity onPress={()=>this._onFollowClick('关注')} activeOpacity={0.7}>
                    <View style={styles.bottomContainer1}>
                        <Image source={require('./img/icon_collection.png')} style={styles.icon}/>
                        <Text style={[styles.text1,{color:'white',marginLeft:5}]}>关注</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.bottomContainer1}>
                    <TouchableOpacity onPress={()=>this._onCartClick('加入购物车')} activeOpacity={0.7}>
                        <View style={[styles.bottomContainer2,{backgroundColor:'#F47022'}]}>
                            <Text style={[styles.bottomText]}>加入购物车</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this._onPayClick('购买')} activeOpacity={0.7}>
                        <View style={[styles.bottomContainer2,{backgroundColor:'#FF4854',marginLeft:15}]}>
                            <Text style={[styles.bottomText]}>立即购买</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>;

        return (
            <View style={{flex: 1,backgroundColor:'#F1F2F6'}}>
                <View >
                    <View style={styles.container}>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>this._onClick()}>
                            <Image source={require('../image/ic_arrow_back_black_@2x.png')}/>
                        </TouchableOpacity>
                        {this._renderTab()}
                    </View>
                    <View style={styles.separate}/>
                </View>
                {content}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // 水平排布
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: Platform.OS === 'ios' ? 20 : 20,  // 处理iOS状态栏
        height: Platform.OS === 'ios' ? 60 : 60,   // 处理iOS状态栏
        backgroundColor: 'white',
        alignItems: 'center' // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
    },
    separate: {
        height: 1,
        backgroundColor: '#A7A7AA',
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#808080',
    },
    bottomContainer1: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    bottomContainer2: {
        alignItems:'center',
        width:100,
        paddingBottom:10,
        paddingTop: 10,
        borderRadius:3,
        borderColor:'#F0F0F0',
    },
    bottomText: {
        color: 'white',
        fontSize: 12,
    },
    tabContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        marginTop: 8,
        backgroundColor: 'white'
    },
    icon: {
        width: 15,
        height: 13,
    },
    selectText: {
        color: Constant.colors.redColor,
        fontSize: 15,
    },
    defaultText: {
        fontSize: 15,
        color: 'black',
    },
    selectLine: {
        backgroundColor: Constant.colors.redColor,
        height: 3,
        marginTop: 10,
        width: 60,
    },
    defaultLine: {
        backgroundColor: 'transparent',
        height: 3,
        marginTop: 10,
        width: 60,
    },
    sortTypesView: {
        position: 'absolute',
        backgroundColor: 'red',
        width: Constant.window.width,
    },
});