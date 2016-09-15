
'use strict';

import React,{ Component,PropTypes } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';

export default class OrderProductCell extends Component{

  render() {
    let img = this.props.product.img;
    let name = this.props.product.name;
    let num = this.props.product.num;
    let price = this.props.product.price;

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
              source={img}
              style={styles.cellImage}
            />
            <View>
              <Text numberOfLines={15} style={[styles.text1,{width:180}]}>{name}</Text>
              <Text style={styles.text3}>{num}</Text>
            </View>

            <Text style={[styles.text3,{color:'#FF0000'}]}>{price}</Text>
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
    height: 50,
    marginRight: 10,
    width: 50,
  },
  text1:{
    fontSize:12,
  },
  text3:{
    fontSize:12,
    marginTop:3,
  },

});
