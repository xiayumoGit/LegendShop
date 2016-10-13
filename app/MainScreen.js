'use strict';

import React, {Component} from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';

import UIConfigure from './common/UIConfigure';
import TabNavigator from './component/bottomNavi/TabNavigator';
import HomePageContainer from './HomePageContainer';
import CategoryPageContainer from './CategoryPageContainer';
import CartPage from './CartPage';
import MinePage from './MinePage';

export default class MainScreen extends Component {

    componentDidMount() {
        /**
         * 处理一些默认全局加载的比如判断更新等
         */
    }

    _renderTabItem(img, selectedImg, title, childView) {
        const {selectedTab, changeTab} = this.props;
        return (
            <TabNavigator.Item
                title={title}
                selected={selectedTab== title}
                renderIcon={() => <Image style={styles.tabIcon} source={img}/>}
                renderSelectedIcon={() => <Image style={styles.tabIcon} source={selectedImg}/>}
                onPress={() => changeTab(title)}>
                {childView}
            </TabNavigator.Item>
        );
    }

    render() {
        const {navigator}=this.props;
        return (
            <TabNavigator style={styles.pageContainer} sceneStyle={styles.sceneContainer}
                          hidesTabTouch={true} tabBarStyle={styles.tabContainer}>
                {this._renderTabItem(UIConfigure.home.homeNormalIcon, UIConfigure.home.homeFocusIcon,
                    UIConfigure.home.homeString, <HomePageContainer navigator={navigator}/>)}
                {this._renderTabItem(UIConfigure.home.categoryNormalIcon, UIConfigure.home.categoryFocusIcon,
                    UIConfigure.home.categoryString, <CategoryPageContainer navigator={navigator}/>)}
                {this._renderTabItem(UIConfigure.home.cartNormalIcon, UIConfigure.home.cartFocusIcon,
                    UIConfigure.home.cartString, <CartPage navigator={navigator}/>)}
                {this._renderTabItem(UIConfigure.home.mineNormalIcon, UIConfigure.home.mineFocusIcon,
                    UIConfigure.home.mineString, <MinePage navigator={navigator}/>)}
            </TabNavigator>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flexDirection: 'row',
    },
    tabContainer: {
        height: UIConfigure.home.tabBarHeight,
        backgroundColor: UIConfigure.home.defaultBgColor,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        left: 0,
        bottom: 0,
        right: 0,
    },
    sceneContainer: {
        paddingBottom: 50,
    },
    tabIcon: {
        width: UIConfigure.home.tabIconWidth,
        height: UIConfigure.home.tabIconHeight,
        marginTop: 5
    }
});
