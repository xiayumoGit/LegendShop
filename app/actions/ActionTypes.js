/**
 * 主页的state
 * @type {string}
 */
export const MAIN_TAB_CHANGE= 'main_tab_change';

/**
 * 首页的数据加载过程
 * @type {string}
 */
export const HOME_DATA_FETCH= 'home_data_fetch';
export const HOME_DATA_RECEIVE= 'home_data_receive';
/**
 * 下拉刷新加载过程，由于首次加载启动的lading和下拉的不同，区分这两种action
 * @type {string}
 */
export const HOME_DATA_REFRESH_FETCH= 'home_data_refresh_fetch';
export const HOME_DATA_REFRESH_RECEIVE= 'home_data_refresh_fetch';

/**
 * 分类的数据加载
 * @type {string}
 */
export const CATEGORY_DATA_FETCH= 'category_data_fetch';
export const CATEGORY_DATA_RECEIVE= 'category_data_receive';

export const CATEGORY_TAB_CHANGED= 'category_tab_changed';