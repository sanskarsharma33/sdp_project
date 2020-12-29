import React, { Component } from 'react'
import Login from './Components/Login'
import Register from './Components/Register'
import Navbar from './Components/Navbar'
import axios from 'axios'
import http from './http-common'

export default class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          displayed_form: '',
          logged_in: localStorage.getItem('token') ? true : false,
          username: ''
        };
    }

    componentDidMount() {
        if (this.state.logged_in) {
            http.get('Authuser/get_user', {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                console.log(response.data)
                this.setState({ username: response.data['username'] });
            });
        }
    }

    render() {
        return (
            <div>
                {this.state.username}
                <Login/>    
            </div>
        )
    }
}
