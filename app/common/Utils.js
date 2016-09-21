'use strict';

import Md5 from 'md5';

import { AsyncStorage } from 'react-native';

let Util = {
    /**
     * http的get请求方式，支持成功及失败的回调
     * @param url
     * @param successCallback
     * @param failCallback
     */
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
    /**
     * http表单请求方式，包括成功及失败的回调
     * @param url
     * @param data
     * @param successCallback
     * @param failCallback
     */
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
    /**
     * http的json请求方式，包括成功及失败的回调
     * @param url
     * @param data
     * @param successCallback
     * @param failCallback
     */
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

    /**
     * 本地数据保存
     * @param key
     * @param value
     * @returns {*|Promise}
     */
    storageSetItem: (key, value) => {
        const jsonValue = JSON.stringify(value);
        return AsyncStorage.setItem(key, jsonValue, (error) => {
            console.log(key + ' set error: ' + error);
        });
    },
    /**
     * 本地数据获取
     * @param key
     * @returns {Promise.<TResult>}
     */
    storageGetItem: (key) => {
        return AsyncStorage.getItem(key)
            .then((data, error) => {
                if (data) return JSON.parse(data);
                console.log(key + ' get error: ' + error);
                return null;
            })
    },
    /**
     * 更新本地数据
     * @param key
     * @param value
     * @returns {Promise.<TResult>}
     */
    storageUpdateItem: (key, value) => {
        return AsyncStorage.getItem(key).then((item) => {
          value =  Object.assign({}, JSON.parse(item), value);
          return AsyncStorage.setItem(key, JSON.stringify(value));
        });
    },
    /**
     * 清除当前数据
     * @param key
     * @returns {*|Promise}
     */
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
