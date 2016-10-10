/**
 * Created by xiayumo on 16/9/16.
 */

import Constant from './Constant';

/**
 * 首页ui配置
 *
 */
let home = {
    /**
     * 尺寸配置
     */
    tabBarHeight:50,
    navigationBarHeight:60,
    statusBarHeight:Constant.window.statusBarHeight,
    carouselHeight:200,
    carouselWidth:Constant.window.width,
    tabIconWidth:27,
    tabIconHeight:27,
    /**
     * 固定文字配置
     */
    homeString : Constant.strings.homeString,
    categoryString : Constant.strings.categoryString,
    cartString : Constant.strings.cartString,
    mineString : Constant.strings.mineString,
    menuStringArray:Constant.strings.menuStringArray,
    /**
     * 颜色配置
     */
    tabTextColor:Constant.colors.lightBlackColor,
    searchTextColor:Constant.colors.lightColor,
    defaultBgColor:Constant.colors.lightGreyColor,
    /**
     * icon配置
     */
    homeNormalIcon:require('../image/icon_home_@2x.png'),
    homeFocusIcon:require('../image/icon_home_red_@2x.png'),
    categoryNormalIcon:require('../image/icon_class_@2x.png'),
    categoryFocusIcon:require('../image/icon_class_red_@2x.png'),
    cartNormalIcon:require('../image/icon_shopcar_@2x.png'),
    cartFocusIcon:require('../image/icon_shopcar_red_@2x.png'),
    mineNormalIcon:require('../image/icon_mine_@2x.png'),
    mineFocusIcon:require('../image/icon_mine_red_@2x.png'),
    menuIconArray:[require('../image/icon_home_center_tag1_@2x.png'),
                    require('../image/icon_home_center_tag2_@2x.png'),
                    require('../image/icon_home_center_tag3_@2x.png'),
                    require('../image/icon_home_center_tag4_@2x.png')],
}

/**
 * 分类页面ui配置
 *
 */
let category ={
    navigationBarHeight:60,
    statusBarHeight:Constant.window.statusBarHeight,
    defaultBgColor:Constant.colors.lightGreyColor,
    categorySearchBoxHeight:30,
    categoryTabColor:Constant.colors.lightBlackColor,
    categoryTabSelectColor:Constant.colors.redColor,
    categoryTabWidth:Constant.window.tabBarWidth,
}

/**
 * 搜索
 *
 */
let search ={
    navigationBarHeight:60,
    statusBarHeight:Constant.window.statusBarHeight,
    searchBoxHeight:30,
    searchRecodeItemHeight:35,
    defaultBgColor:Constant.colors.lightGreyColor,
    searchTabHeight:Constant.window.indicatorBarHeight,
    searchTabText:'black',
    searchTabSelectedText:Constant.colors.redColor,

}

/**
 * 详情
 *
 */
let detail ={
    navigationBarHeight:60,
    statusBarHeight:Constant.window.statusBarHeight,
    defaultBgColor:Constant.colors.lightGreyColor,
    detailTabHeight:Constant.window.indicatorBarHeight,
    detailTabText:'black',
    detailTabSelectedText:Constant.colors.redColor,
    bottomBarColor:Constant.colors.darkGreyColor,
    bottomBarHeight:50,
    cartBgColor:Constant.colors.lightRedColor,
}


export default {
    home: home,
    category:category,
    search:search,
    detail:detail,
}

