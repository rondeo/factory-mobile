import React from 'react';
import './App.css';
import { HashRouter, Route } from 'react-router-dom'
import LoginView from './view/LoginView'
import MainView from './view/LoginView'

function App() {
  return <HashRouter>
    <Route path="/" component={LoginView} />
    <Route path="/main" component={MainView} />
  </HashRouter>
}

export default App;
