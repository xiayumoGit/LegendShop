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

import Util from '../common/Utils';
import Constant from '../common/Constant';
import Back from '../component/Back';

let nickName,password,phone,smsCode;

export default class Register extends React.Component {


  _onClick() {
    this.props.navigator.pop();
  }

  _onGetSmsCode(){
    let data='mobile='+phone+'&'+'userName='+nickName;
    console.log('tag','注册发送短信验证参数:'+data);
    Util.httpPostForm(Constant.httpKeys.HOST+Constant.httpKeys.REGISTER_SMS_API_KEY,data,
      (response) => {
            console.log('_onGetSmsCode success: ' + JSON.stringify(response));
          }, (error) => {
              console.log('_onGetSmsCode error: ' + error);
          });
  }

  _onRegister(){
      if(nickName.length==0||password.length==0||phone.length==0||smsCode.length==0){
          alert('请填写必填参数');return;
      }
        let data='nickName='+nickName+'&'+'password='+password+'&'
        +'mobile='+phone+'&'+'mobileCode='+smsCode;

      console.log('tag','注册请求参数＝'+data);

        Util.httpPostForm(Constant.httpKeys.HOST+Constant.httpKeys.REGISTER_API_KEY,data,
          (response) => {
                console.log('_onRegister success: ' + JSON.stringify(response));
              this.props.navigator.pop();
              }, (error) => {
                  console.log('_onRegister error: ' + error);
              });
  }

  render() {

    return (
      <View style={{flex:1}}>

          <Back title='会员注册' _onClick={()=>this._onClick()}/>

          <ScrollView style={{backgroundColor:'#F1F2F6'}}>

              <View style={[styles.separate,{marginTop:10}]}/>

              <View style={styles.container}>
                  <Text style={{width:80,marginLeft:10}}>用户名：</Text>
                  <TextInput
                      clearButtonMode='while-editing'
                      placeholder='请输入3~15个字符'
                      onEndEditing={(event) =>{
                                nickName=event.nativeEvent.text;
                                    }
                                }
                      style={styles.inputText}/>
              </View>
              <View style={styles.separate}/>
              <View style={styles.container}>
                  <Text style={{width:80,marginLeft:10}}>设置密码：</Text>
                  <TextInput
                      clearButtonMode='while-editing'
                      onEndEditing={(event) =>{
                                password=event.nativeEvent.text;
                                    }
                                }
                      placeholder='请输入6~20位密码'
                      style={styles.inputText}/>
              </View>
              <View style={styles.separate}/>
              <View style={styles.container}>
                  <Text style={{width:80,marginLeft:10}}>确认密码：</Text>
                  <TextInput
                      clearButtonMode='while-editing'
                      onEndEditing={(event) =>{
                                password=event.nativeEvent.text;
                                    }
                                }
                      placeholder='请再次输入密码'
                      style={styles.inputText}/>
              </View>
              <View style={styles.separate}/>
              <View style={styles.container}>
                  <Text style={{width:80,marginLeft:10}}>手机：</Text>
                  <TextInput
                      clearButtonMode='while-editing'
                      onEndEditing={(event) =>{
                                phone=event.nativeEvent.text;
                                    }
                                }
                      placeholder='请输入您的手机号'
                      style={styles.inputText}/>
              </View>
              <View style={styles.separate}/>
              <View style={styles.container}>
                  <Text style={{width:80,marginLeft:10}}></Text>
                  <TextInput
                      clearButtonMode='while-editing'
                      onEndEditing={(event) =>{
                                smsCode=event.nativeEvent.text;
                                    }
                                }
                      placeholder='请输入验证码'
                      style={styles.inputText}/>

                  <TouchableOpacity activeOpacity={0.7} onPress={()=>this._onGetSmsCode()}>
                      <View style={styles.smsContainer}>
                          <Text style={{color:'white'}}>获取验证码</Text>
                      </View>
                  </TouchableOpacity>

              </View>

            <View style={{flexDirection:'row',justifyContent:'center',margin:20}}>
                <Text style={{color:'#666666',fontSize:12}}>点击注册，表示您同意LegendShop</Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={{color:'#0067C4',fontSize:10}}>《服务协议》</Text>
                </TouchableOpacity>
            </View>

              <TouchableOpacity activeOpacity={0.7} onPress={()=>this._onRegister()}>
                  <View style={styles.okContainer}>
                      <Text style={{color:'white'}}>注册</Text>
                  </View>
              </TouchableOpacity>

          </ScrollView>
      </View>
    );
  }
}
let styles = StyleSheet.create({

    container:{
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 5,
        height:45,
        justifyContent:'space-between',
        backgroundColor: 'white',
        alignItems: 'center'
    },

    separate:{
        height:0.8,
        backgroundColor:'#F1F2F6',
    },
    inputText: {
        flex: 1,
        backgroundColor: 'transparent',
        fontSize: 12
    },
    okContainer: {
        flex: 1,
        height:35,
        marginLeft:40,
        marginRight:40,
        marginTop:15,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: Constant.colors.lightRedColor,
    },
    smsContainer:{
        height:30,
        paddingLeft:15,
        paddingRight:15,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: Constant.colors.lightRedColor,
    },

});
