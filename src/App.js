import React from 'react';
import './App.css';
import { HashRouter, Route } from 'react-router-dom'
import LoginView from './view/LoginView'
import MainView from './view/MainView'
import BugView from './view/bug/BugView'
import DeviceView from './view/device/DeviceView'

function App() {
  return <HashRouter >
    <Route path="/" exact component={LoginView} />
    <Route path="/main" exact component={MainView} />
    <Route path="/bug" exact component={BugView} />
    <Route path="/device" exact component={DeviceView} />
  </HashRouter>
}

export default App;
