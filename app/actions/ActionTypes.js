/**
 * 主页的state
 * @type {string}
 */
export const MAIN_TAB_CHANGE = 'main_tab_change';

/**
 * 首页的数据加载过程
 * @type {string}
 */
export const HOME_DATA_FETCH = 'home_data_fetch';
export const HOME_DATA_RECEIVE = 'home_data_receive';
/**
 * 下拉刷新加载过程，由于首次加载启动的lading和下拉的不同，区分这两种action
 * @type {string}
 */
export const HOME_DATA_REFRESH_FETCH = 'home_data_refresh_fetch';
export const HOME_DATA_REFRESH_RECEIVE = 'home_data_refresh_fetch';

/**
 * 分类的数据加载
 * @type {string}
 */
export const CATEGORY_DATA_FETCH = 'category_data_fetch';
export const CATEGORY_DATA_RECEIVE = 'category_data_receive';
export const CATEGORY_TAB_CHANGED = 'category_tab_changed';

/**
 * 搜索商品，包括搜索纪录的增加以及清除，关键词搜索商品结果展示
 * @type {string}
 */
export const SEARCH_RECODER_CHANGED = 'search_recoder_changed';
export const SEARCH_RESULT_FETCH = 'search_result_fetch';
export const SEARCH_RESULT_RECEIVE = 'search_result_receive';
export const SEARCH_TAB_CHANGED = 'search_tab_changed';
export const SEARCH_CLEAR_CACHE = 'search_clear_cache';

/**
 * 商品详情，包括详情的展示及，三种小详情页的切换，底部弹起，评论页面的切换等
 * @type {string}
 */
export const DETAIL_DATA_FETCH = 'detail_data_fetch';
export const DETAIL_DATA_RECEIVE = 'detail_data_receive';
export const DETAIL_TAB_CHANGED = 'detail_tab_changed';


