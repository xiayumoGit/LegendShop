/**
 * Created by xiayumo on 16/9/30.
 */
'use strict';
import React from 'react';
import {connect} from 'react-redux';
import ProductSearch from './ProductSearch';
import {tabChanged, searchProduct, fetchSearchResult, clearState} from '../actions/SearchAciton';

export class ProductSearchContainer extends React.Component {
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
        tabIndex: state.SearchReducer.tabIndex,
        loadingStatuses: state.SearchReducer.loadingStatuses,
        resultDto: state.SearchReducer.resultDto,
        queryNumbers: state.SearchReducer.queryNumbers,
        isChanged: state.SearchReducer.isChanged,
    };
}

/**
 * 定义子组件接受的函数
 * @param dispatch
 * @returns {{changeTab: (function(*=): *)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        tabChanged: (tabIndex) => dispatch(tabChanged(tabIndex)),
        searchProduct: (condition, loadingStatuses, queryNumbers, tabIndex) =>
            dispatch(searchProduct(condition, loadingStatuses, queryNumbers, tabIndex)),
        fetchSearchResult: (condition, loadingStatuses, queryNumbers, tabIndex) =>
            dispatch(fetchSearchResult(condition, loadingStatuses, queryNumbers, tabIndex)),
        clearState: () => dispatch(clearState()),
    };
}

/**
 * connect连接之后container将会接受store里的全局state以及一个可操作的dispatch
 */
export default connect(mapStateToProps, mapDispatchToProps)(ProductSearchContainer);
