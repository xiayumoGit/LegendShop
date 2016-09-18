/**
 * Created by xiayumo on 16/5/26.
 */
import { Dimensions,Platform} from 'react-native';

/**
 *  公共配置
 *
 */
let window = {
    width: Platform.OS === 'ios' ? Dimensions.get('window').width : Dimensions.get('screen').width,
    height: Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('screen').height,
    tabBarHeight:50,
    navigatorBarHeight:60,
    statusBarHeight:20,
}

/**
 *
 * 颜色
 */

let colors = {
    lightGreyColor:'rgb(240, 242, 245)',//默认背景灰底
    lightGreyColor1:'rgb(238, 238, 238)',//比默认灰底稍微深点
    lightColor:'rgb(206, 206, 211)',
    redColor:'rgb(255,0,0)',//正红
    lightBlackColor:'rgb(92, 92, 92)',//浅黑色
}

/**
 *
 * 常量字符串
 */
let strings = {
    homeString : '首页',
    categoryString : '分类',
    cartString : '购物车',
    mineString : '我的',
    searchTabString:['默认','销量','评论数','价格'],
    orderByString:['buys','buys','comments','cash'],
    detailTabString:['商品','详情','评价'],
    judgeTabString:['全部评价','好评','中评','差评'],
}


/**
 *
 * 存储
 */
let storeKeys = {
    //存储跟登录相关的所有配置信息，包括token，账号，密码等
    LOGIN_INFO_KEY:'LOGIN_INFO_KEY',
}

/**
 *
 * http
 */
let httpKeys = {
    //主地址
    HOST: 'http://react.legendshop.cn',
    IMAGE_API_HOST: 'http://react.legendshop.cn/photoserver/photo/',
    // HOST: 'http://legendshop.imwork.net:8801/legendshop_app',
    //注册使用短信验证码
    REGISTER_SMS_API_KEY: '/sendRegSMSCode?',
    //忘记密码发送短信验证码
    FORGET_SMS_API_KEY: '/sendSMSCode?',
    //登录
    LOGIN_API_KEY: '/login?',
    //注册
    REGISTER_API_KEY: '/userReg?',
    //找回密码
    FORGET_PWD_API_KEY: '/forgetPwd?',
    //商品分类
    CATEGOTY_API_KEY: '/category',
    //商品搜索
    SEARCH_API_KEY: '/appSearch/prodList?',
    //商品详情
    PRODUCT_DETAIL_API_KEY1: '/productDetail?',
    PRODUCT_DETAIL_API_KEY2: '/productContent/',//get请求
    PRODUCT_DETAIL_API_KEY3: '/productDetail',

}

export default {
    window: window,
    colors: colors,
    strings:strings,
    storeKeys: storeKeys,
    httpKeys: httpKeys,

}
