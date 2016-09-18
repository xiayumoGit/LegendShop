'use strict';

import React, { Component,PropTypes } from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';

import UIConfigure from './common/UIConfigure';
import TabNavigator from './component/navigator/TabNavigator';
import HomePage from './HomePage';
import CategoryPage from './CategoryPage';
import CartPage from './CartPage';
import MinePage from './MinePage';

export default class MainScreen extends Component {

    componentDidMount(){

    }

    _renderTabItem(img,selectedImg,title,childView) {

        const {selectedTab, changeTab} = this.props;
        return (
            <TabNavigator.Item
                title = {title}
                selected={selectedTab== title}
                titleStyle={{color:'white',fontSize:12}}
                selectedTitleStyle={{color:'white',fontSize:12}}
                bacStyle={{backgroundColor:'#323232'}}
                selectedBacStyle={{backgroundColor:'#FF2640'}}
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
                <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
                    {this._renderTabItem(UIConfigure.home.home_normal_icon, UIConfigure.home.home_focus_icon,
                        UIConfigure.home.homeString, <HomePage navigator={navigator}/>)}
                    {this._renderTabItem(UIConfigure.home.category_normal_icon, UIConfigure.home.category_focus_icon,
                        UIConfigure.home.categoryString,<CategoryPage navigator={navigator}/>)}
                    {this._renderTabItem(UIConfigure.home.cart_normal_icon, UIConfigure.home.cart_focus_icon,
                        UIConfigure.home.cartString, <CartPage navigator={navigator}/>)}
                    {this._renderTabItem(UIConfigure.home.mine_normal_icon, UIConfigure.home.mine_focus_icon,
                        UIConfigure.home.mineString,<MinePage navigator={navigator}/>)}
                </TabNavigator>
        );
    }
}

const styles = StyleSheet.create({
    tab: {
        height: UIConfigure.home.tabBarHeight,
        backgroundColor: '#333333',
        alignItems: 'center',
    },
    tabIcon: {
        width: 20,
        height: 20,
        resizeMode: 'stretch',
        marginTop: 5
    }
});
