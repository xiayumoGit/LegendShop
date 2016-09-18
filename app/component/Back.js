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

import UIConfigure from '../common/UIConfigure'

/**
 * 定义统一的退回，对应navigator，布局统一左边箭头，中间文字，右边文字（可能空白）
 */
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
        let {title,rightTitle}= this.props;
        return (
          <View >
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.7} onPress={this._onClick}>
                  <Image source={require('../image/ic_arrow_back_black_@2x.png')}/>
                </TouchableOpacity>
                <Text style={[styles.text,{marginRight:20}]}>
                      {title}
                </Text>
                <Text style={styles.text}>{rightTitle?rightTitle:''}</Text>
            </View>
            <View style={styles.separate}/>
          </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      paddingLeft: 5,
      justifyContent:'space-between',
      paddingRight: 5,
      paddingTop:UIConfigure.home.statusBarHeight,
      height: UIConfigure.home.navigationBarHeight,
      backgroundColor: 'white',
      alignItems: 'center'
  },
  separate:{
    height:1,
    backgroundColor:'#A7A7AA',
  },
  text:{
    fontSize:15,
  },
});
