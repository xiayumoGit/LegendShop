/**
 * Created by xiayumo on 16/9/30.
 */
'use strict';
import React from 'react';
import {connect} from 'react-redux';
import ProductSearch1 from './ProductSearch1';
import {getKeywords, addKeywords, clearKeywords} from '../actions/SearchAciton';


export class ProductSearchContainer1 extends React.Component {
    render() {
        return (
            <ProductSearch1 {...this.props} />
        )
    }
}

/**
 * 定义子组件接收的state
 * @param state
 * @returns {{selectedTab: *}}
 */
const mapStateToProps = (state) => {
    return {
        keywords: state.SearchReducer.keywords,
    };
}

/**
 * 定义子组件接受的函数
 * @param dispatch
 * @returns {{changeTab: (function(*=): *)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        getKeywords: () => dispatch(getKeywords()),
        addKeywords: (keyword) => dispatch(addKeywords(keyword)),
        clearKeywords: () => dispatch(clearKeywords()),
    };
}

/**
 * connect连接之后container将会接受store里的全局state以及一个可操作的dispatch
 */
export default connect(mapStateToProps, mapDispatchToProps)(ProductSearchContainer1);
