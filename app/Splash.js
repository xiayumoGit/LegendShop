'use strict';

import React, { Component,PropTypes } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Image,
  InteractionManager,
  Text,
  Dimensions,
} from 'react-native';

import MainScreenContainer from './MainScreenContainer';
import Constant from './common/Constant';

export default class Splash extends Component {

  constructor(props){
        super(props);
        this.state = {
            count: 3,
        };
  }

  componentDidMount(){
      this.interval = setInterval(
          () => {
              if(this.state.count===1){
                  this.props.navigator.replace({
                      name: '首页',
                      component: MainScreenContainer,
                  });
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

  _goToHome(){
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
          <Text style={styles.text} onPress={()=>this._goToHome()}>
              {'点击跳过'+this.state.count+ 's'}
          </Text>
      </View>
    );
  }
}

let styles = StyleSheet.create({
	container: {
    flex: 1,
    flexDirection: 'column',
  },
  cover: {
    flex: 1,
    width: 200,
    height: 1,
  },
  text: {
      position:'absolute',
      top:30,
      color:'white',
      borderWidth:0.8,
      borderRadius:5,
      borderColor:'white',
      right:10,
      paddingTop:5,
      paddingBottom:5,
      paddingRight:10,
      paddingLeft:10,
  }
});
