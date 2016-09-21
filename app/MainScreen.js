'use strict';

import React, { Component,PropTypes } from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';

import UIConfigure from './common/UIConfigure';
import TabNavigator from './component/tabBar/TabNavigator';
import HomePageContainer from './HomePageContainer';
import CategoryPageContainer from './CategoryPageContainer';
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
                titleStyle={{color:UIConfigure.home.tabTextColor,fontSize:12}}
                selectedTitleStyle={{color:UIConfigure.home.tabTextColor,fontSize:12}}
                bacStyle={{backgroundColor:'white'}}
                selectedBacStyle={{backgroundColor:'white'}}
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
                    {this._renderTabItem(UIConfigure.home.homeNormalIcon, UIConfigure.home.homeFocusIcon,
                        UIConfigure.home.homeString, <HomePageContainer navigator={navigator}/>)}
                    {this._renderTabItem(UIConfigure.home.categoryNormalIcon, UIConfigure.home.categoryFocusIcon,
                        UIConfigure.home.categoryString,<CategoryPageContainer navigator={navigator}/>)}
                    {this._renderTabItem(UIConfigure.home.cartNormalIcon, UIConfigure.home.cartFocusIcon,
                        UIConfigure.home.cartString, <CartPage navigator={navigator}/>)}
                    {this._renderTabItem(UIConfigure.home.mineNormalIcon, UIConfigure.home.mineFocusIcon,
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
        width: 28,
        height: 28,
        resizeMode: 'stretch',
        marginTop: 5
    }
});
