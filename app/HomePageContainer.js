/**
 * Created by xiayumo on 16/9/19.
 */
'use strict';
import React from 'react';
import {connect} from 'react-redux';
import HomePage from './HomePage';

import {fetchHomeResult, fetchHomeRefreshResult} from './actions/HomeAction';

class HomePageContainer extends React.Component {
    render() {
        return (
            <HomePage {...this.props} />
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
        isLoading: state.HomeReducer.isLoading,
        isRefreshing: state.HomeReducer.isRefreshing,
        resultDto: state.HomeReducer.resultDto,
    };
}

/**
 * 定义子组件接受的函数
 * @param dispatch
 * @returns {{changeTab: (function(*=): *)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        fetchHomeResult: () => dispatch(fetchHomeResult()),
        fetchHomeRefreshResult: () => dispatch(fetchHomeRefreshResult())
    };
}

/**
 * connect连接之后container将会接受store里的全局state以及一个可操作的dispatch
 */
export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);

