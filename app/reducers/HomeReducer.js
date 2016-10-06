/**
 * Created by xiayumo on 16/9/19.
 */

import * as TYPES from '../actions/ActionTypes';

const initialState = {
    isLoading: false,
    isRefreshing:false,
    resultDto:{},
}

let HomeReducer = (state = initialState, action)=>{
    switch (action.type) {
        case TYPES.HOME_DATA_FETCH:
            return Object.assign({}, state, {
                isLoading:action.isLoading,
            })
        case TYPES.HOME_DATA_RECEIVE:
            return Object.assign({}, state, {
                isLoading:false,
                resultDto:action.resultDto
            })
        case TYPES.HOME_DATA_REFRESH_FETCH:
            return Object.assign({}, state, {
                isRefreshing:action.isRefreshing,
            })
        case TYPES.HOME_DATA_REFRESH_RECEIVE:
            return Object.assign({}, state, {
                isRefreshing:false,
                resultDto:action.resultDto
            })
        default:
            return state
    }
}

export default HomeReducer;
