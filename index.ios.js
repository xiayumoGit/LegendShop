'use strict';

import React, { Component } from 'react';
import {
    AppRegistry,
    Navigator,
    Alert,
} from 'react-native';

/**
 * 关闭警告提示
 * @type {boolean}
 */
console.disableYellowBox = true;
console.warn('警告部分不再提示');

import Splash from './app/Splash';


/**
 * app启动页，连接原生
 */
export default class LegendShop extends Component {

  componentDidMount(){

  }

  /**
   * 定义全局路由，路由的转换方式以及换场动画
   * @returns {XML}
   */
  render() {
    let defaultName = 'Splash';
    let defaultComponent = Splash;
    return (
        <Navigator
            initialRoute={{ name: defaultName, component: defaultComponent }}
            renderScene={(route, navigator) => {
        let Component = route.component;
        return <Component {...route.params} navigator={navigator} />
      }} />
    );
  }
}
AppRegistry.registerComponent('LegendShop', () => LegendShop);
