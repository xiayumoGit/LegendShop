/**
 * Created by xiayumo on 16/9/17.
 */
import * as TYPES from './ActionTypes';

/**
 * 触发底部tab切换
 * @param label
 * @returns {{type: string, selectedTab: *}}
 */
export let changeTab = (label)=> {
    return {
        type: TYPES.MAIN_TAB_CHANGE,
        selectedTab:label
    }
}

