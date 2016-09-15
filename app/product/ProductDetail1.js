
'use strict';

import React,{ Component,PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import Swiper from 'react-native-swiper';
import Constant from '../common/Constant'
import Utils from '../common/Utils'

export default class ProductDetail1 extends Component{

  constructor(props) {
     super(props);
     this.state={
        product:{},
     };
  }
  _onDropUp(){

  }
  componentDidMount(){
   console.log('tag','componentDidMount');
   let data='prodId='+this.props.prodId;

   console.log('tag','商品详情参数＝'+data);

    Utils.httpPostForm(Constant.httpKeys.HOST+Constant.httpKeys.PRODUCT_DETAIL_API_KEY1,data,
        (response) => {
                console.log('_onDetail success: ' + JSON.stringify(response));
                this.setState({
                    product:response
                });

          }, (error) => {
                console.log('_onDetail error: ' + error);
          });

  }
  componentWillReceiveProps(nextProps){
   console.log('tag','componentWillReceiveProps');
  }
  //防止重复渲染
  shouldComponentUpdate(nextProps, nextState){
    console.log('tag','shouldComponentUpdate');
    return true;
  }

  //这里一定要注意，尽量使用对函数进行返回，不要随意使用return，它有时不能终止函数
  _renderImages(){
    let product=this.state.product;
    if(Utils.isEmptyObject(product)){
      return (
            <Image resizeMode={'stretch'} style={styles.image}/>
          )
    }else{
      return product.prodPics.map((item,i)=>{
            return (
                <Image key={i} resizeMode={'stretch'} style={styles.image} source={{uri:Constant.httpKeys.IMAGE_API_HOST+item}}/>
               )
      });
    }
  }

  render() {
    console.log('tag','render');

    return (
      <ScrollView style={{backgroundColor:'white'}}>
        <Swiper style={styles.wrapper} height={Constant.window.width} autoplayTimeout={5}
                paginationStyle={styles.paginationStyle}
                autoplay={true}>
              {this._renderImages()}
        </Swiper>
        <View style={styles.separate}/>

        <TouchableOpacity activeOpacity={0.7} onPress = {()=>this._onDropUp()}>
          <View style={{backgroundColor:'white'}}>
              <View style={styles.nameContainer}>
                <Text style={styles.nameText}>{this.state.product.name}</Text>
                <Image style={{marginLeft:10,marginRight:10}} source={require('../image/icon_advance_gray_@2x.png')}/>
              </View>
          </View>
        </TouchableOpacity>

         <View style={{padding: 10}}>
              <Text style={styles.priceText}>{'¥'+this.state.product.price}</Text>
         </View>

        <View style={styles.separate}/>

        <TouchableOpacity activeOpacity={0.7} onPress = {()=>this._onDropUp()}>
          <View style={{backgroundColor:'white'}}>
              <View style={styles.nameContainer}>
                <View style={styles.cellContainer}>
                  <Text style={[styles.defaultText,{color:Constant.colors.lightBlackColor}]}>已选</Text>
                  <Text style={[styles.defaultText,{marginLeft:10}]}>黑色,一件</Text>
                </View>
                <Image style={{marginLeft:10,marginRight:10}} source={require('../image/icon_advance_gray_@2x.png')}/>
              </View>
          </View>
        </TouchableOpacity>

        <View style={styles.separate}/>

        <TouchableOpacity activeOpacity={0.7} onPress = {()=>this._onDropUp()}>
          <View style={{backgroundColor:'white'}}>
              <View style={styles.nameContainer}>
                <View style={styles.cellContainer}>
                    <Text style={[styles.defaultText,{color:Constant.colors.lightBlackColor}]}>送至</Text>
                    <Text style={[styles.defaultText,{marginLeft:10}]}>广东>广州市>白云区</Text>
                </View>
                <Image style={{marginLeft:10,marginRight:10}} source={require('../image/icon_advance_gray_@2x.png')}/>
              </View>
          </View>
        </TouchableOpacity>

      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex:1,
    backgroundColor:'white',
  },
  paginationStyle:{
    bottom: 5,
  },
  image:{
    width:Constant.window.width,
    height:Constant.window.width,
  },
  separate:{
    height:0.5,
    backgroundColor:'#F0F0F0',
  },
  nameText:{
    width:Constant.window.width-40,
    fontSize:15
  },
  nameContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    padding:10,
  },
  cellContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  priceText:{
    fontSize:15,
    backgroundColor:'white',
    color:Constant.colors.redColor,
  },
  defaultText:{
    fontSize:13,
  },

});
