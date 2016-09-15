'use strict';

import React,{ Component,PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Back from '../component/Back';
import ProductListCell from './ProductListCell';
import Constant from '../common/Constant';

let defaultTab=Constant.strings.searchTabString;
let orderByKey=Constant.strings.orderByString;

export default class ProductList extends Component{

  constructor(props) {
     super(props);
     this.state={
       tabIndex:0,
       keyword:this.props.keyword,
       orderBy:'buys',
     };

   }
   _onClick() {
     this.props.navigator.pop();
   }

   _onLoading(){

   }

   _renderTab(){
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
    //要注意直接被引用的组建应当把navigater传递进去
    return (
      <View style={{flex: 1}}>
          <Back title={this.props.title} onClick={()=>this._onClick()}/>
          {this._renderTab()}
          <ProductListCell {...this.state} navigator={this.props.navigator}/>
      </View>
    );
  }
}

let styles = StyleSheet.create({
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
