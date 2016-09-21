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
    tabBarHeight:Constant.window.tabBarHeight,
    navigationBarHeight:Constant.window.navigatorBarHeight,
    statusBarHeight:Constant.window.statusBarHeight,
    swiperHeight:200,
    swiperWidth:Constant.window.width,
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
    categoryTabColor:Constant.colors.lightBlackColor,
    categoryTabSelectColor:Constant.colors.redColor,
}



export default {
    home: home,
    category:category,
}

