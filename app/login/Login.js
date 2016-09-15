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
  Alert,
  ScrollView,
  Text,
} from 'react-native';

import Forget from './Forget';
import Back from '../component/Back';
import Register from './Register';
import Constant from '../common/Constant';
import Utils from '../common/Utils';

import Main from '../MainScreen';

import DeviceInfo  from 'react-native-device-info';

export default class Login extends Component {

  constructor(props){
        super(props);
        this.state = {
          accountRemember:'0',
          deviceId: DeviceInfo.getUniqueID(),
          verId:'1.0',
          platform:'IOS',
          loginName:'',
          password:''
        };
  }
  componentDidMount() {

    Utils.storageGetItem(Constant.storeKeys.LOGIN_INFO_KEY)
        .then((value) => {
            let name,remember;
            if(value){
               name=value.loginName?value.loginName:'';
               remember=value.accountRemember?value.accountRemember:'0'
            }
            this.setState({
                loginName: name,
                accountRemember:remember,
            });
        });
  }

  _onForgetClick(title){
    let navigator = this.props.navigator;
      navigator.push({
          name: title,
          component: Forget,
          params: {
               title:title,
           }
      })
  }

  _onClick() {

    this.props.navigator.pop();

  }

  _onLogin(){

   let data='loginName='+this.state.loginName+'&'+'password='+this.state.password+
   '&'+'deviceId='+this.state.deviceId+'&'+'verId='+this.state.verId+'&'+'platform='+this.state.platform;

   console.log('tag','登录参数＝'+data);

    Utils.httpPostForm(Constant.httpKeys.HOST+Constant.httpKeys.LOGIN_API_KEY,data,
        (response) => {
                console.log('_onLogin success: ' + JSON.stringify(response));

                //账号密码添加进登录信息
                response.loginName=this.state.loginName;
                response.password=this.state.password;

                Utils.storageSetItem(Constant.storeKeys.LOGIN_INFO_KEY,response);

                let navigator = this.props.navigator;
                  navigator.resetTo({
                      name: '首页',
                      component: Main,
                  })

          }, (error) => {
                console.log('_onLogin error: ' + error);
                    Alert.alert('登录失败',error)
          });

  }

  _onSetRemberAccount(){

      let value = this.state.accountRemember==='0'?'1':'0';
      Utils.storageUpdateItem(Constant.storeKeys.LOGIN_INFO_KEY,{'accountRemember':value});
      this.setState({
              accountRemember:value,
      });
  }

  _onRegister(title){
    let navigator = this.props.navigator;
      navigator.push({
          name: title,
          component: Register,
          params: {
               title:title,
           }
      })
  }

  render() {

    let img,name;
    if(this.state.accountRemember ==='0'){
         img=require('./img/check_@2x.png');
         name='';
    }else{
         img=require('./img/checked_@2x.png');
         name=this.state.loginName;
    }
    return (
      <View style={{flex:1}}>
            <View style={styles.container1}>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>this._onClick()}>
                    <View >
                      <Image source={require('../image/ic_arrow_back_black_@2x.png')} style={styles.icon3}/>
                    </View>
                </TouchableOpacity>
                <Text style={styles.text}>
                      {this.props.title}
                </Text>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>this._onRegister('注册')}>
                  <Text style={[styles.text,{fontSize:13,marginRight:10,color:'#6A6666'}]}>
                        注册
                  </Text>
                </TouchableOpacity>
            </View>

          <ScrollView style={{backgroundColor:'#F1F2F6'}}>

            <View style={styles.separate}/>

            <View style={styles.container}>
                <Image source={require('./img/user_name_@2x.png')} style={styles.icon}/>
                <View style={styles.inputBox}>
                    <TextInput
                        clearButtonMode='while-editing'
                        value={name}
                        placeholder='邮箱／手机／用户名'
                        onChangeText={(text) => this.setState({loginName: text})}
                        style={styles.inputText}/>
                </View>
            </View>
            <View style={styles.container}>
                <Image source={require('./img/password_@2x.png')} style={styles.icon}/>
                <View style={styles.inputBox}>
                    <TextInput
                        clearButtonMode='while-editing'
                        placeholder='请输入密码'
                        onChangeText={(text) => this.setState({password: text})}
                        style={styles.inputText}/>
                </View>
            </View>

            <View style={styles.container2}>
             <TouchableOpacity activeOpacity={0.7} onPress={()=>this._onSetRemberAccount()}>
                <View style={{flexDirection:'row',alignItems:'center',marginLeft:15}}>
                  <Image source={img} style={styles.icon1}/>
                  <Text style={{fontSize:12,color:'#666666'}}> 记住账号 </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} onPress={()=>this._onForgetClick('密码找回')}>
                  <Text style={{color:'#0067C4',fontSize:12,marginRight:10,}}> 忘记密码？</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={0.7} onPress={()=>this._onLogin()}>
                <Text style={styles.okText}>确定</Text>
            </TouchableOpacity>

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',
              paddingTop:10,paddingBottom:10,marginTop:10}}>
                <View style={styles.separate1}/>
                <Text style={{fontSize:12,color:'#666666'}}>其他方式登录</Text>
                <View style={styles.separate1}/>
            </View>

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',
                padding:10}}>

              <TouchableOpacity activeOpacity={0.7}>
                  <Image style={{marginLeft:10,}} source={require('./img/qq_@2x.png')}/>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7}>
                  <Image source={require('./img/weixin_@2x.png')}/>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7}>
                  <Image style={{marginRight:10,}} source={require('./img/weibo_@2x.png')}/>
              </TouchableOpacity>

            </View>

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

  separate1:{
    height:0.5,
    width:Constant.window.width/3,
    backgroundColor:'#DFE0E3',
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
      borderRadius:5,
      textAlign:'center',
      paddingTop:12,
      alignItems:'center',
      color:'white',
      marginTop:15,
      flexDirection:'row',
      backgroundColor: '#FF303D',
      fontSize: 13,
  },
  codeText: {
      color:'#A79BCD',
      marginRight:25,
      marginLeft:15,
      fontSize: 12
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
  },
  text:{
    fontSize:16,
  },

});
