'use strict';

import React,{ Component,PropTypes } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  InteractionManager,
  Platform,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';


import Back from '../component/Back';
import Login from './Login';

import Utils from '../common/Utils';
import Constant from '../common/Constant';

export default class Forget extends Component {

  constructor(props){
        super(props);
        this.state = {
          newPwd: '',
          mobile:'',
          code:'',
        };
  }

  _onClick() {

    this.props.navigator.pop();

  }

  _findPassword(){

    let data='newPwd='+this.state.newPwd+'&'+'mobile='+this.state.mobile+'&'+'code='+this.state.code;

    console.log('tag','data='+data);

    Utils.httpPostForm(Constant.httpKeys.HOST+Constant.httpKeys.FORGET_PWD_API_KEY,data,
      (response) => {
            console.log('_findPassword success: ' + JSON.stringify(response));
            //更新登录信息
            Utils.storageUpdateItem(Constant.storeKeys.LOGIN_INFO_KEY,{'password':this.state.newPwd});

            let navigator = this.props.navigator;
              navigator.push({
                  name: '登录',
                  component: Login,
                  params: {
                       title:'登录',
                   }
              })
          }, (error) => {
              console.log('_findPassword error: ' + error);
          });
  }

  _onGetSmsCode(){

    let data='phone='+this.state.mobile;

    console.log('tag','找回密码发送短信验证参数＝'+data);

    Util.httpPostForm(Constant.httpKeys.HOST+Constant.httpKeys.FORGET_SMS_API_KEY,data,
      (response) => {
            console.log('_onGetSmsCode success: ' + JSON.stringify(response));
          }, (error) => {
              console.log('_onGetSmsCode error: ' + error);
          });
  }

  render() {
    return (
      <View style={{flex:1}}>

          <Back title={this.props.title} onClick={()=>this._onClick()}/>

          <ScrollView style={{backgroundColor:'#F1F2F6'}}>

            <View style={styles.separate}/>

            <View style={styles.container}>
                <Image source={require('./img/user_name_@2x.png')} style={styles.icon}/>
                <View style={styles.inputBox}>
                    <TextInput
                        clearButtonMode='while-editing'
                        onChangeText={(text) => this.setState({mobile: text})}
                        placeholder='请输入手机号码'
                        style={styles.inputText}/>
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.codeText}>获取验证码</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Image source={require('./img/password_@2x.png')} style={styles.icon}/>
                <View style={styles.inputBox}>
                    <TextInput
                        clearButtonMode='while-editing'
                        onChangeText={(text) => this.setState({code: text})}
                        placeholder='输入手机验证码'
                        style={styles.inputText}/>
                </View>
            </View>

            <View style={styles.container}>
                <Image source={require('./img/img_code_@2x.png')} style={styles.icon}/>
                <View style={styles.inputBox}>
                    <TextInput
                        clearButtonMode='while-editing'
                        onChangeText={(text) => this.setState({newPwd: text})}
                        placeholder='输入您的新密码'
                        style={styles.inputText}/>
                </View>
            </View>

            <View style={styles.container}>
                <Image source={require('./img/phone_code_@2x.png')} style={styles.icon}/>
                <View style={styles.inputBox}>
                    <TextInput
                        clearButtonMode='while-editing'
                        placeholder='再次输入您的新密码'
                        style={styles.inputText}/>
                </View>
            </View>

            <TouchableOpacity activeOpacity={0.7} onPress={()=>this._findPassword()}>
                <Text style={styles.okText}>确定</Text>
            </TouchableOpacity>

          </ScrollView>
      </View>
    );
  }
}
let styles = StyleSheet.create({

  container:{
    flexDirection: 'row',
    backgroundColor:'white',
    padding:10,
    alignItems:'center',
    flex: 1,  // 类似于android中的layout_weight,设置为1即自动拉伸填充
  },

  inputBox: {
      height: 22,
      flexDirection: 'row',
      flex: 1,  // 类似于android中的layout_weight,设置为1即自动拉伸填充
      backgroundColor: 'white',
      alignItems:'center',
      marginLeft:10,
      marginRight:10,
  },

  separate:{
    height:15,
    backgroundColor:'#F1F2F6',
  },

  inputText: {
      flex: 1,
      backgroundColor: 'transparent',
      fontSize: 12
  },

  okText: {
      flex: 1,
      height:35,
      marginLeft:40,
      marginRight:40,
      marginTop:15,
      borderRadius:5,
      textAlign:'center',
      paddingTop:12,
      alignItems:'center',
      color:'white',
      flexDirection:'row',
      backgroundColor: '#FF303D',
      fontSize: 13,
  },
  codeText: {
    height:30,
    width:60,
    borderRadius:5,
    textAlign:'center',
    paddingTop:10,
    alignItems:'center',
    color:'white',
    flexDirection:'row',
    backgroundColor: '#FF303D',
    fontSize: 10,
  },

  icon:{
    width:22,
    height:22,
    marginLeft:40,
    marginRight:5,
  },

  icon1:{
    width:10,
    height:10,
    marginRight:3,
  },

  container1: {
      flexDirection: 'row',   // 水平排布
      paddingLeft: 5,
      paddingRight: 5,
      justifyContent:'space-between',
      paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏
      height: Platform.OS === 'ios' ? 60 : 60,   // 处理iOS状态栏
      backgroundColor: 'white',
      alignItems: 'center'  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
  },

  container2: {
      flexDirection: 'row',   // 水平排布
      justifyContent:'space-between',
      paddingLeft:40,
      paddingTop:10,
      paddingBottom:10,
      paddingRight:40,
      alignItems: 'center'  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
  },

  icon3:{
     marginLeft:5,
      width:28,
      height:28,
  },
  text:{
    fontSize:16,
  },

});
