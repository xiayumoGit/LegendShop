'use strict';

import React, {Component, PropTypes} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';

import Constant from '../common/Constant'

let defaultTab = Constant.strings.judgeTabStringArray;

export default class ProductDetail3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
        };
    }

    _renderTab() {
        let tab = defaultTab.map((item, i)=> {
            return (
                <TouchableOpacity key={i} activeOpacity={0.7} onPress={()=> this.setState(
                {tabIndex: i})}>
                    <View style={[styles.defaultContainer,this.state.tabIndex==i?styles.selectContainer:null]}>
                        <Text style={[styles.defaultText,this.state.tabIndex==i?styles.selectText:null]}>{item}</Text>
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

    render() {
        return (
            <View style={{flex:1,backgroundColor:'#F1F2F6'}}>
                {this._renderTab()}
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={styles.contentContainer}>
                        <Image source={require('./img/not_result_@2x.png')}/>
                        <Text style={{fontSize:18,marginTop:15}}>该商品未收到任何评价</Text>
                        <Text style={{fontSize:13,marginTop:15}}>期待您的购买与评论！</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: Constant.colors.lightGreyColor1,
        padding: 10,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: Constant.colors.lightGreyColor,
    },
    selectContainer: {
        alignItems: 'center',
        padding: 5,
        marginLeft: 10,
        borderRadius: 3,
        borderColor: '#F0F0F0',
        backgroundColor: 'rgb(237, 89, 104)',
    },
    defaultContainer: {
        alignItems: 'center',
        padding: 5,
        marginLeft: 10,
        borderRadius: 3,
        borderColor: '#F0F0F0',
        backgroundColor: 'rgb(206, 206, 211)',
    },
    selectText: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 15,
    },
    defaultText: {
        fontSize: 15,
        backgroundColor: 'transparent',
        color: 'black',
    },
});
