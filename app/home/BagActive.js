'use strict';

import React,{ Component,PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';

import ProductSearchContainer from '../product/ProductSearchContainer';
import ProductDetailContainer from '../product/ProductDetailContainer';

import Constant from '../common/Constant';

 export default class BagActive extends Component {

     _itemPress(title:string,prodId:number) {
         InteractionManager.runAfterInteractions(() => {
             const {navigator} = this.props;
             navigator.push({
                 name: title,
                 component: ProductDetailContainer,
                 params: {
                     title:title,
                     prodId:prodId,
                 }
             })
         });
     }
     _morePress(title:string,categoryId:string) {
         InteractionManager.runAfterInteractions(() => {
             const {navigator} = this.props;
             navigator.push({
                 name: title,
                 component: ProductSearchContainer,
                 params: {
                     title:title,
                     categoryId:categoryId,
                 }
             })
         });
     }

     _getCategoryId(url:string){
         let array=url.split('=');
         return array[array.length-1];
     }

     render() {
        const {resultDto} =this.props;
        return(
              <View style={styles.parent}>
                  <View style={styles.container}>
                    <Text style={styles.title1}>
                        {resultDto.mobileFloorList[0].name}
                    </Text>
                    <TouchableOpacity onPress={()=>this._morePress('搜索',this._getCategoryId(resultDto.mobileFloorList[0].url))} activeOpacity={0.7}>
                      <Text style={styles.title2}>
                        更多>
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.separate,{marginTop:3}]}/>
                  <View style={{flex:1,flexDirection:'row'}}>
                      <View style={{flex:1}}>
                        <TouchableOpacity onPress={()=>this._itemPress('商品详情',resultDto.mobileFloorList[0].floorItemList[0].linkPath)} activeOpacity={0.7}>
                          <Image source={{uri:Constant.httpKeys.IMAGE_API_HOST+resultDto.mobileFloorList[0].floorItemList[0].pic}} style={styles.image2}/>
                        </TouchableOpacity>
                      </View>
                    <View style={styles.separate1}/>
                    <View style={{flex:1}}>
                      <TouchableOpacity onPress={()=>this._itemPress('商品详情',resultDto.mobileFloorList[0].floorItemList[1].linkPath)} activeOpacity={0.7}>
                        <Image source={{uri:Constant.httpKeys.IMAGE_API_HOST+resultDto.mobileFloorList[0].floorItemList[1].pic}} style={styles.image1}/>
                      </TouchableOpacity >
                      <View style={styles.separate}/>
                      <TouchableOpacity onPress={()=>this._itemPress('商品详情',resultDto.mobileFloorList[0].floorItemList[2].linkPath)} activeOpacity={0.7}>
                        <Image source={{uri:Constant.httpKeys.IMAGE_API_HOST+resultDto.mobileFloorList[0].floorItemList[2].pic}} style={styles.image1}/>
                      </TouchableOpacity >
                    </View>
                  </View>
              </View>
            )
  }
}

const styles = StyleSheet.create({
    parent:{
      padding:5,
      marginTop:8,
      backgroundColor:'white',
    },
    container: {
      padding:5,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    },
    container1:{
      flexDirection:'row',
      padding:3,
    },
    separate:{
      height:0.5,
      backgroundColor:'#F0F0F0',
    },
    separate1:{
      height:Constant.window.width/2,
      width:0.5,
      backgroundColor:'#F0F0F0',
    },
    image1:{
      width:Constant.window.width/2,
      resizeMode:'cover',
      height:Constant.window.width/4,
    },
    image2:{
      width:Constant.window.width/2,
      resizeMode:'cover',
      height:Constant.window.width/2,
    },
    title1:{
      color:'#323232',
      fontSize:15
    },
    title2:{
      color:'#1A92E0',
      fontSize:12
    }
});
