'use strict';

import React,{ Component,PropTypes } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    StyleSheet
} from 'react-native';

//定义统一风格的ios和安卓的导航栏
export default class Back extends Component {

    constructor(props) {
        super(props);
        this._onClick = this._onClick.bind(this);
    }

    _onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }
    render() {
        let {title}= this.props;
        return (
          <View >
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.7} onPress={this._onClick}>
                  <Image source={require('../image/ic_arrow_back_black_@2x.png')}/>
                </TouchableOpacity>
                <Text style={[styles.text,{marginRight:20}]}>
                      {title}
                </Text>
                <Text style={styles.text}></Text>
            </View>
            <View style={styles.separate}/>
          </View>
        );
    }
}

const styles = StyleSheet.create({

  container: {
      flexDirection: 'row',   // 水平排布
      paddingLeft: 5,
      justifyContent:'space-between',
      paddingRight: 5,
      paddingTop:20,  // 处理iOS状态栏
      height: 60,   // 处理iOS状态栏
      backgroundColor: 'white',
      alignItems: 'center'  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
  },
  separate:{
    height:1,
    backgroundColor:'#A7A7AA',
  },
  text:{
    fontSize:15,
  },
});
