'use strict';

import React, { Component,PropTypes } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View
} from 'react-native';

import TabNavigator from './component/navigator/TabNavigator';
import HomePage from './HomePage';
import CategoryPage from './CategoryPage';
import CartPage from './CartPage';
import MinePage from './MinePage';

const HOME = '首页';
const HOME_NORMAL = require('./image/icon_main_index_my_home_@2x.png');
const HOME_FOCUS = require('./image/icon_main_index_my_home_@2x.png');
const CATEGORY = '分类';
const CATEGORY_NORMAL = require('./image/icon_main_index_my_class_@2x.png');
const CATEGORY_FOCUS = require('./image/icon_main_index_my_class_@2x.png');
const CART = '购物车';
const CART_NORMAL = require('./image/icon_main_index_my_cart_@2x.png');
const CART_FOCUS = require('./image/icon_main_index_my_cart_@2x.png');
const PERSONAL = '我的';
const PERSONAL_NORMAL = require('./image/icon_main_index_my_mine_@2x.png');
const PERSONAL_FOCUS = require('./image/icon_main_index_my_mine_@2x.png');

//首页配置，各组件导入
export default class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {selectedTab: HOME}
    }

    componentDidMount(){
    }

    //根据需求定制tab
    _renderTabItem(img,selectedImg,title,childView) {
        return (
            <TabNavigator.Item
                title = {title}
                selected={this.state.selectedTab === title}
                titleStyle={{color:'white',fontSize:12}}
                selectedTitleStyle={{color:'white',fontSize:12}}
                bacStyle={{backgroundColor:'#323232'}}
                selectedBacStyle={{backgroundColor:'#FF2640'}}
                renderIcon={() => <Image style={styles.tabIcon} source={img}/>}
                renderSelectedIcon={() => <Image style={styles.tabIcon} source={selectedImg}/>}
                onPress={() => this.setState({ selectedTab: title })}>
                {childView}
            </TabNavigator.Item>
        );
    }

    render() {
        let {navigator}=this.props;
        return (
                <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
                    {this._renderTabItem(HOME_NORMAL, HOME_FOCUS, HOME, <HomePage navigator={navigator}/>)}
                    {this._renderTabItem(CATEGORY_NORMAL, CATEGORY_FOCUS, CATEGORY,<CategoryPage navigator={navigator}/>)}
                    {this._renderTabItem(CART_NORMAL, CART_FOCUS, CART, <CartPage navigator={navigator}/>)}
                    {this._renderTabItem(PERSONAL_NORMAL, PERSONAL_FOCUS, PERSONAL,<MinePage navigator={navigator}/>)}
                </TabNavigator>
        );
    }
}

const styles = StyleSheet.create({
    tab: {
        height: 50,
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
