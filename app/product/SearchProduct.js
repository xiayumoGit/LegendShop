'use strict';

import React,{ Component,PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TextInput,
  ActivityIndicatorIOS,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import Back from '../component/Back';
import ProductListCell from './ProductListCell';
import Constant from '../common/Constant';

let defaultTab=Constant.strings.searchTabString;
let orderByKey=Constant.strings.orderByString;

export default class SearchProduct extends Component{

 constructor(props) {
    super(props);
    this.state={
      keyword:'',
      isLoading:false,
      tabIndex:0,
      orderBy:'buys',
    };

  }
  _onClick() {
    this.props.navigator.pop();
  }

  _onSearch(){
    this.setState({
        isLoading:true,
        orderBy:'buys',
    });
  }

  _onLoading(){
      this.setState({
          isLoading:false,
      });
  }

  _renderTab(){
    if(!this.state.keyword)return;
    let tab = defaultTab.map((item,i)=>{
          return (
            <TouchableOpacity key={i} activeOpacity={0.7} onPress = {()=> this.setState(
              {tabIndex: i,orderBy:orderByKey[i]})}>
              <View style={{alignItems:'center',paddingTop:12}}>
                  <Text style={[styles.defaultText,this.state.tabIndex==i?styles.selectText:null]}>{item}</Text>
                  <View style={[styles.defaultLine,this.state.tabIndex==i?styles.selectLine:null]}/>
              </View>
            </TouchableOpacity>
             )
        });
    return (
          <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:8,backgroundColor:'white'}}>
            {tab}
          </View>
    );
  }

  render(){
    let searchTitle =this.state.isLoading?
      <ActivityIndicatorIOS style={{marginRight:10}}/>:
      <TouchableOpacity activeOpacity={0.7} onPress={()=>this._onSearch()}>
        <Text style={{fontSize:13,marginRight:5}}>
          搜索
        </Text>
      </TouchableOpacity>;
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
                      onEndEditing={(event) =>{
                        console.log('tag','word='+event.nativeEvent.text);
                        this.setState({keyword:event.nativeEvent.text})
                      }
                      }
                      placeholder='搜索...'
                      style={styles.inputText}/>
              </View>
              {searchTitle}
          </View>
          {this._renderTab()}
          <ProductListCell {...this.state} navigator={this.props.navigator}/>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
      flexDirection: 'row',   // 水平排布
      justifyContent:'space-between',
      paddingTop: 20,
      height: 60,
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
});
