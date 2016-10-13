'use strict';

import React, {Component, PropTypes} from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    TouchableNativeFeedback,
    View,
} from 'react-native';

import Constant from '../common/Constant';

export default class ProductCell extends Component {

    render() {
        let img = Constant.httpKeys.IMAGE_API_HOST + this.props.product.pic;
        let title = this.props.product.name;
        let price = '￥' + this.props.product.price;

        return (
            <TouchableOpacity activeOpacity={0.7}
                              onPress={this.props.onSelect}
                              onShowUnderlay={this.props.onHighlight}
                              onHideUnderlay={this.props.onUnhighlight}>
                <View style={styles.row}>
                    <Image
                        resizeMode={'cover'}
                        source={{uri:img}}
                        style={styles.cellImage}
                    />
                    <View >
                        <Text style={styles.text1} numberOfLines={2}>{title}</Text>
                        <View style={{flexDirection:'row',marginTop:5}}>
                            <Text style={styles.text2}>{price}</Text>
                            <Text style={styles.text3}>{price}</Text>
                        </View>
                        <View style={{flexDirection:'row',marginTop:5}}>
                            <Text style={[styles.text2,{color:Constant.colors.lightBlackColor}]}>好评％9</Text>
                            <Text style={styles.text3}>12593人浏览</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
let styles = StyleSheet.create({
    row: {
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        padding: 8,
    },
    cellImage: {
        backgroundColor: '#dddddd',
        height: 75,
        marginRight: 10,
        width: 75,
    },
    text1: {
        width: 200,
        fontSize: 14,
    },
    text2: {
        fontSize: 12,
        color: Constant.colors.redColor,
    },
    text3: {
        fontSize: 12,
        marginLeft: 10,
        color: Constant.colors.lightBlackColor,
    },
});
