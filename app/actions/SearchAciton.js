/**
 * Created by xiayumo on 16/9/30.
 */

import * as TYPES from './ActionTypes';
import Utils from '../common/Utils';
import Constant from '../common/Constant';

/**
 * 搜索商品属于高频率大列表请求行为，增加缓存，从搜索纪录进去的情况可以从优先从缓存获取
 * @type {{dataForQuery: {}, nextPageNumberForQuery: {}}}
 */

let resultsCache = {
    dataForQuery: {},
    nextPageNumberForQuery: {},
};

const PAGE_SIZE=10;

/**
 * 每次重新进入页面时判断缓存，避免大量的网络加载
 * @param condition
 * @param queryNumbers
 * @returns {function(*)}
 */
export let searchProduct = (condition:string,loadingStatuses:Array,queryNumbers:Array,tabIndex:Number)=>{
    return dispatch => {
        let cacheData = resultsCache.dataForQuery[condition+tabIndex];
        if (cacheData) {
            loadingStatuses[tabIndex]=1;
            dispatch(receiveResult(loadingStatuses,queryNumbers,cacheData))
        }else{
            dispatch(fetchSearchResult(condition,loadingStatuses,queryNumbers,tabIndex));
        }
    }
}

/**
 * 获取搜索结果
 * @param paramas
 * @returns {function(*)}
 */
export let fetchSearchResult = (condition,loadingStatuses,queryNumbers,tabIndex)=> {
    return dispatch => {
        if(queryNumbers[tabIndex]===0) {
            loadingStatuses[tabIndex]=0;
            dispatch(fetchLoading(loadingStatuses));
        }
        let data = condition+'&'+'pageSize='+PAGE_SIZE+'&'+'page='+queryNumbers[tabIndex];
        console.log('tag','搜索参数＝'+data);
        Utils.httpPostForm(Constant.httpKeys.HOST+Constant.httpKeys.SEARCH_API_KEY,data,
            (response) => {
                resultsCache.nextPageNumberForQuery[condition+tabIndex] = queryNumbers[tabIndex];
                let cacheData = resultsCache.dataForQuery[condition+tabIndex];
                if(!cacheData){
                    cacheData=response.resultList;
                }else{
                    for (let i in response.resultList) {
                        cacheData.push(response.resultList[i]);
                    }
                }
                resultsCache.dataForQuery[condition+tabIndex]=cacheData;
                /**
                 * 这里加载成功，保存当前页数据，将即将查询的页码＋1用于下次查询
                 */
                queryNumbers[tabIndex]=queryNumbers[tabIndex]+1;
                loadingStatuses[tabIndex]=1;
                dispatch(receiveResult(loadingStatuses,queryNumbers,resultsCache.dataForQuery[condition+tabIndex]))
            }, (error) => {
                loadingStatuses[tabIndex]=-1;
                dispatch(fetchLoading(loadingStatuses));
                alert('搜索结果数据返回失败','错误信息＝'+error)
            });
    }
}

/**
 * 获取数据loading
 * @param isLoading
 * @returns {{type, isLoading: *}}
 */
let fetchLoading = (loadingStatuses)=>{
    return {
        type: TYPES.SEARCH_RESULT_FETCH,
        loadingStatuses: loadingStatuses,
    }
}

/**
 * 加载完成
 * @param isLoading
 * @param resultDto
 * @returns {{type, isLoading: *, resultDto: *}}
 */
let receiveResult = (loadingStatuses,queryNumbers,resultDto)=>{
    return {
        type: TYPES.SEARCH_RESULT_RECEIVE,
        loadingStatuses: loadingStatuses,
        queryNumbers:queryNumbers,
        resultDto: resultDto,
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
 * 缓存只针对当前关键词，其他进入重新进入搜索页面时缓存清除，所有状态回到原始状态
 * @returns {{type, loadingStatuses: number[], queryNumbers: number[], resultDto: Array, keywords: Array, tabIndex: number}}
 */
export let clearState = ()=>{
    resultsCache.dataForQuery={};
    resultsCache.nextPageNumberForQuery={};
    return {
        type: TYPES.SEARCH_CLEAR_CACHE,
    }
}



