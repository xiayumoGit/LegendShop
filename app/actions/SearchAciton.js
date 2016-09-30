/**
 * Created by xiayumo on 16/9/30.
 */

import * as TYPES from './ActionTypes';
import Utils from '../common/Utils';
import Constant from '../common/Constant';

/**
 * 获取搜索结果
 * @param paramas
 * @returns {function(*)}
 */
export let fetchSearchResult = (paramas)=> {
    return dispatch => {
        dispatch(fetchLoading(true));
        Utils.httpPostForm(Constant.httpKeys.HOST+Constant.httpKeys.SEARCH_API_KEY,paramas,
            (response) => {
                dispatch(receiveResult(false,response))
            }, (error) => {
                dispatch(fetchLoading(false));
                alert('分类数据获取失败','错误信息＝'+error)
            });
    }
}

/**
 * 获取搜索纪录
 * @returns {function(*)}
 */
export let getKeywords = ()=>{
    return dispatch => {
        Utils.storageGetItem(Constant.storeKeys.SEARCH_RECODER_KEY)
            .then((value)=> {
                console.log('tag','搜索历史记录＝'+value);
                if(value){
                    let keywords=value.split(',');
                    dispatch(changedKeywords(keywords));
                }
            });
    }
}

/**
 * 新增一个
 * @param keyword
 * @returns {function(*)}
 */
export let addKeywords = (keyword:String)=>{
    return dispatch => {
        Utils.storageGetItem(Constant.storeKeys.SEARCH_RECODER_KEY)
            .then((value)=> {
                if(value){
                    let keywords=value.split(',');
                    keywords.push(keyword);
                    Utils.storageSetItem(Constant.storeKeys.SEARCH_RECODER_KEY,keywords.join(','));
                    dispatch(changedKeywords(keywords));
                }else{
                    let keywords=[];
                    keywords.push(keyword);
                    Utils.storageSetItem(Constant.storeKeys.SEARCH_RECODER_KEY,keywords.join(','));
                    dispatch(changedKeywords(keywords));
                }
            });
    }
}
/**
 * 清除所有搜索纪录
 * @returns {function(*)}
 */
export let clearKeywords = ()=>{
    return dispatch => {
        Utils.storageClearItem(Constant.storeKeys.SEARCH_RECODER_KEY);
        dispatch(changedKeywords([]));
    }
}

let changedKeywords = (keywords)=>{
    return {
        type: TYPES.SEARCH_RECODER_CHANGED,
        keywords:keywords,
    }
}

/**
 * tab切换
 * @param index
 * @returns {{type, tabIndex: *}}
 */
export let tabChanged = (tabIndex)=>{
    return {
        type: TYPES.SEARCH_TAB_CHANGED,
        tabIndex: tabIndex,
    }
}

/**
 * 获取数据loading
 * @param isLoading
 * @returns {{type, isLoading: *}}
 */
let fetchLoading = (isLoading)=>{
    return {
        type: TYPES.SEARCH_RESULT_FETCH,
        isLoading: isLoading,
    }
}

/**
 * 加载完成
 * @param isLoading
 * @param resultDto
 * @returns {{type, isLoading: *, resultDto: *}}
 */
let receiveResult = (isLoading,resultDto)=>{
    return {
        type: TYPES.SEARCH_RESULT_RECEIVE,
        isLoading: isLoading,
        resultDto: resultDto,
    }
}

