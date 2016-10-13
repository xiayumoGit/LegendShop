'use strict';

/**
 *  LegendShop入口文件，导入Root
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import Root from './app/Root';

/**
 * 关闭警告提示
 * @type {boolean}
 */
console.disableYellowBox = true;

console.warn('警告部分不再提示');

AppRegistry.registerComponent('LegendShop', () => Root);
