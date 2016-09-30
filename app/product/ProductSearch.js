'use strict';

import React,{ Component,PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TextInput,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import ProductListCell from './ProductListCell';
import Constant from '../common/Constant';
import UIConfigure  from '../common/UIConfigure';

import IndicatorNavigator from '../component/indicatorNavi/IndicatorNavigator';

let defaultTab=Constant.strings.searchTabStringArray;
let orderByKey=Constant.strings.orderByStringArray;

export default class ProductSearch extends Component{

  _onClick() {
    this.props.navigator.pop();
  }

  _tabItemSelected(tabIndex:number){
        const {tabChanged}=this.props;
        tabChanged(tabIndex);
  }

  _renderTab(keyword:String,tabIndex:String){
      return defaultTab.map((item,i)=>{
          let childView = <ProductListCell paramas={'keyword='+keyword + '&' + 'orderBy=' + orderByKey[i]}
                                           navigator={this.props.navigator}/>;
          return (
              <IndicatorNavigator.Item
                  key={i}
                  title={item}
                  selected={tabIndex===i}
                  titleStyle={{color:UIConfigure.home.tabTextColor,fontSize:12}}
                  selectedTitleStyle={{color:UIConfigure.home.tabTextColor,fontSize:12}}
                  bacStyle={{backgroundColor:'white'}}
                  onPress={()=> this._tabItemSelected(i)}
                  selectedBacStyle={{backgroundColor:'#f8f8f8'}}>
                  {childView}
              </IndicatorNavigator.Item>
          )
      });
  }

  render(){
    const{keyword,tabIndex}=this.props;
    return (
      <View style={{flex: 1,backgroundColor:Constant.colors.lightGreyColor}}>
          <View style={styles.container}>
              <TouchableOpacity activeOpacity={0.7} onPress={()=>this._onClick()}>
                  <View >
                      <Image source={require('../image/ic_arrow_back_black_@2x.png')}/>
                  </View>
              </TouchableOpacity>
              <View style={styles.searchBox}>
                  <Image source={require('../image/lib_story_img_search_bt_@2x.png')} style={styles.searchIcon}/>
                  <TextInput
                      keyboardType='web-search'
                      placeholder='搜索...'
                      editable={false}
                      style={styles.inputText}/>
              </View>
          </View>
          <IndicatorNavigator style={styles.pageContainer}
                          sceneStyle={styles.sceneContainer}
                          hidesTabTouch={true}
                          tabBarStyle={styles.tabContainer}>
              {this._renderTab(keyword,tabIndex)}
          </IndicatorNavigator>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      justifyContent:'space-between',
      paddingTop: 20,
      height: 60,
      backgroundColor: 'white',
      alignItems: 'center'
  },
  searchBox: {
      height: 28,
      flexDirection: 'row',
      flex: 1,
      borderRadius: 3,
      backgroundColor: 'white',
      borderWidth:0.5,
      borderColor:'#DEDEDE',
      alignItems:'center',
      marginLeft: 10,
      marginRight: 10,
  },
  scanIcon: {
      height: 17,
      width: 17,
      resizeMode: 'stretch'
  },
  searchIcon: {
      marginLeft: 6,
      marginRight: 6,
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
      backgroundColor: 'transparent',
      fontSize: 12
  },
  selectText:{
      color:Constant.colors.redColor,
      fontSize:14,
  },
  defaultText: {
      fontSize: 14,
      color:'#6E6E6E',
  },
  selectLine:{
      backgroundColor:Constant.colors.redColor,
      height:3,
      marginTop:10,
      width:75,
  },
  defaultLine: {
      backgroundColor:'transparent',
      height:3,
      marginTop:10,
      width:75,
  },
    pageContainer:{
    },
    tabContainer: {
        height: UIConfigure.search.searchTabHeight,
    },
    sceneContainer:{
        paddingTop:60,
    },
});
