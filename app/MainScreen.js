'use strict';

import React, { Component,PropTypes } from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';

import UIConfigure from './common/UIConfigure';
import TabNavigator from './component/bottomNavi/TabNavigator';
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
                <TabNavigator style={styles.pageContainer} sceneStyle={styles.sceneContainer}
                              hidesTabTouch={true} tabBarStyle={styles.tabContainer}>
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
    pageContainer:{
        flexDirection:'row',
    },
    tabContainer: {
        height: UIConfigure.home.tabBarHeight,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#333333',
        alignItems: 'center',
        left:0,
        bottom:0,
        right:0,
    },
    sceneContainer:{
        paddingBottom:50,
    },

    tabIcon: {
        width: 28,
        height: 28,
        resizeMode: 'stretch',
        marginTop: 5
    }
});
