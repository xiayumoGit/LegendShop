'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';

import MainScreenContainer from './MainScreenContainer';
import Constant from './common/Constant';

export default class Splash extends Component {

  constructor(props){
        super(props);
        this.state = {
            count: 2,
        };
  }

  componentDidMount(){
      this.interval = setInterval(
          () => {
              if(this.state.count===1){
                  this._navigatorToHome();
              }else{
                  this.setState({
                      count:this.state.count-1,
                  })
              }
          },
          1000
      );
  }

  componentWillUnmount() {
      this.interval && clearInterval(this.interval);
  }

  _navigatorToHome(){
      this.props.navigator.replace({
          name: '首页',
          component: MainScreenContainer,
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./image/splash.jpg')}
          style={{
            flex: 1,
            width: Constant.window.width,
            height: 1,
          }} />
          <View style={styles.rectStyle}>
              <Text style={{color:'white'}}  onPress={()=>this._navigatorToHome()}>
                  {'点击跳过'+this.state.count+ 's'}
              </Text>
          </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
	container: {
      flex: 1,
      flexDirection: 'column',
    },
    rectStyle: {
      position:'absolute',
      top:30,
      color:'white',
      borderWidth:1,
      borderRadius:5,
      borderColor:'white',
      right:10,
      paddingTop:5,
      paddingBottom:5,
      paddingRight:10,
      paddingLeft:10,
  }
});
