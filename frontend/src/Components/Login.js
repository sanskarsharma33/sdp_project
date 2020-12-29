import React, { Component } from 'react'
import PropTypes from 'prop-types'
import http from './../http-common'

export default class Login extends Component {
    static propTypes = {
        prop: PropTypes
    }
    handleSignIn(e) {
        e.preventDefault()
        let username = this.refs.username.value
        let password = this.refs.password.value
        http.post('Authuser/signin', {
            "username":username,
            "password":password
        })
        .then(response => {
            console.log(response.data['token'])
            localStorage.setItem('token',response.data['token'])
        });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSignIn.bind(this)}>
                    <h3>Sign in</h3>
                    <input type="text" ref="username" placeholder="enter you username" />
                    <input type="password" ref="password" placeholder="enter password" />
                    <input type="submit" value="Login" />
                </form>
            </div>
        )
    }
}
