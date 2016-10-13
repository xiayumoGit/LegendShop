/**
 * Created by xiayumo on 16/10/12.
 */
'use strict';

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    InteractionManager,
} from 'react-native';

import Constant from '../common/Constant';
import UIConfigure from '../common/UIConfigure';

export default class MineContent extends Component {

    _itemPress(title: string, prodId: number) {
        InteractionManager.runAfterInteractions(() => {
        });
    }

    _renderOrderView() {
        return Constant.strings.mineOrderStringArray.map((item, i)=> {
            return (
                <TouchableOpacity key={i} activeOpacity={0.7}>
                    <View style={styles.container1}>
                        <Image style={styles.itemImage2} source={UIConfigure.mine.mineOrderIconArray[i]}/>
                        <Text style={styles.showText}>{item}</Text>
                    </View>
                </TouchableOpacity>
            )
        });
    }

    _renderMoneyView() {
        let numArray = ['0.0', '0张', '0个', '120'];
        return Constant.strings.mineMoneyStringArray.map((item, i)=> {
            return (
                <TouchableOpacity key={i} activeOpacity={0.7}>
                    <View style={{alignItems:'center',}}>
                        <View style={{flexDirection:'row'}}>
                            <Image style={styles.itemImage1} source={UIConfigure.mine.mineMoneyIconArray[i]}/>
                            <Text style={styles.showText}>{item}</Text>
                        </View>
                        <Text style={{color:Constant.colors.lightRedColor,fontSize:10,marginTop:5}}>{numArray[i]}</Text>
                    </View>
                </TouchableOpacity>
            )
        });
    }

    _renderItemView() {
        return Constant.strings.mineItemStringArray.map((item, i)=> {
            return (
                <TouchableOpacity key={i} activeOpacity={0.7}>
                    <View>
                        <View style={styles.container}>
                            <View style={{flexDirection:'row',alignItems:'center',padding:5}}>
                                <Image source={UIConfigure.mine.mineItemIconArray[i]} style={styles.itemImage1}/>
                                <Text style={[styles.title1,{marginLeft:5}]}>
                                    {item}
                                </Text>
                            </View>
                            <Image source={require('./img/icon_arrow_right.png')} style={styles.itemImage1}/>
                        </View>
                        <View style={styles.separate}/>
                    </View>
                </TouchableOpacity>
            )
        });
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={[styles.separate,{marginTop:10}]}/>
                <View style={styles.container}>
                    <View style={{flexDirection:'row',alignItems:'center',padding:5}}>
                        <Image source={require('./img/finish_order.png')} style={styles.itemImage1}/>
                        <Text style={[styles.title1,{marginLeft:5}]}>
                            我的订单
                        </Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.7}>
                        <View style={{flexDirection:'row',alignItems:'center',padding:5}}>
                            <Text style={styles.title2}>
                                查看所有订单
                            </Text>
                            <Image source={require('./img/icon_arrow_right.png')} style={styles.itemImage1}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.separate,{marginTop:0}]}/>
                <View style={styles.orderContainer}>
                    {this._renderOrderView()}
                </View>

                <View style={[styles.separate,{marginTop:10}]}/>
                <View style={styles.container}>
                    <View style={{flexDirection:'row',alignItems:'center',padding:5}}>
                        <Image source={require('./img/icon_my_wallet.png')} style={styles.itemImage1}/>
                        <Text style={[styles.title1,{marginLeft:5}]}>
                            我的钱包
                        </Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.7}>
                        <View style={{flexDirection:'row',alignItems:'center',padding:5}}>
                            <Text style={styles.title2}>
                                查看详情
                            </Text>
                            <Image source={require('./img/icon_arrow_right.png')} style={styles.itemImage1}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.separate,{marginTop:0}]}/>
                <View style={styles.moneyContainer}>
                    {this._renderMoneyView()}
                </View>

                <View style={[styles.separate,{marginTop:10}]}/>
                {this._renderItemView()}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    orderContainer: {
        backgroundColor: 'white',
        justifyContent: 'space-around',
        flexDirection: 'row',
        padding: 3,
    },
    moneyContainer: {
        backgroundColor: 'white',
        justifyContent: 'space-around',
        flexDirection: 'row',
        padding: 5,
    },
    separate: {
        height: 0.8,
        backgroundColor: '#F0F0F0',
    },
    itemImage1: {
        width: 15,
        height: 15,
    },
    itemImage2: {
        width: 30,
        height: 30,
    },
    container1: {
        alignItems: 'center',
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 3,
        paddingBottom: 3,
    },
    showText: {
        fontSize: 12,
        color: '#6E6E6E',
    }
});


