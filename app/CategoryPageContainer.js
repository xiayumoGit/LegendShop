/**
 * Created by xiayumo on 16/9/20.
 */
'use strict';
import React from 'react';
import {connect} from 'react-redux';
import CategoryPage from './CategoryPage';

import {fetchCategoryResult, tabChanged} from './actions/CategoryAction';


class CategoryPageContainer extends React.Component {
    render() {
        return (
            <CategoryPage {...this.props} />
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
        isLoading: state.CategoryReducer.isLoading,
        resultDto: state.CategoryReducer.resultDto,
        tabIndex: state.CategoryReducer.tabIndex,
    };
}

/**
 * 定义子组件接受的函数
 * @param dispatch
 * @returns {{changeTab: (function(*=): *)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategoryResult: () => dispatch(fetchCategoryResult()),
        tabChanged: (index) => dispatch(tabChanged(index)),
    };
}

/**
 * connect连接之后container将会接受store里的全局state以及一个可操作的dispatch
 */
export default connect(mapStateToProps, mapDispatchToProps)(CategoryPageContainer);