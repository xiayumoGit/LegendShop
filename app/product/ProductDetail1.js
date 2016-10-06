'use strict';

import React,{ Component,PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
  View,
} from 'react-native';

import Carousel from 'react-native-swiper';
import Constant from '../common/Constant'

export default class ProductDetail1 extends Component{

  componentDidMount(){
      const{fetchDetailResult,loadingStatuses,tabIndex,prodId}=this.props;
      fetchDetailResult('prodId='+prodId,loadingStatuses,tabIndex);

  }

  _renderCarousel(data:Array){
      return data.map((item,i)=>{
            return (
                <Image key={i} resizeMode={'stretch'} style={styles.image}
                       source={{uri:Constant.httpKeys.IMAGE_API_HOST+item}}/>
               )
      });
  }

  render() {
      const {loadingStatuses,tabIndex,resultDto}=this.props;
      let content;
      switch (loadingStatuses[tabIndex]) {
          case 0:
              content = <ActivityIndicator style={styles.scrollSpinner}/>;
              break;
          case 1:
              content=<ScrollView style={{backgroundColor:'white'}}>
                  <Carousel style={styles.wrapper} height={Constant.window.width} autoplayTimeout={5}
                          paginationStyle={styles.paginationStyle}
                          autoplay={true}>
                      {this._renderCarousel(resultDto.prodPics)}
                  </Carousel>
                  <View style={styles.separate}/>
                  <TouchableOpacity activeOpacity={0.7}>
                      <View style={{backgroundColor:'white'}}>
                          <View style={styles.nameContainer}>
                              <Text style={styles.nameText}>{resultDto.name}</Text>
                              <View style={styles.separate1}/>
                              <Image style={{marginLeft:10,width:20,height:20,marginRight:10}}
                                     source={require('./img/share.png')}/>
                          </View>
                      </View>
                  </TouchableOpacity>

                  <View style={styles.separate}/>

                  <View style={{padding: 10}}>
                      <Text style={styles.priceText}>{'¥'+resultDto.price}</Text>
                  </View>

                  <View style={styles.separate}/>

                  <TouchableOpacity activeOpacity={0.7}>
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
                  <TouchableOpacity activeOpacity={0.7}>
                      <View style={{backgroundColor:'white'}}>
                          <View style={styles.nameContainer}>
                              <View style={styles.cellContainer}>
                                  <Text style={[styles.defaultText,{color:Constant.colors.lightBlackColor}]}>送至</Text>
                                  <Text style={[styles.defaultText,{marginLeft:10}]}></Text>
                              </View>
                          </View>
                      </View>
                  </TouchableOpacity>
              </ScrollView>;
              break;
          case -1:
              content = <View style={styles.noContent}>
                  <Text style={{fontSize:15}}>
                      暂无内容
                  </Text>
              </View>;
              break;
      }
      return (
          <View style={{flex:1}}>
              {content}
          </View>

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
  scrollSpinner: {
     marginVertical: 30,
   },
  separate:{
    height:0.5,
    backgroundColor:'#F0F0F0',
  },
  separate1:{
    width:1,
    marginLeft:10,
    height:30,
    backgroundColor:Constant.colors.darkGreyColor1,
  },
  nameText:{
    width:Constant.window.width-60,
    fontSize:16
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

  noContent:{
    flex:1,
    flexDirection:'row',
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
  },
});
