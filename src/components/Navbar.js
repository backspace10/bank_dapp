import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';

class Navbar extends Component {

  render() {
    return (
        <nav>
          <div class="nav-wrapper" style={{background:"#481380"}}>
            <NavLink to="#" class="brand-logo">Banking DAPP</NavLink>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li><NavLink to="/">Dashboard</NavLink></li>
              <li><NavLink to="/check">Cheque</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              
              <li><Button variant="contained" color="secondary" onClick={(event)=> {
                            this.props.returnBalance()
                            }} style={{margin: "10px"}}>
                              Get Balance
            </Button></li>
              <li>Active a/c: <span id="account" style={{margin: "10px"}}>{this.props.account}</span></li>
            </ul>
          </div>
        </nav>
    );
  }
}
export default Navbar;