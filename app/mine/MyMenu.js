
'use strict';

import React,{ Component,PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import MenuButton from '../component/MenuButton';

const ITEMS = [[{
  img : require('./img/icon_mine_order_1.png'),
  txt : '待付款',
},{
  img : require('./img/icon_mine_order_2.png'),
  txt : '待发货',
},{
  img : require('./img/icon_mine_order_3.png'),
  txt : '待收货',
},{
  img : require('./img/icon_mine_order_4.png'),
  txt : '退款/售后',
}
],[{
  img : require('./img/icon_my_balance.png'),
  txt : '我的金额',
},{
  img : require('./img/icon_my_coupon.png'),
  txt : '我的金券',
},{
  img : require('./img/icon_red_packets.png'),
  txt : '我的红包',
},{
  img : require('./img/icon_my_integral.png'),
  txt : '我的积分',
}
],[{
  img : require('./img/icon_my_fans.png'),
  txt : '我的粉丝',
},{
  img : require('./img/icon_fans_order.png'),
  txt : '粉丝订单',
},{
  img : require('./img/icon_share_profit.png'),
  txt : '分享收益',
},{
  img : require('./img/icon_share_products.png'),
  txt : '分享产品',
}
]];

const TEXTS= [{title:'我的订单',content:'查看全部订单>>',img:require('./img/icon_my_order.png')},
              {title:'我的钱包',content:'查看详情>>',img:require('./img/icon_my_wallet.png')},
              {title:'我的分享',content:'查看详情>>',img:require('./img/icon_my_share.png')}];

export default class MyMenu extends Component {

    static propTypes = {
        data: PropTypes.object,
    };
    constructor(props) {
        super(props);
        // this._renderItems=this._renderItems.bind(this);
    }
    _onClick() {

    }
    _renderRows(data){
      return data.map((item,i)=>{
        return (
          <View key={i} style={{flex:1}}>
            <View style={styles.container}>
              <View style={styles.container1}>
                <Image source={TEXTS[i].img} style={styles.image}/>
                <Text style={styles.text1}>
                  {TEXTS[i].title}
                </Text>
              </View>
              <View style={[styles.container1,{justifyContent:'flex-end'}]}>
                <Text style={styles.text2}>
                  {TEXTS[i].content}
                </Text>
              </View>
            </View>
            <View style={styles.separate}/>
            <View style = {styles.boxtr}>
              {this._renderItems(item)}
            </View>
          </View>
        )
      });
    }
    _renderItems(data){
      return data.map((item,i)=>{
        return (
          <MenuButton key={i}
                    renderIcon={item.img}
                    showText={item.txt}
                    textStyle={{fontSize:12}}
                    iconStyle={{width:18,height:18,marginBottom:3}}/>
        )
      });
    }
    render() {
        return (
          <View style={{flex:1}}>
            {this._renderRows(ITEMS)}
          </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    paddingTop:8,
    paddingBottom:8,
    paddingLeft:10,
    paddingRight:10,
    marginTop:6,
    backgroundColor:'white'
  },
  container1:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
  },
  separate:{
    height:0.5,
    backgroundColor:'#F0F0F0',
  },
  boxtr:{
    flexDirection:'row',
    justifyContent:'space-around',
    padding:5,
    backgroundColor:'white',
  },
  image:{
    width:18,
    height:18,
  },
  text1:{
    marginLeft:5,
    fontSize:12,
    color:'#6C656C',
  },
  text2:{
    marginRight:5,
    fontSize:12,
    color:'#6C656C',
  },
});
