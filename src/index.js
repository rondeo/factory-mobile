import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppData from './AppData'
import App from './App'
import * as serviceWorker from './serviceWorker';
import 'antd-mobile/dist/antd-mobile.css'

ReactDOM.render(<AppData><App></App></AppData>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
