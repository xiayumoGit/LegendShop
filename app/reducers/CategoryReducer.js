/**
 * Created by xiayumo on 16/9/20.
 */

import * as TYPES from '../actions/ActionTypes';

const initialState = {
    isLoading: false,
    resultDto:[],
    tabIndex:0,

}

let CategoryReducer = (state = initialState, action)=>{
    switch (action.type) {
        case TYPES.CATEGORY_DATA_FETCH:
            return Object.assign({}, state, {
                isLoading:action.isLoading,
            })
        case TYPES.CATEGORY_DATA_RECEIVE:
            return Object.assign({}, state, {
                isLoading:false,
                resultDto:action.resultDto
            })
        case TYPES.CATEGORY_TAB_CHANGED:
            return Object.assign({}, state, {
                tabIndex:action.tabIndex,
            })
        default:
            return state
    }
}

export default CategoryReducer;
