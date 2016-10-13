'use strict';

import React,{ Component,PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';

export default class TopInfo extends Component {

    static propTypes = {
        data: PropTypes.object,  // Tag
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <View style={{flex:1,height:150,justifyContent:'space-between'}}>
          <View style={styles.container1}>
            <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                <Image source={require('./img/icon_member.png')} style={styles.user}/>
                <View >
                  <Text style={styles.itemText}>
                    legendshop
                  </Text>
                  <View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
                    <Image source={require('./img/mobile_phone.png')}
                           style={{width:13,height:13}}/>
                    <Text  style={{color:'white',fontSize:10}}>
                      13066831968
                    </Text>
                  </View>
                </View>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <View style={styles.container3}>
                <Text style={{color:'white',fontSize:12}}>
                  账号管理,收货地址>>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View  style={styles.container}>
              <TouchableOpacity activeOpacity={0.7}>
                <View style={{justifyContent:'center',marginBottom:8}}>
                  <Image source={require('./img/icon_fav_good.png')} style={styles.itemImage}/>
                  <Text style={styles.itemText}>我的收藏</Text>
                </View>
               </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7}>
                <View style={{backgroundColor:'transparent',marginBottom:8}}>
                 <Image source={require('../image/message.png')} style={styles.itemImage}/>
                  <Text style={styles.itemText}>我的消息</Text>
                </View>
               </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7}>
                <View style={{backgroundColor:'transparent',marginBottom:8}}>
                  <Image source={require('./img/icon_goods_browse.png')} style={styles.itemImage}/>
                  <Text style={styles.itemText}>我的足迹</Text>
                </View>
              </TouchableOpacity>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:'transparent'
  },
  container1:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  container3:{
    flexDirection:'row',
    marginTop:80,
    marginRight:10,
  },
  titleContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  separate:{
    width:1,
    height:15,
    backgroundColor:'white',
    alignItems:'center',
  },
  user:{
    width: 60,
	height: 60,
    marginTop:10,
    marginLeft:10,
    marginRight:8,
	borderRadius: 30,
  },
  itemImage:{
    marginTop:8,
    alignSelf:'center',
    width:20,
    height:20,
  },
  itemText:{
    color:'white',
    fontSize:12,
  },
});
