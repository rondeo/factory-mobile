import React, { useContext } from 'react';
import './App.css';
import { HashRouter, Route, Redirect } from 'react-router-dom'
import LoginView from './view/LoginView'
import MainView from './view/MainView'
import BugView from './view/bug/BugView'
import DeviceView from './view/device/DeviceView'
import { AppDataContext } from './AppData'

function App() {
  const { appState } = useContext(AppDataContext)
  
  return <HashRouter >
    <Route path="/" exact component={LoginView} />
    <Route path="/main" exact render={props => appState.user.id >= 0 ? <MainView {...props}/> : <Redirect to='/' />} />
    <Route path="/bug" exact render={props => appState.user.id >= 0 ? <BugView {...props}/> : <Redirect to='/' />} />
    <Route path="/device" exact render={props => appState.user.id >= 0 ? <DeviceView {...props}/> : <Redirect to='/' />} />
  </HashRouter>
}

export default App;
