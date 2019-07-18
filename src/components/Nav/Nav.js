import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
// @material-ui/icons
import Home from "@material-ui/icons/HomeRounded";
import ListIcon from "@material-ui/icons/ListAltRounded";

// look into random number of array
// var randomize = props.stuff[Math.floor(Math.random() * props.stuff.length)];
// console.log(props.user.id);

const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      {/* LOOK INTO CONDITIONAL RENDORING FOR NAMES ENDING WITH S and set default to Jarvis' List*/}
      <h2 className="nav-title">Jarvis' List <ListIcon/></h2>
    </Link>
    <div className="nav-right">
      <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? <Home /> : 'Login / Register'}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          {/* <Link className="nav-link" to="/details">
            RandOmize and Utilize
          </Link> */}
          <Link className="nav-link" to="/add">
            Add Stuff
          </Link>
          <LogOutButton className="nav-link"/>
        </>
      )}
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
  // stuff: state.stuff
});

export default connect(mapStateToProps)(Nav);
