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
import Login from './login/Login';
import MineContent from './mine/MineContent';

import Constant from './common/Constant';

export default class MinePage extends Component {

    constructor(props) {
        super(props);

    }
    _onSettingClick(title:string) {
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
                  <TouchableOpacity activeOpacity={0.7} onPress={()=>this._onSettingClick('登录')}>
                  <Image style={{width:25,height:25,marginLeft:10}} source={require('./mine/img/icon_setting.png')}/>
                  </TouchableOpacity>
                  <Text style={[styles.titleText,{marginRight:20}]}>
                      个人中心
                  </Text>
                  <Text style={styles.titleText}></Text>
              </View>
              <View style={styles.separate}/>
              <ScrollView >
                  <View>
                      <View  style={{position:'absolute',backgroundColor:'transparent',height:150}}>
                          <Image resizeMode='cover' source={require('./image/mine_bg.jpg')}/>
                          <View style={{backgroundColor: 'black',bottom:0,
                         position:'absolute',width:Constant.window.width,
                         opacity: 0.1,height:50}}/>
                      </View>
                      <TopInfo/>
                  </View>
                  <MineContent/>
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
      justifyContent:'space-between',
      paddingTop:Constant.window.statusBarHeight,
      height: Constant.window.navigatorBarHeight,
      backgroundColor: 'white',
      alignItems: 'center'
  },

  separate:{
     height:1,
     backgroundColor:'#A7A7AA',
  },
  container1:{
     flex:1,
     justifyContent:'center',
     alignItems: 'center',
     backgroundColor:'#F1F2F6',
  },
  back:{
    width:15,
    height:12,
  },
  titleText:{
    fontSize:15,
  },
});
