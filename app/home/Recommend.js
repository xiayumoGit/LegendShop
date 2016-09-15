'use strict';

import React,{ Component,PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import ProductDetail from '../product/ProductDetail';

const RECOMMEND_IMGS = [
    require('../image/hotprod_banner01_@2x.jpg'),
    require('../image/hotprod_banner02_@2x.jpg'),
    require('../image/hotprod_banner03_@2x.jpg'),
    require('../image/hotprod_banner04_@2x.jpg')
];
 export default class Recommend extends Component {

   constructor(props) {
           super(props);
   }

   _onItemClick(title:string){
       if (this.props.onItemClick) {
           this.props.onItemClick(title);
       }
   }
   _onMoreClick(title:string){
     if (this.props.onMoreClick) {
         this.props.onMoreClick(title);
     }
   }
   _renderItem(data){
     return data.map((item,i)=>{
       return (
           <TouchableOpacity onPress={()=>this._onItemClick('商品详情')} key={i} activeOpacity={0.7}>
             <View style={styles.container1}>
               <Image source={item} style={styles.image}/>
               <Text style={[styles.text1,{marginTop:3}]}>
                 三只松鼠 坚果组合
               </Text>
               <Text style={styles.text1}>
                 夏威夷果碧根果手剥
               </Text>
               <View style={styles.container2}>
                 <Text style={styles.text2}>
                   ¥52.8
                 </Text>
                 <Text style={styles.text3}>
                   ¥52
                 </Text>
               </View>
             </View>
           </TouchableOpacity>
          )
     });
   }
  render() {
    return(
          <View style={styles.parent}>
              <View style={styles.parentContainer}>
                <Text style={styles.title1}>
                  热卖推荐
                </Text>
                <TouchableOpacity onPress={()=>this._onMoreClick('热门推荐')} activeOpacity={0.7}>
                  <Text style={styles.title2}>
                    更多>>
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.container}>
                  {this._renderItem(RECOMMEND_IMGS)}
              </View>
          </View>
      )
  }
}

const styles = StyleSheet.create({
    parent:{
      flex:1,
      padding:5,
      marginTop:8,
      marginBottom:8,
      backgroundColor:'white',
    },
    parentContainer:{
      flex:1,
      paddingTop:3,
      paddingLeft:5,
      paddingRight:5,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    },
    container: {
        flex:1,
        justifyContent:'space-around',
        flexDirection: 'row',
        padding:3,
    },
    container1:{
      borderWidth:0.5,
      borderColor:'#DEDEDE',
      backgroundColor:'#ffff',
      flex:1,
      margin:3,
      padding:3,
    },
    container2:{
      flex:1,
      flexDirection:'row',
      marginTop:3,
      justifyContent:'center',
      alignItems:'center',
    },
    image:{
      width:70,
      height:65,
    },
    text1:{
      color:'#646464',
      fontSize:8
    },
    text2:{
      color:'#FF2640',
      fontSize:8
    },
    text3:{
      marginLeft:3,
      color:'#969696',
      fontSize:8
    },
    title1:{
      color:'#323232',
      fontSize:12
    },
    title2:{
      color:'#1A92E0',
      fontSize:10
    }
});
