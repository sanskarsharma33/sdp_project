import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import store from '../store';
import { PRODUCT_LOADING_FAIL } from '../actions/types';

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };
  render() {
    const { isAuthenticated, user, isLoading } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/Home/" className="nav-link">
            Home
          </Link>
        </li>
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user['first_name'] ? user['first_name'] : user['email']}` : ''}</strong>
        </span>
        
        <li className="nav-item">
          <button onClick={this.props.logout} className="nav-link btn btn-info btn-sm text-light">
            Logout
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register/customer" className="nav-link">
            Register Customer
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register/vendor" className="nav-link">
            Register Vendor
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );
    if(!isLoading)
    {
      return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <a className="navbar-brand" href="#">
                SDP
              </a>
            </div>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </nav>
      );
    }
    return(<div></div>)
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);