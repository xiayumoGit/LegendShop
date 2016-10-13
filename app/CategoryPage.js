'use strict';

import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Platform,
    StyleSheet,
    ScrollView,
    TextInput,
} from 'react-native';

import GridSectionListView from './component/verticalNavi/GridSectionListView';
import ProductSearchContainer1 from './product/ProductSearch1Container';
import GridNavigator from './component/verticalNavi/GridNavigator';
import Constant from './common/Constant';
import UIConfigure from './common/UIConfigure';

export default class CategoryPage extends Component {

    _onSearchClick(title) {
        let navigator = this.props.navigator;
        navigator.push({
            name: title,
            component: ProductSearchContainer1,
            params: {
                title: title,
            }
        })
    }

    _tabItemSelected(tabIndex: number) {
        const {tabChanged}=this.props;
        tabChanged(tabIndex);
    }

    componentDidMount() {
        const {fetchCategoryResult} =this.props;
        fetchCategoryResult();

    }

    _renderTab(data, tabIndex) {
        return data.map((item, i)=> {
            let childView = <GridSectionListView resultDto={item} navigator={this.props.navigator}/>;
            return (
                <GridNavigator.Item
                    key={i}
                    title={item.name}
                    selected={tabIndex===i}
                    titleStyle={{color:UIConfigure.home.tabTextColor,fontSize:12}}
                    selectedTitleStyle={{color:UIConfigure.home.tabTextColor,fontSize:12}}
                    bacStyle={{backgroundColor:'white'}}
                    onPress={()=> this._tabItemSelected(i)}
                    selectedBacStyle={{backgroundColor:'#f8f8f8'}}>
                    {childView}
                </GridNavigator.Item>
            )
        });
    }

    render() {
        const {resultDto, tabIndex}=this.props;
        let content = resultDto.length > 0 ?
            <GridNavigator style={styles.pageContainer}
                           sceneStyle={styles.sceneContainer}
                           hidesTabTouch={true}
                           tabBarStyle={styles.tabContainer}>
                {this._renderTab(resultDto, tabIndex)}
            </GridNavigator> :
            <ActivityIndicator size={Platform.OS ==='ios'?'small':'large'} style={styles.scrollSpinner}/>;
        return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.searchBox}>
                        <Image source={require('./image/lib_story_img_search_bt_@2x.png')} style={styles.searchIcon}/>
                        <Text
                            onPress={()=>this._onSearchClick('搜索')}
                            style={styles.inputText}>
                            搜索...
                        </Text>
                    </View>
                </View>
                <View style={styles.separate}/>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: Constant.window.statusBarHeight,
        height: Constant.window.navigatorBarHeight,
        backgroundColor: UIConfigure.category.defaultBgColor,
        alignItems: 'center'
    },
    searchBox: {
        height: UIConfigure.category.categorySearchBoxHeight,
        flexDirection: 'row',
        flex: 1,
        borderRadius: 3,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: '#DEDEDE',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
    scanIcon: {
        height: 17,
        width: 17,
        resizeMode: 'stretch'
    },
    searchIcon: {
        marginLeft: 6,
        marginRight: 3,
        width: 10,
        height: 10,
        resizeMode: 'stretch'
    },
    separate: {
        height: 1,
        backgroundColor: '#A7A7AA',
    },
    inputText: {
        flex: 1,
        color: Constant.colors.lightColor,
        backgroundColor: 'transparent',
        fontSize: 10
    },
    pageContainer: {
        flexDirection: 'row',
    },
    tabContainer: {
        width: UIConfigure.category.categoryTabWidth,
    },
    sceneContainer: {
        paddingLeft: UIConfigure.category.categoryTabWidth,
    },
    scrollSpinner: {
        marginVertical: 20,
    },
});
