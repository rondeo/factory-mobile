import React from 'react';
import './App.css';
import { HashRouter, Route } from 'react-router-dom'
import LoginView from './view/LoginView'
import MainView from './view/MainView'

function App() {
  return <HashRouter >
    <Route path="/" exact component={LoginView} />
    <Route path="/main" exact component={MainView} />
  </HashRouter>
}

export default App;
