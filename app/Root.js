'use strict';

/**
 * 导入Provider
 */
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';

import configureStore from './store/store'
const store = configureStore();

/**
 * 配置store
 */
export default class Root extends React.Component {
    render() {
        return (
            <Provider store = {store} >
                <App />
            </Provider>
        )
    }
}