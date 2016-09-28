'use strict';

import React, { Component,PropTypes } from 'react';
import {
    View,
    Text,
    Image,
    InteractionManager,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ScrollView,
    TextInput,
    Platform,
} from 'react-native';

import GridSectionListView from './component/verticalNavi/GridSectionListView';
import ProductDetail from './product/ProductDetail';
import SearchProduct from './product/ProductSearch';

import GridNavigator from './component/verticalNavi/GridNavigator';

import Constant from './common/Constant';

import UIConfigure from './common/UIConfigure';

export default class CategoryPage extends Component {

    _onClick(title) {
        let navigator = this.props.navigator;
        navigator.push({
                name: title,
                component: ProductDetail,
                params: {
                     title:title,
                 }
        })
    }
    _onSearchClick(title) {
      let navigator = this.props.navigator;
       navigator.push({
              name: title,
              component: SearchProduct,
              params: {
                   title:title,
               }
       })
    }

    _tabItemSelected(tabIndex:number){
        console.log('tag','tabIndex='+tabIndex);
        const {tabChanged}=this.props;
        tabChanged(tabIndex);
    }

    componentDidMount() {
        const {fetchCategoryResult} =this.props;
        fetchCategoryResult();

    }
    _renderTab(data,tabIndex){

        return data.map((item,i)=>{
            let childView = <GridSectionListView resultDto={this.props.resultDto[i]} navigator={this.props.navigator}/>;
            return (
                <GridNavigator.Item
                    key={i}
                    title = {'title'+i}
                    selected={tabIndex===i}
                    titleStyle={{color:UIConfigure.home.tabTextColor,fontSize:12}}
                    selectedTitleStyle={{color:UIConfigure.home.tabTextColor,fontSize:12}}
                    bacStyle={{backgroundColor:'white'}}
                    onPress={()=> this._tabItemSelected(i)}
                    selectedBacStyle={{backgroundColor:'white'}}>
                    {childView}
                </GridNavigator.Item>
            )
        });
    }
    render() {
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
              <GridNavigator style={styles.pageContainer} sceneStyle={styles.sceneContainer}
                            hidesTabTouch={true} tabBarStyle={styles.tabContainer}>
                  {this._renderTab(this.props.resultDto,this.props.tabIndex)}
              </GridNavigator>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 20,
      height: 60,
      backgroundColor: 'white',
      alignItems: 'center'
  },
  searchBox: {
      height: 28,
      flexDirection: 'row',
      flex: 1,  // 类似于android中的layout_weight,设置为1即自动拉伸填充
      borderRadius: 3,  // 设置圆角边
      backgroundColor: 'white',
      borderWidth:0.5,
      borderColor:'#DEDEDE',
      alignItems:'center',
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
  separate:{
    height:1,
    backgroundColor:'#A7A7AA',
  },
  inputText: {
      flex: 1,
      color:Constant.colors.lightColor,
      backgroundColor: 'transparent',
      fontSize: 10
  },
    pageContainer:{
        flexDirection:'row',
    },
    tabContainer: {
        width: UIConfigure.home.tabBarHeight,
    },

    sceneContainer:{
        paddingLeft:50,
    },
});
