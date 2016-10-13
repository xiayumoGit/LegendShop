'use strict';

import React, {Component, PropTypes} from 'react';
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

let loginName;
let password;

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

        // Utils.storageGetItem(Constant.storeKeys.LOGIN_INFO_KEY)
        //     .then((value) => {
        //         let name,remember;
        //         if(value){
        //            name=value.loginName?value.loginName:'';
        //            remember=value.accountRemember?value.accountRemember:'0'
        //         }
        //         this.setState({
        //             loginName: name,
        //             accountRemember:remember,
        //         });
        //     });
    }

    _onForgetClick(title) {
        let navigator = this.props.navigator;
        navigator.push({
            name: title,
            component: Forget,
            params: {
                title: title,
            }
        })
    }

    _onClick() {
        this.props.navigator.pop();
    }

    _onLogin() {

        let data = 'loginName=' + loginName + '&' + 'password=' + password +
            '&' + 'deviceId=' + '25dfr542656df1xvc6v6' + '&' + 'verId=' + '1.0' + '&' + 'platform=' + 'Android';
        console.log('tag', '登录参数＝' + data);

        Utils.httpPostForm(Constant.httpKeys.HOST + Constant.httpKeys.LOGIN_API_KEY, data,
            (response) => {
                console.log('_onLogin success: ' + JSON.stringify(response));

                response.loginName = loginName;
                response.password = password;
                response.isLogin = true
                Utils.storageSetItem(Constant.storeKeys.LOGIN_INFO_KEY, response);

                this.props.navigator.pop();

            }, (error) => {
                console.log('_onLogin error: ' + error);
                Alert.alert('登录失败', error)
            });

    }

    _onRegister(title) {
        let navigator = this.props.navigator;
        navigator.push({
            name: title,
            component: Register,
            params: {
                title: title,
            }
        })
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Back title='登录' rightTitle='注册' _onClick={()=>this._onClick()}
                      _onRightClick={()=>this._onRegister('注册')}/>
                <ScrollView style={{backgroundColor:'#F1F2F6'}}>

                    <View style={[styles.separate,{marginTop:10}]}/>

                    <View style={styles.container}>
                        <Text style={{width:80,marginLeft:10}}>账号：</Text>
                        <TextInput
                            clearButtonMode='while-editing'
                            placeholder='用户名／手机号／邮箱'
                            onEndEditing={(event) =>{
                                loginName=event.nativeEvent.text;
                                    }
                                }
                            style={styles.inputText}/>
                    </View>
                    <View style={styles.separate}/>
                    <View style={styles.container}>
                        <Text style={{width:80,marginLeft:10}}>密码：</Text>
                        <TextInput
                            clearButtonMode='while-editing'
                            onEndEditing={(event) =>{
                                password=event.nativeEvent.text;
                                    }
                                }
                            placeholder='请输入密码'
                            style={styles.inputText}/>
                    </View>

                    <View style={{flexDirection:'row-reverse',marginTop:15}}>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>this._onForgetClick('密码找回')}>
                            <Text style={{color:'#0067C4',fontSize:12,marginRight:10,}}> 找回密码？</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity activeOpacity={0.7} onPress={()=>this._onLogin()}>
                        <View style={styles.okContainer}>
                            <Text style={{color:'white'}}>确定</Text>
                        </View>
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

    container: {
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 5,
        height: 45,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        alignItems: 'center'
    },

    inputBox: {
        height: 22,
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },

    separate: {
        height: 0.8,
        backgroundColor: '#F1F2F6',
    },

    separate1: {
        height: 0.5,
        width: Constant.window.width / 3,
        backgroundColor: '#DFE0E3',
    },

    inputText: {
        flex: 1,
        backgroundColor: 'transparent',
        fontSize: 12
    },

    okContainer: {
        flex: 1,
        height: 35,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Constant.colors.lightRedColor,
    },
    codeText: {
        color: '#A79BCD',
        marginRight: 25,
        marginLeft: 15,
        fontSize: 12
    },

    icon: {
        width: 22,
        height: 22,
        marginLeft: 40,
        marginRight: 5,
    },

    icon1: {
        width: 10,
        height: 10,
        marginRight: 3,
    },

    container1: {
        flexDirection: 'row',   // 水平排布
        paddingLeft: 5,
        paddingRight: 5,
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        height: Platform.OS === 'ios' ? 60 : 60,
        backgroundColor: 'white',
        alignItems: 'center'  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
    },

    container2: {
        flexDirection: 'row',   // 水平排布
        justifyContent: 'space-between',
        paddingLeft: 40,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 40,
        alignItems: 'center'  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
    },

    icon3: {
        marginLeft: 5,
    },
    text: {
        fontSize: 16,
    },

});
