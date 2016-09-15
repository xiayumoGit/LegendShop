
'use strict';

import React,{ Component,PropTypes } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import Back from '../component/Back';
import OrderProductCell from './OrderProductCell';

//购物车测试数据
const ORDER_DATAS=[
 {title:'汉密尔顿(Hamiliton)旗舰店',content:[
    {img:require('../image/cart_banner.jpg'),name:'汉密尔顿(Hamiliton)卡其海军先锋系列 自动机械男表h88475345',
    num:'x1',price:'¥5599.00'},
    {img:require('../image/cart_banner.jpg'),name:'汉密尔顿(Hamiliton)卡其海军先锋系列 自动机械男表adsfasdf',
    num:'x1',price:'125555.00'}]
 },
 {title:'百达翡丽独家直营店',content:[
    {img:require('../image/cart_banner.jpg'),name:'百达翡丽(Hamiliton)卡其海军先锋系列 自动机械男表h88475345',
    num:'x1',price:'1256000.00'},]
 },
];

export default class OrderCommit extends Component{

  constructor(props) {
     super(props);
     this.state={

     };
     this._onClick=this._onClick.bind(this);
  }

  _onClick() {
      this.props.navigator.pop();
  }

  _onPayClick(){

  }
  _onCartClick(){

  }
  _onFollowClick(){

  }

  _renderSection(data){
      return data.map((item,i)=>{
        return (
          <View key={i}>
            <Text style={[styles.text,{backgroundColor:'white',padding:10}]}>{item.title}</Text>
              <View style={styles.separate}/>
              {this._renderRow(item.content)}
          </View>
          )
      });
  }
  _renderRow(data){
     return data.map((item,i)=>{
        return (
          <View key={i}>
            <OrderProductCell
              onHighlight={() => highlightRowFunc(sectionID, rowID)}
              onUnhighlight={() => highlightRowFunc(null, null)}
              product={item}/>
            <View style={styles.separate}/>
          </View>
        )
      });
  }

  render() {

    return (
      <View style={{flex: 1,backgroundColor:'#F1F2F6',}}>
          <Back title={this.props.title} onClick={this._onClick}/>
          <ScrollView>
              <View style={styles.container}>
                <View>
                  <View style={{flexDirection:'row'}}>
                      <View style={styles.container2}>
                          <Image source={require('./img/icon_name.png')} style={styles.icon}/>
                          <TextInput
                              keyboardType='web-search'
                              placeholder='姓名'
                              style={styles.inputText}/>
                      </View>
                      <View style={styles.container2}>
                        <Image source={require('./img/icon_phone.png')} style={styles.icon}/>
                        <TextInput
                            keyboardType='web-search'
                            placeholder='电话'
                            style={styles.inputText}/>
                      </View>
                  </View>

                  <View style={[styles.container2,{width:300,marginTop:18,}]}>
                      <Image source={require('./img/icon_add.png')} style={styles.icon}/>
                      <TextInput
                          keyboardType='web-search'
                          placeholder='地址'
                          style={styles.inputText}/>
                  </View>
                </View>
                <Image source={require('./img/icon_advance_gray.png')} style={styles.icon}/>
              </View>

              <View style={styles.container1}>
                  <Text style={styles.text}>新建收货地址</Text>
              </View>

              <View style={{marginTop:8}}>{this._renderSection(ORDER_DATAS)}</View>

              <View style={[styles.container3,{justifyContent:'space-between'}]}>
                <Text style={styles.text}>配送方式</Text>
                <Text style={styles.text}>商家承担运费</Text>
              </View>

              <View style={[styles.container3,{justifyContent:'space-between'}]}>
                <Text style={styles.text}>快递选择</Text>
                <Text style={styles.text}>顺丰快递</Text>
              </View>

              <View style={styles.container3}>
                <Text style={styles.text}>支付方式</Text>
              </View>
              <View style={styles.separate}/>
              <View style={[styles.container3,{marginTop:0}]}>
                <Text style={styles.text}>微信支付</Text>
                <Image source={require('./img/icon_weixin_pay.jpg')} style={[styles.icon,{marginLeft:5}]}/>
              </View>

              <View style={styles.container3}>
                <Text style={styles.text}>发票信息</Text>
              </View>
              <View style={styles.separate}/>
              <View style={[styles.container3,{marginTop:0}]}>
                <Text style={styles.text}>发票类型:普通发票(纸质)</Text>
              </View>
              <View style={styles.separate}/>
              <View style={[styles.container3,{marginTop:0}]}>
                <Text style={styles.text}>发票抬头:某某科技有限公司</Text>
              </View>
              <View style={styles.separate}/>
              <View style={[styles.container3,{marginTop:0}]}>
                <Text style={styles.text}>发票类型</Text>
              </View>
              <View style={styles.separate}/>

              <View style={[styles.container3,{paddingTop:5,paddingBottom:5}]}>
                <Text style={styles.text}>商品总额：</Text>
                <Text style={[styles.text,{color:'#FF0000'}]}>¥98.05</Text>
              </View>
              <View style={[styles.container3,{paddingLeft:25,paddingTop:5,paddingBottom:5,marginTop:0}]}>
                <Text style={styles.text}>运费：</Text>
                <Text style={[styles.text,{color:'#FF0000'}]}>¥18.00</Text>
              </View>
          </ScrollView>

          <View  style={styles.bottom}>
            <TouchableOpacity activeOpacity={0.7}>
              <View style={styles.bottomContainer1}>
                  <Text style={[styles.text,{color:'white',marginLeft:5}]}>实际支付金额：¥25.90</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.bottomContainer1}>
              <TouchableOpacity onPress={()=>this._onCartClick('提交订单')} activeOpacity={0.7}>
                <Text style={[styles.bottomText,{backgroundColor:'#FF0000'}]}>提交订单</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    padding:10,
    marginTop:8,
    flex:1,
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
  },
  container1:{
    flexDirection:'row',
    backgroundColor:'white',
    alignItems:'center',
    padding:11,
    marginTop:8,
    justifyContent:'center',
  },
  container2:{
    height: 12,
    flexDirection: 'row',
    width:100,
    flex: 1,  // 类似于android中的layout_weight,设置为1即自动拉伸填充
    alignItems:'center',
  },
  container3:{
    marginTop:8,
    padding:10,
    backgroundColor:'white',
    flexDirection:'row',
    flex: 1,  // 类似于android中的layout_weight,设置为1即自动拉伸填充
    alignItems:'center',
  },
  separate:{
    height:0.5,
    backgroundColor:'#F0F0F0',
  },
  icon:{
    width:18,
    height:18,
    marginRight:5,

  },
  text:{
    fontSize:13,
  },
  inputText: {
      flex: 1,
      backgroundColor: 'transparent',
      fontSize: 13,
  },
  bottom:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height:50,
    backgroundColor:'#808080',
  },
  bottomContainer1:{
    flexDirection:'row',
    alignItems:'center',
    padding:10,
  },
  bottomText:{
    color:'white',
    fontSize:13,
    paddingLeft:22,
    borderRadius:2,
    paddingRight:22,
    paddingTop:11,
    paddingBottom:11,
  },
});
