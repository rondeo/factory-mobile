import React from 'react';
import './App.css';
import { HashRouter, Route } from 'react-router-dom'
import LoginView from './view/LoginView'
import MainView from './view/MainView'
import BugDetailView from './view/bug/BugDetailView'

function App() {
  return <HashRouter >
    <Route path="/" exact component={LoginView} />
    <Route path="/main" exact component={MainView} />
    <Route path="/bugdetail/:id" exact component={BugDetailView} />
  </HashRouter>
}

export default App;
