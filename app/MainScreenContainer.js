'use strict';
import React from 'react';
import {connect} from 'react-redux';
import MainScreen from './MainScreen';

import {changeTab} from './actions/MainAction';

class MainScreenContainer extends React.Component {
    render() {
        return (
            <MainScreen {...this.props} />
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
        selectedTab: state.MainReducer.selectedTab
    };
}

/**
 * 定义子组件接受的函数
 * @param dispatch
 * @returns {{changeTab: (function(*=): *)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        changeTab: (label) => dispatch(changeTab(label))
    };
}

/**
 * connect连接之后container将会接受store里的全局state以及一个可操作的dispatch
 */
export default connect(mapStateToProps, mapDispatchToProps)(MainScreenContainer);
