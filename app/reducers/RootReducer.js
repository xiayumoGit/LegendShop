import { combineReducers } from 'redux';

import MainReducer from './MainReducer';
import HomeReducer from './HomeReducer';
import CategoryReducer from './CategoryReducer';
/**
 * 合并所有的reducers
 */
export default RootReducer = combineReducers({
        MainReducer,
        HomeReducer,
        CategoryReducer,
})