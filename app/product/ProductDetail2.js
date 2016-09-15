
'use strict';

import React,{ Component,PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  WebView,
  View,
} from 'react-native';

import Constant from '../common/Constant'

export default class ProductDetail2 extends Component{

  constructor(props) {
     super(props);
     this.state={

     };
  }

  render() {

    return (
      <View style={{flex:1}}>
        <WebView
         automaticallyAdjustContentInsets={false}
         source={{uri: Constant.httpKeys.HOST+Constant.httpKeys.PRODUCT_DETAIL_API_KEY2+this.props.prodId}}
         javaScriptEnabled={true}
         domStorageEnabled={true}
         decelerationRate="normal"
         startInLoadingState={true}
       />
      </View>
    );
  }
}
const styles = StyleSheet.create({

});
