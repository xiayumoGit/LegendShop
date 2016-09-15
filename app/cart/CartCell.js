'use strict';

import React, { Component,PropTypes } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';

export default class CartCell extends Component{

  render() {
    let img = this.props.cart.img;
    let name = this.props.cart.name;
    let color = this.props.cart.color;
    let price = this.props.cart.price;

    let TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return (
        <TouchableElement
          onPress={this.props.onSelect}
          onShowUnderlay={this.props.onHighlight}
          onHideUnderlay={this.props.onUnhighlight}>
          <View style={styles.row}>
            <Image
              source={require('../image/icon_button_i_02.png')}
              style={styles.icon}
            />
            <Image
              source={img}
              style={styles.cellImage}
            />
            <View>
              <Text numberOfLines={15} style={[styles.text1,{width:220}]}>{name}</Text>
              <Text style={styles.text3}>{color}</Text>
              <Text style={styles.text3}>{price}</Text>
              <View style={styles.container3}>
                <Text style={[styles.text1,styles.border]}>-</Text>
                <Text style={[styles.text1,styles.border]}>1</Text>
                <Text style={[styles.text1,styles.border]}>+</Text>
              </View>
            </View>
            <Image
              source={require('../image/icon_address_delete.png')}
              style={styles.icon}
            />
          </View>
        </TouchableElement>
    );
  }
}
let styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    justifyContent:'space-between',
  },
  container3:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
    marginTop:3,
    alignItems:'center',
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 75,
    marginRight: 10,
    width: 75,
  },
  text1:{
    fontSize:12,
  },
  text3:{
    fontSize:12,
    marginTop:3,
  },
  icon:{
    width:12,
    height:12,
  },
  border:{
    borderWidth:0.5,
    paddingLeft:8,
    paddingRight:8,
    paddingTop:2,
    paddingBottom:2,
    borderRadius: 2,  // 设置圆角边
    borderColor:'#DEDEDE',
  },
});
