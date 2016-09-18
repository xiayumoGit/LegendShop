'use strict';

import React, { Component,PropTypes } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Platform,
    Dimensions,
} from 'react-native';

import TopInfo from './mine/TopInfo';
import MyMenu from './mine/MyMenu';
import MyItem from './mine/MyItem';
import Login from './login/Login';

const WINDOW_WIDTH = Platform.OS==='ios'?Dimensions.get('window').width:Dimensions.get('screen').width;

export default class MinePage extends Component {

    constructor(props) {
        super(props);

    }
    _onClick() {

    }
    _onLoginClick(title:string) {
       let navigator = this.props.navigator;
        navigator.push({
               name: title,
               component: Login,
               params: {
                    title:title,
                }
        })
    }
    render() {
        return (
          <View style={{flex: 1}}>
              <View style={styles.container}>
                  <Text style={styles.titleText}>
                    我的
                  </Text>
              </View>
              <View style={styles.separate}/>
              <ScrollView style={styles.container1}>
                      <Image  source={require('./image/mine_bg.jpg')} style={styles.backgroundImage}/>
                      <TopInfo _onLoginClick={this._onLoginClick.bind(this)}/>
                      <MyMenu/>
                      <MyItem/>
              </ScrollView>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',   // 水平排布
      paddingLeft: 5,
      paddingRight: 5,
      justifyContent:'center',
      paddingTop:20,  // 处理iOS状态栏
      height: 60,   // 处理iOS状态栏
      backgroundColor: 'white',
      alignItems: 'center'  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
  },
  container1:{
    backgroundColor:'#F1F2F6',
  },
  separate:{
    height:1,
    backgroundColor:'#A7A7AA',
  },
  back:{
    width:15,
    height:12,
  },
  backgroundImage:{
    position:'absolute',
    height:105,
    width:WINDOW_WIDTH,
  },
  titleText:{
    fontSize:15,
  },
});
