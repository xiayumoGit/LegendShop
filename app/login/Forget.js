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
import Utils from '../common/Utils';
import Constant from '../common/Constant';

let newPwd,phone,smsCode,userName;

export default class Forget extends Component {

  _onClick() {
    this.props.navigator.pop();
  }

    componentDidMount() {
        Utils.storageGetItem(Constant.storeKeys.LOGIN_INFO_KEY)
            .then((value) => {
                if(value){
                    userName=value.loginName?value.loginName:'';
                }
            });
    }

  _findPassword(){
    if(newPwd.length==0||phone.length==0||smsCode.length==0){
          alert('请填写必填参数');return;
    }
    let data='newPwd='+newPwd+'&'+'mobile='+phone+'&'+'code='+smsCode;

    console.log('忘记密码请求参数：','data='+data);
    Utils.httpPostForm(Constant.httpKeys.HOST+Constant.httpKeys.FORGET_PWD_API_KEY,data,
      (response) => {
            console.log('_findPassword success: ' + JSON.stringify(response));
            Utils.storageUpdateItem(Constant.storeKeys.LOGIN_INFO_KEY,{'password':newPwd});
            this.props.navigator.pop();

          }, (error) => {
              console.log('_findPassword error: ' + error);
          });
  }

  _onGetSmsCode(){

    let data='mobile='+phone;
    console.log('tag','找回密码发送短信验证参数＝'+data);
    Utils.httpPostForm(Constant.httpKeys.HOST+Constant.httpKeys.FORGET_SMS_API_KEY,data,
      (response) => {
            console.log('_onGetSmsCode success: ' + JSON.stringify(response));
          }, (error) => {
              console.log('_onGetSmsCode error: ' + error);
          });
  }

  render() {
    return (
        <View style={{flex:1}}>

            <Back title='忘记密码' _onClick={()=>this._onClick()}/>

            <ScrollView style={{backgroundColor:'#F1F2F6'}}>

                <View style={[styles.separate,{marginTop:10}]}/>

                <View style={styles.container}>
                    <Text style={{width:80,marginLeft:10}}>手机：</Text>
                    <TextInput
                        clearButtonMode='while-editing'
                        placeholder='请输入您的手机号'
                        onEndEditing={(event) =>{
                                phone=event.nativeEvent.text;
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
                                newPwd=event.nativeEvent.text;
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
                                newPwd=event.nativeEvent.text;
                                    }
                                }
                        placeholder='请再次输入密码'
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

                <TouchableOpacity activeOpacity={0.7} onPress={()=>this._findPassword()}>
                    <View style={styles.okContainer}>
                        <Text style={{color:'white'}}>确认</Text>
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
