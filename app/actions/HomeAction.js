/**
 * Created by xiayumo on 16/9/19.
 */
import * as TYPES from './ActionTypes';
import Utils from '../common/Utils';
import Constant from '../common/Constant';

/**
 * 首页加载
 * @returns {function(*)}
 */
export let fetchHomeResult = ()=> {
    return dispatch => {
        dispatch(fetchLoading(true));
        Utils.httpPostForm(Constant.httpKeys.HOST + Constant.httpKeys.HOME_API_KEY, '',
            (response) => {
                dispatch(reciveResult(false, response))
            }, (error) => {
                dispatch(fetchLoading(false));
                alert('首页数据获取失败', '错误信息＝' + error)
            });
    }
}
/**
 * 下拉刷新，从新获取数据
 * @returns {function(*)}
 */
export let fetchHomeRefreshResult = ()=> {
    return dispatch => {
        dispatch(fetchRefreshing(true));
        Utils.httpPostForm(Constant.httpKeys.HOST + Constant.httpKeys.HOME_API_KEY, '',
            (response) => {
                dispatch(reciveRefreshingResult(false, response))
            }, (error) => {
                alert('首页下拉刷新失败', '错误信息＝' + error)
            });
    }
}

/**
 * 获取数据loading
 * @param isLoading
 * @returns {{type, isLoading: *}}
 */
let fetchLoading = (isLoading)=> {
    return {
        type: TYPES.HOME_DATA_FETCH,
        isLoading: isLoading,
    }
}

/**
 * 加载完成
 * @param isLoading
 * @param resultDto
 * @returns {{type, isLoading: *, resultDto: *}}
 */
let reciveResult = (isLoading, resultDto)=> {
    return {
        type: TYPES.HOME_DATA_RECEIVE,
        isLoading: isLoading,
        resultDto: resultDto,
    }
}

/**
 * 刷新获取数据
 * @param isRefreshing
 * @returns {{type, isLoading: *}}
 */
let fetchRefreshing = (isRefreshing)=> {
    return {
        type: TYPES.HOME_DATA_REFRESH_FETCH,
        isRefreshing: isRefreshing,
    }
}

/**
 * 刷新获取数据完成
 * @param isRefreshing
 * @param resultDto
 * @returns {{type, isLoading: *, resultDto: *}}
 */
let reciveRefreshingResult = (isRefreshing, resultDto)=> {
    return {
        type: TYPES.HOME_DATA_REFRESH_RECEIVE,
        isRefreshing: isRefreshing,
        resultDto: resultDto,
    }
}
