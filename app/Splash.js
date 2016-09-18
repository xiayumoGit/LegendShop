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

import Animated from 'Animated';
import MainScreenContainer from './MainScreenContainer';
import Constant from './common/Constant';


export default class Splash extends Component {

  constructor(props){
        super(props);
        this.state = {
            bounceValue: new Animated.Value(1),
        };
  }

  componentDidMount(){
    this.state.bounceValue.setValue(1);
    Animated.timing(
      this.state.bounceValue,
      {
        toValue: 1.2,
        duration: 1000, 
      }
    ).start();

      InteractionManager.runAfterInteractions(() => {
          this.props.navigator.replace({
            name: '首页',
            component: MainScreenContainer,
            });
      });
  }

  render() {

    return (
      <View style={styles.container}>
        <Animated.Image
          source={require('./image/splash.jpg')}
          style={{
            flex: 1,
            width: Constant.window.width,
            height: 1,
            transform: [
              {scale: this.state.bounceValue},
            ]
          }} />
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
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    backgroundColor: 'transparent',
  }
});
