/**
 * Created by xiayumo on 16/10/5.
 */
import * as TYPES from '../actions/ActionTypes';

const initialState = {
    resultDto: {},
    resultComments: [],
    loadingStatuses: [0, 0, 0, 0],
    tabIndex: 0,
    commentsTabIndex: 0,
}

let DetailReducer = (state = initialState, action)=> {
    switch (action.type) {
        case TYPES.DETAIL_DATA_FETCH:
            return Object.assign({}, state, {
                loadingStatuses: action.loadingStatuses,
            })
        case TYPES.DETAIL_DATA_RECEIVE:
            return Object.assign({}, state, {
                resultDto: action.resultDto,
                loadingStatuses: action.loadingStatuses,
            })
        case TYPES.DETAIL_TAB_CHANGED:
            return Object.assign({}, state, {
                tabIndex: action.tabIndex,
            })
        default:
            return state
    }
}

export default DetailReducer;
