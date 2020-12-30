import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Provider as AlertProvider } from 'react-alert';
import Login from './Components/Login'
import CustomerRegister from './Components/CustomerRegister'
import VendorRegister from './Components/VendorRegister'
import Header from './Components/Header'
import Navbar from './Components/Navbar'
import axios from 'axios'
import http from './http-common'
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

export default class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Header />
                    <div className="container">
                        <Switch>
                            <Route exact path="/login/" component={Login} />
                            <Route path="/register/customer" component={CustomerRegister} />
                            <Route path="/register/vendor" component={VendorRegister} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        )
    }
}
