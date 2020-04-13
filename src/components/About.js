import React, { Component } from 'react';
import Web3 from 'web3';
import Marketplace from '../abis/Marketplace.json'
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Navbar from './Navbar';
import {Link, NavLink} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';



  class AboutPage extends Component{

   

    render() {
        return (

            <React.Fragment>

            <nav>
                <div class="nav-wrapper" style={{background:"#481380"}}>
                <NavLink to="#" class="brand-logo">Banking DAPP</NavLink>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><NavLink to="/">Dashboard</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    
                    {/* <li>Active a/c: <span id="account" style={{margin: "10px"}}>{this.props.account}</span></li> */}
                </ul>
                </div>
            </nav>
                <CssBaseline />
                <Container fixed>
               
                

                <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} >

                    <h1>About Page</h1>
                </Typography>
               
                </Container>
                
            </React.Fragment>
             
        );
    }

  }

 export default AboutPage;


