/**
 * Created by xiayumo on 16/9/20.
 */
import * as TYPES from './ActionTypes';
import Utils from '../common/Utils';
import Constant from '../common/Constant';

/**
 * 首页加载
 * @returns {function(*)}
 */
export let fetchCategoryResult = ()=> {
    return dispatch => {
        dispatch(fetchLoading(true));
        Utils.httpPostForm(Constant.httpKeys.HOST+Constant.httpKeys.CATEGOTY_API_KEY,'',
            (response) => {
                dispatch(receiveResult(false,response))
            }, (error) => {
                dispatch(fetchLoading(false));
                alert('分类数据获取失败','错误信息＝'+error)
            });
    }
}

/**
 * 获取数据loading
 * @param isLoading
 * @returns {{type, isLoading: *}}
 */
let fetchLoading = (isLoading)=>{
    return {
        type: TYPES.CATEGORY_DATA_FETCH,
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
        type: TYPES.CATEGORY_DATA_RECEIVE,
        isLoading: isLoading,
        resultDto: resultDto,
    }
}

/**
 * tab切换
 * @param index
 * @returns {{type, tabIndex: *}}
 */
export let tabChanged = (tabIndex)=>{
    return {
        type: TYPES.CATEGORY_TAB_CHANGED,
        tabIndex: tabIndex,
    }
}

