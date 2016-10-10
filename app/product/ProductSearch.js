'use strict';

import React,{ Component,PropTypes } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import ProductListView from './ProductListView';
import Constant from '../common/Constant';
import UIConfigure  from '../common/UIConfigure';

import IndicatorNavigator from '../component/indicatorNavi/IndicatorNavigator';

let defaultTab=Constant.strings.searchTabStringArray;
let orderByKey=Constant.strings.orderByStringArray;


import ProductSearchContainer1 from '../product/ProductSearch1Container';

export default class ProductSearch extends Component{

  _onBackPress() {
    this.props.navigator.pop();
  }

  _tabItemSelected(tabIndex:number){
        const {tabChanged}=this.props;
        tabChanged(tabIndex);
  }

  _renderTab(parameter:String,tabIndex:number){
      return defaultTab.map((item,i)=>{
          let childView = <ProductListView {...this.props}
              condition={parameter + '&' + 'orderBy=' + orderByKey[i]}
          />;
          return (
              <IndicatorNavigator.Item
                  key={i}
                  title={item}
                  selected={tabIndex===i}
                  titleStyle={{color:UIConfigure.search.searchTabText}}
                  selectedTitleStyle={{color:UIConfigure.home.searchTabSelectedText}}
                  lineStyle={{ backgroundColor:'transparent',height:2,marginTop:10,width:75}}
                  selectLineStyle={{backgroundColor:Constant.colors.redColor,height:2,marginTop:10,width:75}}
                  onPress={()=> this._tabItemSelected(i)}>
                  {childView}
              </IndicatorNavigator.Item>
          )
      });
  }

  componentWillUnmount(){
      const {clearState}=this.props;
      clearState();
  }

   _onSearchClick(title:string) {
        const {navigator} = this.props;
        navigator.push({
            name: title,
            component: ProductSearchContainer1,
            params: {
                title:title,
            }
        })
   }
  render(){
    const{keyword,categoryId,tabIndex}=this.props;
    return (
      <View style={{flex: 1,backgroundColor:UIConfigure.search.defaultBgColor}}>
          <View style={styles.container}>
              <TouchableOpacity activeOpacity={0.7} onPress={()=>this._onBackPress()}>
                  <View >
                      <Image source={require('../image/ic_arrow_back_black_@2x.png')}/>
                  </View>
              </TouchableOpacity>

              <View style={styles.searchBox}>
                  <Image source={require('../image/lib_story_img_search_bt_@2x.png')} style={styles.searchIcon}/>
                  <Text
                      style={styles.inputText} onPress={()=>this._onSearchClick('搜索')}>
                    搜索...
                  </Text>
              </View>

          </View>
          <View style={styles.separate}/>
          <IndicatorNavigator style={styles.pageContainer}
                          sceneStyle={styles.sceneContainer}
                          hidesTabTouch={true}
                          tabBarStyle={styles.tabContainer}>
              {this._renderTab(categoryId?'categoryId='+categoryId:'keyword='+keyword,tabIndex)}
          </IndicatorNavigator>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      justifyContent:'space-between',
      paddingTop:Constant.window.statusBarHeight,
      height: Constant.window.navigatorBarHeight,
      backgroundColor:UIConfigure.search.defaultBgColor,
      alignItems: 'center'
  },
  searchBox: {
      height: UIConfigure.search.searchBoxHeight,
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
      color:UIConfigure.home.searchTextColor,
      backgroundColor: 'transparent',
      fontSize: 12
  },
  pageContainer:{

  },
  tabContainer: {
     height: UIConfigure.search.searchTabHeight,
      justifyContent:'space-around',
    },
  sceneContainer:{
     paddingTop:UIConfigure.search.searchTabHeight,
  },
});
