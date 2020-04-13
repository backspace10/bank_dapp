import React, { Component } from 'react';
import Web3 from 'web3';
import Marketplace from '../abis/Marketplace.json'
import Navbar from './Navbar';
import Main from './Main';
import './App.css';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import AboutPage from './About.js';
import Dashboard from './Dashboard.js';
import CheckDashboard from './CheckDashboard';



class App extends Component {

  render() {
    return (

      <BrowserRouter>
        
         <Route exact path='/' component={Dashboard}></Route>
         <Route exact path='/check' component={CheckDashboard}></Route>
         <Route exact path='/about' component={AboutPage}></Route>
     
      
      </BrowserRouter>
      
    );
  }
}

export default App;