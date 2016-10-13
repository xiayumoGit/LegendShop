/**
 * Created by xiayumo on 16/9/30.
 */
import * as TYPES from '../actions/ActionTypes';

/**
 * 搜索数据加载状态，结果返回，搜索记录，以及不同tab值，并保存搜索的关键条件作为key，以及当前页码
 * 这里新增了一个isChanged，有时候存在子里面数据更新了，但是对于父组件来不是新的props，父组件没有
 * 触发render最后导致子组件没有正确更新
 * @type {{loadingStatus: number, resultDto: Array, keywords: Array, tabIndex: number}}
 */
const initialState = {
    loadingStatuses: [0, 0, 0, 0],
    queryNumbers: [0, 0, 0, 0],
    resultDto: [],
    keywords: [],
    tabIndex: 0,
    isChanged: false,
}

let SearchReducer = (state = initialState, action)=> {
    switch (action.type) {
        case TYPES.SEARCH_RESULT_FETCH:
            return Object.assign({}, state, {
                loadingStatuses: action.loadingStatuses,
            })
        case TYPES.SEARCH_RESULT_RECEIVE:
            return Object.assign({}, state, {
                loadingStatuses: action.loadingStatuses,
                queryNumbers: action.queryNumbers,
                resultDto: action.resultDto,
                isChanged: !state.isChanged
            })
        case TYPES.SEARCH_RECODER_CHANGED:
            return Object.assign({}, state, {
                keywords: action.keywords,
            })
        case TYPES.SEARCH_TAB_CHANGED:
            return Object.assign({}, state, {
                tabIndex: action.tabIndex,
            })
        case TYPES.SEARCH_CLEAR_CACHE:
            return Object.assign({}, state, {
                loadingStatuses: [0, 0, 0, 0],
                queryNumbers: [0, 0, 0, 0],
                resultDto: [],
                tabIndex: 0,
            })
        default:
            return state
    }
}

export default SearchReducer;
