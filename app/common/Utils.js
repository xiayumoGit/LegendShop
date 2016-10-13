'use strict';

import Md5 from 'md5';
import {AsyncStorage} from 'react-native';

let Util = {
    /**
     * http的get请求方式，支持成功及失败的回调
     * @param url
     * @param successCallback
     * @param failCallback
     */
    httpGet: (url, successCallback, failCallback) => {
        console.log('tag', '请求地址＝' + url);
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                let result = JSON.parse(responseText);
                if (result.status === 1) {
                    console.log('success: ' + responseText);
                    successCallback(result.result);
                } else {
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
    httpPostForm: (url, data, successCallback, failCallback)=> {
        console.log('tag', '请求地址＝' + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data + ''
        })
            .then((response) => response.text())
            .then((responseText) => {
                let result = JSON.parse(responseText);
                if (result.status === 1) {
                    console.log('success: ' + responseText);
                    successCallback(result.result);
                } else {
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
    httpPostJson: (url, data, successCallback, failCallback)=> {
        console.log('tag', '请求地址＝' + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.text())
            .then((responseText) => {
                let result = JSON.parse(responseText);
                if (result.status === 1) {
                    console.log('success: ' + responseText);
                    successCallback(result.result);
                } else {
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
     * 本地数据保存，支持所有类型，包括字符串及json对象，最后都转换成json对象存储
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
     * 本地数据获取，所有类型均可以，字符串的按原格式输出，json字符串转换成json对象输出
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
     * 更新本地数据，针对json对象，字符串更新类型直接调用storageSetItem
     * @param key
     * @param value
     * @returns {Promise.<TResult>}
     */
    storageUpdateItem: (key, value) => {
        return AsyncStorage.getItem(key).then((item) => {
            value = Object.assign({}, JSON.parse(item), value);
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
    /**
     * md5加密
     * @param value
     */
    md5: (value)=> {
        return Md5(value);
    },

    isEmptyObject: (obj)=> {
        for (var n in obj) {
            return false;
        }
        return true;
    },

}

export default Util;
