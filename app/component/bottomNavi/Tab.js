'use strict';

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View,
} from 'react-native';

import Layout from './Layout';

//定义了单个tab组件
export default class Tab extends React.Component {
  static propTypes = {
    testID : PropTypes.string,
    title: PropTypes.string,
    titleStyle: Text.propTypes.style,
    bacStyle:View.propTypes.style,
    badge: PropTypes.element,
    onPress: PropTypes.func,
    hidesTabTouch: PropTypes.bool,
    allowFontScaling: PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
    this._handlePress = this._handlePress.bind(this);
  }

  render() {
    //badge类型是组件
    let { title, badge } = this.props;
    //获取存在的子组件
    let icon = React.Children.only(this.props.children);
    //如果传入属性存在title则提供title组件并返回
    if (title) {
      title =
        <Text
          numberOfLines={1}
          allowFontScaling={!!this.props.allowFontScaling}
          style={[styles.title, this.props.titleStyle]}>
          {title}
        </Text>;
    }

    if (badge) {
      //克隆新的气泡组件并设置样式
      badge = React.cloneElement(badge, {
        style: [styles.badge, badge.props.style],
      });
    }
    //这里返回一个tab的组件
    return (
      <TouchableOpacity
        testID={this.props.testID}
        activeOpacity={this.props.hidesTabTouch ? 1.0 : 0.8}
        onPress={this._handlePress}
        style={[styles.container, this.props.bacStyle]}>
        <View>
          {icon}
          {badge}
        </View>
        {title}
      </TouchableOpacity>
    );
  }

  _handlePress(event) {
    if (this.props.onPress) {
      this.props.onPress(event);
    }
  }
}

let styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
  },
  container: {
    flex: 1,
    backgroundColor:'#130c0e',
    height:50,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  untitledContainer: {
    paddingBottom: 13,
  },
  title: {
    color: '#929292',
    fontSize: 12,
    fontWeight:'bold',
    textAlign: 'center',
    alignSelf: 'stretch',
    marginTop: 2,
    marginBottom: Platform.OS==='ios'?3+ Layout.pixel:3+ Layout.pixel,
  },
});
