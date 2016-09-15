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

const WINDOW_WIDTH = Platform.OS==='ios'?Dimensions.get('window').width:Dimensions.get('screen').width;

export default class TopInfo extends Component {

    static propTypes = {
        data: PropTypes.object,  // Tag
    };

    constructor(props) {
        super(props);
    }

    _onLoginClick(title) {
      if (this.props._onLoginClick) {
          this.props._onLoginClick(title);
      }
    }

    _onClickItem(){

    }

    _onClickManager(){

    }

    render() {
        return (
        <View style={{flex:1}}>
          <View style={styles.container1}>
            <Image source={require('./img/icon_member.png')} style={styles.user}/>
            <View style={styles.container2}>
              <Text style={styles.text1}>
                用户姓名
              </Text>
              <Text style={styles.text1}>
                13066831968
              </Text>
              <Text style={styles.text1}>
                账号锁定：已锁定
              </Text>
              <TouchableOpacity onPress={()=>this._onLoginClick('登录')} activeOpacity={0.7}>
                <View style={styles.container3}>
                  <Text style={styles.text1}>
                    管理账户>>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container}>
            <View>
              <Text style={[styles.text1,{alignSelf:'center',marginBottom:8}]}>
                15
              </Text>
              <Text style={styles.text1}>
                 我的收藏
              </Text>
            </View>
            <View>
              <Text style={[styles.text1,{alignSelf:'center',marginBottom:8}]}>
                33
              </Text>
              <Text style={styles.text1}>
                 我的消息
              </Text>
            </View>
            <View>
              <Image source={require('./img/icon_goods_browse.png')} style={styles.image}/>
              <Text style={styles.text1}>
                 我的足迹
              </Text>
            </View>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:7,
    paddingTop:6,
    paddingBottom:7,
    backgroundColor:'#8C023A'
  },
  container1:{
    flex:1,
    flexDirection:'row'
  },
  container2:{
    flex:1,
    marginTop:20,
    backgroundColor:'transparent',
  },
  container3:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-end'
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
  userContainer2:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    backgroundColor:'transparent'
  },
  user:{
    width: 60,
		height: 60,
    marginTop:10,
    marginLeft:10,
    marginRight:8,
		borderRadius: 30,
  },
  litleImage:{
    width:7,
    height:7,
  },
  image:{
    alignSelf:'center',
    marginBottom:5,
    width:12,
    height:12,
  },
  text1:{
    color:'white',
    fontSize:12,
    fontWeight:'bold',
  },

});
