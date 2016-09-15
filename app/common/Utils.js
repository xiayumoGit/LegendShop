'use strict';

import Md5 from 'md5';

import { AsyncStorage } from 'react-native';

let Util = {
    //http的get请求，包括log日志打印以及成功及失败的回调
    httpGet: (url, successCallback, failCallback) => {
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
              let result=JSON.parse(responseText);
              if(result.status===1){
                console.log('success: ' + responseText);
                successCallback(result.result);
              }else{
                console.log('fail: ' + responseText);
                failCallback(result.msg);
              }
            })
            .catch((err) => {
                console.log('err: ' + err);
                failCallback(err);
            }).done();
    },
    //http的提交表单，包括log日志打印以及成功及失败的回调
    httpPostForm:(url,data, successCallback, failCallback)=>{
          fetch(url, {
            method: 'POST',
            headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/x-www-form-urlencoded'
           },
           body:data+''
          })
            .then((response) => response.text())
            .then((responseText) => {
                //根据返回状态进行回调
                let result=JSON.parse(responseText);
                if(result.status===1){
                  console.log('success: ' + responseText);
                  successCallback(result.result);
                }else{
                  console.log('fail: ' + responseText);
                  failCallback(result.msg);
                }
            })
            .catch((err) => {
                console.log('err: ' + err);
                failCallback(err);
            }).done();
    },
    //http的提交json对象，包括log日志打印以及成功及失败的回调
    httpPostJson:(url, data,successCallback, failCallback)=>{
          fetch(url,{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data)
            })
            .then((response) => response.text())
            .then((responseText) => {
              let result=JSON.parse(responseText);
              if(result.status===1){
                console.log('success: ' + responseText);
                successCallback(result.result);
              }else{
                console.log('fail: ' + responseText);
                failCallback(result.msg);
              }
            })
            .catch((err) => {
                console.log('err: ' + err);
                failCallback(err);
            }).done();

    },
    //本地存储，以key-value的方式
    storageSetItem: (key, value) => {
        const jsonValue = JSON.stringify(value);
        return AsyncStorage.setItem(key, jsonValue, (error) => {
            console.log(key + ' set error: ' + error);
        });
    },
    //获取本地对应key的value
    storageGetItem: (key) => {
        return AsyncStorage.getItem(key)
            .then((data, error) => {
                if (data) return JSON.parse(data);
                console.log(key + ' get error: ' + error);
                return null;
            })
    },
    //更新key所对应的value
    storageUpdateItem: (key, value) => {
        return AsyncStorage.getItem(key).then((item) => {
          value =  Object.assign({}, JSON.parse(item), value);
          return AsyncStorage.setItem(key, JSON.stringify(value));
        });
    },
    //清除当前key的value
    storageClearItem: (key) => {
        return AsyncStorage.removeItem(key);
    },
    //md5加密
    md5:(value)=>{
      return Md5(value);
    },
    isEmptyObject:(obj)=>{
      for(var n in obj){
        return false;
      }
        return true;
    },
}

export default Util;
