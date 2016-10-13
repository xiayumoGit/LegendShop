/**
 * Created by xiayumo on 16/10/5.
 */

'use strict';
import React from 'react';
import {connect} from 'react-redux';
import ProductDetail from './ProductDetail';
import {fetchDetailResult, tabChanged} from '../actions/DetailAction';


export class ProductDetailContainer extends React.Component {
    render() {
        return (
            <ProductDetail {...this.props} />
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
        resultDto: state.DetailReducer.resultDto,
        resultComments: state.DetailReducer.resultComments,
        tabIndex: state.DetailReducer.tabIndex,
        loadingStatuses: state.DetailReducer.loadingStatuses,
    };
}

/**
 * 定义子组件接受的函数
 * @param dispatch
 * @returns {{changeTab: (function(*=): *)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        fetchDetailResult: (condition, loadingStatuses, tabIndex)=>dispatch(fetchDetailResult(condition, loadingStatuses, tabIndex)),
        tabChanged: (tabIndex) => dispatch(tabChanged(tabIndex)),
    };
}

/**
 * connect连接之后container将会接受store里的全局state以及一个可操作的dispatch
 */
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailContainer);
