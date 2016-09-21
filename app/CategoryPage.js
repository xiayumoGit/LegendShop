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

// import ExpandTab from './component/ExpandTab';

import LeftRightTab from './component/LeftRightTab';
import ProductDetail from './product/ProductDetail';
import SearchProduct from './product/ProductSearch';

import Constant from './common/Constant';

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

    componentDidMount() {
        const {fetchCategoryResult} =this.props;
        fetchCategoryResult();

    }
    render() {

        const {resultDto} =this.props;
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
            <LeftRightTab {...this.props} onClick={this._onClick.bind(this)}/>
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
