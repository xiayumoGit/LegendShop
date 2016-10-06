/**
 * Created by xiayumo on 16/10/5.
 */
import * as TYPES from './ActionTypes';
import Utils from '../common/Utils';
import Constant from '../common/Constant';
export let fetchDetailResult = (condition:String,loadingStatuses:Array,tabIndex:number)=> {
    return dispatch => {
        console.log('tag','详情参数＝'+condition);
        loadingStatuses[tabIndex]=1;
        dispatch(fetchLoading(loadingStatuses));
        Utils.httpPostForm(Constant.httpKeys.HOST+Constant.httpKeys.PRODUCT_DETAIL_API_KEY1,condition,
            (response) => {
                loadingStatuses[tabIndex]=1;
                dispatch(receiveResult(loadingStatuses,response))
            }, (error) => {
                loadingStatuses[tabIndex]=-1;
                dispatch(fetchLoading(loadingStatuses));
                alert('详情数据返回失败','错误信息＝'+error)
            });
    }
}

let receiveResult = (loadingStatuses,resultDto)=>{
    return {
        type: TYPES.DETAIL_DATA_RECEIVE,
        resultDto: resultDto,
        loadingStatuses:loadingStatuses,
    }
}

let fetchLoading = (loadingStatuses)=>{
    return {
        type: TYPES.DETAIL_DATA_FETCH,
        loadingStatuses: loadingStatuses,
    }
}

/**
 * tab切换
 * @param index
 * @returns {{type, tabIndex: *}}
 */
export let tabChanged = (tabIndex)=>{
    return {
        type: TYPES.DETAIL_TAB_CHANGED,
        tabIndex: tabIndex,
    }
}

