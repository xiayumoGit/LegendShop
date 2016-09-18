/**
 * Created by xiayumo on 16/9/16.
 */

import Constant from './Constant';

/**
 * 首页配置
 *
 */
let home = {
    tabBarHeight:Constant.window.tabBarHeight,
    navigationBarHeight:Constant.window.navigatorBarHeight,
    statusBarHeight:Constant.window.statusBarHeight,
    homeString : Constant.strings.homeString,
    categoryString : Constant.strings.categoryString,
    cartString : Constant.strings.cartString,
    mineString : Constant.strings.mineString,
    home_normal_icon:require('../image/icon_main_index_my_home_@2x.png'),
    home_focus_icon:require('../image/icon_main_index_my_home_@2x.png'),
    category_normal_icon:require('../image/icon_main_index_my_class_@2x.png'),
    category_focus_icon:require('../image/icon_main_index_my_class_@2x.png'),
    cart_normal_icon:require('../image/icon_main_index_my_cart_@2x.png'),
    cart_focus_icon:require('../image/icon_main_index_my_cart_@2x.png'),
    mine_normal_icon:require('../image/icon_main_index_my_mine_@2x.png'),
    mine_focus_icon:require('../image/icon_main_index_my_mine_@2x.png'),
}



export default {
    home: home,
}

