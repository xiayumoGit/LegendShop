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

import Constant from '../common/Constant';

/**
 * 定义统一的退回，对应navigator，布局统一左边箭头，中间文字，右边文字（可能空白）
 */
export default class Back extends Component {

    constructor(props) {
        super(props);
        this._onClick = this._onClick.bind(this);
        this._onRightClick = this._onRightClick.bind(this);
    }

    _onClick() {
        if (this.props._onClick) {
            this.props._onClick();
        }
    }

    _onRightClick() {
        if (this.props._onRightClick) {
            this.props._onRightClick();
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
                <Text style={styles.text}>
                      {title}
                </Text>
                <TouchableOpacity activeOpacity={0.7} onPress={this._onRightClick}>
                    <Text style={[styles.text,{marginRight:15,fontSize:13,
                                color:Constant.colors.lightRedColor}]}>
                        {rightTitle?rightTitle:''}
                    </Text>
                </TouchableOpacity>

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
      paddingTop: Platform.OS === 'ios' ? 20 : 0,
      height: Platform.OS === 'ios' ? 60 : 45,
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
