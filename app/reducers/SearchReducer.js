/**
 * Created by xiayumo on 16/9/30.
 */
import * as TYPES from '../actions/ActionTypes';

const initialState = {
    isLoading: false,
    resultDto:[],
    keywords:[],
    tabIndex:0,

}

let SearchReducer = (state = initialState, action)=>{
    switch (action.type) {
        case TYPES.SEARCH_RESULT_FETCH:
            return Object.assign({}, state, {
                isLoading:action.isLoading,
            })
        case TYPES.SEARCH_RESULT_RECEIVE:
            return Object.assign({}, state, {
                isLoading:false,
                resultDto:action.resultDto
            })
        case TYPES.SEARCH_RECODER_CHANGED:
            return Object.assign({}, state, {
                keywords:action.keywords,
            })
        case TYPES.SEARCH_TAB_CHANGED:
            return Object.assign({}, state, {
                tabIndex:action.tabIndex,
            })

        default:
            return state
    }
}

export default SearchReducer;
