/**
 * Created by xiayumo on 16/9/30.
 */
'use strict';
import React from 'react';
import {connect} from 'react-redux';
import ProductSearch from './ProductSearch';
import {fetchSearchResult,tabChanged} from '../actions/SearchAciton';


export class ProductSearchContainer1 extends React.Component {
    render() {
        return (
            <ProductSearch {...this.props} />
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
        isLoading: state.SearchReducer.isLoading,
        resultDto: state.SearchReducer.resultDto,
        tabIndex:state.SearchReducer.tabIndex,
    };
}

/**
 * 定义子组件接受的函数
 * @param dispatch
 * @returns {{changeTab: (function(*=): *)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        fetchSearchResult: (keyword) => dispatch(fetchSearchResult(keyword)),
        tabChanged: (tabIndex) => dispatch(tabChanged(tabIndex)),
    };
}

/**
 * connect连接之后container将会接受store里的全局state以及一个可操作的dispatch
 */
export default connect(mapStateToProps, mapDispatchToProps)(ProductSearchContainer1);
