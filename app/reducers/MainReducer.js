import * as types from '../actions/ActionTypes';
import UIConfigure from '../common/UIConfigure';

const initialState = {
    selectedTab: UIConfigure.home.homeString
}

let MainReducer = (state = initialState, action)=>{

    switch (action.type) {
        case types.MAIN_TAB_CHANGE:
            return Object.assign({}, state, {
                selectedTab:action.selectedTab,
            })
        default:
            return state
    }
}

export default MainReducer;