'use strict';

import { Set } from 'immutable';
import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Badge from './Badge';
import Tab from './Tab';
import TabBar from './TabBar';
import TabNavigatorItem from './TabNavigatorItem';

export default class TabNavigator extends React.Component {
  static propTypes = {
    ...View.propTypes,
    sceneStyle: View.propTypes.style,
    tabBarStyle: TabBar.propTypes.style,
    tabBarShadowStyle: TabBar.propTypes.shadowStyle,
    tabDirection:PropTypes.number,
    hidesTabTouch: PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      renderedSceneKeys: this._updateRenderedSceneKeys(props.children),
    };

    this._renderTab = this._renderTab.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log('tag','componentWillReceiveProps');
    let { renderedSceneKeys } = this.state;
    this.setState({
      renderedSceneKeys: this._updateRenderedSceneKeys(
        nextProps.children,
        renderedSceneKeys,
      ),
    });
  }

  _getSceneKey(item, index): string {
    return `scene-${(item.key !== null) ? item.key : index}`;
  }

  _updateRenderedSceneKeys(children, oldSceneKeys = Set()): Set {
    let newSceneKeys = Set().asMutable();
    React.Children.forEach(children, (item, index) => {
      let key = this._getSceneKey(item, index);
      if (oldSceneKeys.has(key) || item.props.selected) {
        newSceneKeys.add(key);
      }
    });
    return newSceneKeys.asImmutable();
  }

  render() {
    console.log('tag','render');
    /**
     * children是当前TabNavigator的子节点，也就是被创建的四个item
     */
    let { style, children, tabBarStyle, tabBarShadowStyle, sceneStyle, ...props } = this.props;
    let scenes = [];
    /**
     * 遍历四个item获取当前的item设置
     */
    React.Children.forEach(children, (item, index) => {
      let sceneKey = this._getSceneKey(item, index);
      if (!this.state.renderedSceneKeys.has(sceneKey)) {
        return;
      }

      let { selected } = item.props;
      let scene =
        <SceneContainer key={sceneKey} selected={selected} style={sceneStyle}>
          {item}
        </SceneContainer>;

      scenes.push(scene);
    });

    return (
      <View {...props} style={[styles.container, style]}>
        {scenes}
        <TabBar style={tabBarStyle} shadowStyle={tabBarShadowStyle}>
          {React.Children.map(children, this._renderTab)}
        </TabBar>
      </View>
    );
  }

  _renderTab(item) {
    /**
     * 通过选中和未选中来重排tab
     */
    let icon;
    if (item.props.selected) {
      if (item.props.renderSelectedIcon) {
        icon = item.props.renderSelectedIcon();
      } else if (item.props.renderIcon) {
        let defaultIcon = item.props.renderIcon();
        icon = React.cloneElement(defaultIcon, {
          style: [defaultIcon.props.style, styles.defaultSelectedIcon],
        });
      }
    } else if (item.props.renderIcon) {
      icon = item.props.renderIcon();
    }

    let badge;
    if (item.props.renderBadge) {
      badge = item.props.renderBadge();
    } else if (item.props.badgeText) {
      badge = <Badge>{item.props.badgeText}</Badge>;
    }

    let bacStyle=item.props.selected ?item.props.selectedBacStyle:item.props.bacStyle;

    return (
      <Tab
        testID={item.props.testID}
        title={item.props.title}
        bacStyle={bacStyle}
        allowFontScaling={item.props.allowFontScaling}
        titleStyle={[
          item.props.titleStyle,
          item.props.selected ? [
            styles.defaultSelectedTitle,
            item.props.selectedTitleStyle,
          ] : null,
        ]}
        badge={badge}
        onPress={item.props.onPress}
        hidesTabTouch={this.props.hidesTabTouch}>
        {icon}
      </Tab>
    );
  }
}

/**
 * 控制透明度，所以每次都尽心render
 */
class SceneContainer extends React.Component {
  static propTypes = {
    ...View.propTypes,
    selected: PropTypes.bool,
  };

  render() {
    /**
     * 通过选中和未选中来实现当前容器的显示和不显示
     */
    let { selected, ...props } = this.props;
    return (
      <View
        {...props}
        pointerEvents={selected ? 'auto' : 'none'}
        removeClippedSubviews={!selected}
        style={[
          styles.sceneContainer,
          selected ? null : styles.hiddenSceneContainer,
          props.style,
        ]}>
        <StaticContainer shouldUpdate={selected}>
          {this.props.children}
        </StaticContainer>
      </View>
    );
  }
}
/**
 * 做为真正的内容载体，可以根据shouldComponentUpdate来决定是否渲染以及缓存
 */
class StaticContainer extends React.Component {
  static propTypes = {
    shouldUpdate: PropTypes.bool,
  };

  shouldComponentUpdate(nextProps: Object): boolean {
    return false;
  }

  render() {
    let { children } = this.props;
    return children ? React.Children.only(children) : null;
  }
}


let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
  },
  sceneContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  hiddenSceneContainer: {
    overflow: 'hidden',
    opacity: 0,
  },
  defaultSelectedTitle: {
    color: 'rgb(0, 122, 255)',
  },
  defaultSelectedIcon: {
    tintColor: 'rgb(0, 122, 255)',
  },

});

TabNavigator.Item = TabNavigatorItem;
