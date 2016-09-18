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

import ExpandTab from './component/ExpandTab';
import ProductDetail from './product/ProductDetail';

import Constant from './common/Constant';
import Utils from './common/Utils';

import SearchProduct from './product/ProductSearch';

export default class CategoryPage extends Component {

    constructor(props) {
        super(props);
        this.state={
          load:false,
          dataSource:[],
        };
    }
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
    _onFetchCategoryData(){
      //获取分类数据
      Utils.httpGet(Constant.httpKeys.HOST+Constant.httpKeys.CATEGOTY_API_KEY,
          (response) => {
                  console.log('_onFetchCategoryData success: ' + JSON.stringify(response));
                  this.setState({
                    load: true,
                    dataSource: response,
                  });
            }, (error) => {
                  console.log('_onFetchCategoryData error: ' + error);
                    this.setState({
                      load:false,
                      dataSource:[],
                    });
                    Alert.alert('',error)
            });
    }
    //从网络获取数据
    componentDidMount() {
      console.log('tag','componentDidMount');
      InteractionManager.runAfterInteractions(() => {
        this._onFetchCategoryData();
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
            <ExpandTab originData={this.state.dataSource} onClick={this._onClick.bind(this)}/>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',   // 水平排布
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 20,  // 处理iOS状态栏
      height: 60,   // 处理iOS状态栏
      backgroundColor: 'white',
      alignItems: 'center'  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
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
  }
});
