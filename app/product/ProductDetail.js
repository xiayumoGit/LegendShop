'use strict';

import React, {Component, PropTypes} from 'react';
import {
    Image,
    Animated,
    StyleSheet,
    Text,
    ScrollView,
    InteractionManager,
    TouchableOpacity,
    Platform,
    View,
} from 'react-native';

import ProductDetail1 from './ProductDetail1';
import ProductDetail2 from './ProductDetail2';
import ProductDetail3 from './ProductDetail3';

import IndicatorNavigator from '../component/indicatorNavi/IndicatorNavigator';
import Constant from '../common/Constant';
import UIConfigure  from '../common/UIConfigure';

let defaultTab = Constant.strings.detailTabStringArray;

export default class ProductDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 0,
            sortTypeViewY: new Animated.Value(0),
            coverViewOpacity: new Animated.Value(0),
            isDrop: false,
        };
    }

    _onBackPress() {
        this.props.navigator.pop();
    }

    handleSortTypesViewAnimation() {
        this.setState({
            isDrop: !this.state.isDrop,
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
        ]).start();
    }

    _onCartClick() {
        this.handleSortTypesViewAnimation();

    }

    _onFollowClick() {

    }

    renderSortTypesView() {
        let typesStyle = [styles.sortTypesView];
        typesStyle.push({
            top: this.state.sortTypeViewY.interpolate({
                inputRange: [0, 1],
                outputRange: [Constant.window.height, Constant.window.height / 3]
            })
        })
        return (
            <Animated.View style={typesStyle}>
                <View style={{backgroundColor:'white',
                 height:Constant.window.height-Constant.window.height/3}}>

                  <View>



                  </View>


                </View>
            </Animated.View>
        )
    }

    renderCoverView() {
        return (
            <TouchableOpacity
                style={{position: 'absolute',top: 0}}
                activeOpacity={1}
                onPress={()=>this.handleSortTypesViewAnimation()}>
                <Animated.View
                    style={{
                        width: Constant.window.width,
                        height: Constant.window.height,
                        backgroundColor: 'black',
                        opacity: 0.5,
                    }}
                />
            </TouchableOpacity>
        )
    }

    _tabItemSelected(tabIndex: number) {
        const {tabChanged}=this.props;
        tabChanged(tabIndex);
    }

    _renderTab(tabIndex: number) {
        return defaultTab.map((item, i)=> {
            let childView;
            switch (i) {
                case 0:
                    childView = <View style={{flex:1}}>
                        <ProductDetail1 {...this.props}/>
                        <View style={styles.separate}/>
                        <View style={styles.bottom}>
                            <View
                                style={{flex:3,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                                <TouchableOpacity onPress={()=>this._onFollowClick('客服')} activeOpacity={0.7}>
                                    <View style={styles.bottomContainer1}>
                                        <Image source={require('./img/kefu.png')} style={styles.icon}/>
                                        <Text style={[styles.text1,{color:'white',marginLeft:5}]}>客服</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this._onFollowClick('关注')} activeOpacity={0.7}>
                                    <View style={styles.bottomContainer1}>
                                        <Image source={require('./../image/message.png')} style={styles.icon}/>
                                        <Text style={[styles.text1,{color:'white',marginLeft:5}]}>关注</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this._onFollowClick('购物车')} activeOpacity={0.7}>
                                    <View style={styles.bottomContainer1}>
                                        <Image source={require('./img/cart_icon.png')} style={styles.icon}/>
                                        <Text style={[styles.text1,{color:'white',marginLeft:5}]}>购物车</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{flex:1}} onPress={()=>this._onCartClick('加入购物车')}
                                              activeOpacity={0.7}>
                                <View style={{height:50,backgroundColor:UIConfigure.detail.cartBgColor,
                                    alignItems:'center',justifyContent:'center'}}>
                                    <Text style={[styles.bottomText]}>加入购物车</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {this.state.isDrop ? this.renderCoverView() : null}
                        {this.renderSortTypesView()}
                    </View>;
                    break;
                case 1:
                    childView = <ProductDetail2 prodId={this.props.prodId}/>
                    break;
                case 2:
                    childView = <ProductDetail3/>
                    break;
            }
            return (
                <IndicatorNavigator.Item
                    key={i}
                    title={item}
                    selected={tabIndex===i}
                    titleStyle={{color:UIConfigure.detail.detailTabText}}
                    selectedTitleStyle={{color:UIConfigure.home.detailTabSelectedText}}
                    lineStyle={{ backgroundColor:'transparent',height:2,marginTop:10,width:65}}
                    selectLineStyle={{backgroundColor:Constant.colors.redColor,height:2,marginTop:10,width:65}}
                    onPress={()=> this._tabItemSelected(i)}>
                    {childView}
                </IndicatorNavigator.Item>
            )
        });
    }


    render() {
        const {tabIndex}=this.props;
        return (
            <View style={{flex:1}}>
                <View style={{flex: 1, backgroundColor:'white'}}>
                    <IndicatorNavigator style={styles.pageContainer}
                                        sceneStyle={styles.sceneContainer}
                                        hidesTabTouch={true}
                                        tabBarStyle={styles.tabContainer}>
                        {this._renderTab(tabIndex)}
                    </IndicatorNavigator>
                </View>
                <TouchableOpacity style={styles.backImg}
                                  activeOpacity={0.7} onPress={()=>this._onBackPress()}>
                    <Image source={require('../image/ic_arrow_back_black_@2x.png')}/>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: UIConfigure.detail.bottomBarHeight,
        backgroundColor: UIConfigure.detail.bottomBarColor,
    },
    bottomContainer1: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    bottomContainer2: {
        height: 50,
        alignItems: 'center',
        borderColor: 'red',
    },
    bottomText: {
        color: 'white',
        fontSize: 15,
    },
    icon: {
        width: 20,
        height: 20,
    },
    sortTypesView: {
        position: 'absolute',
        backgroundColor: 'red',
        width: Constant.window.width,
    },
    pageContainer: {},
    tabContainer: {
        justifyContent: 'center',
        paddingTop: Constant.window.statusBarHeight,
        height: (Platform.OS === 'ios'?60:45)+5,
        backgroundColor: 'white'
    },
    sceneContainer: {
        paddingTop: Constant.window.statusBarHeight +  Platform.OS === 'ios'?60:45,
    },
    backImg:{
        position:'absolute',
        top:12+Constant.window.statusBarHeight,
        left:5,
    }
});