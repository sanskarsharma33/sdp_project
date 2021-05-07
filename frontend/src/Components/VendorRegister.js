import React, {Component} from 'react';
import PropTypes from 'prop-types';
import http from '../http-common';
import {connect} from 'react-redux';
import {registerVendor} from '../actions/auth';
import {Link, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

export class VendorRegister extends Component {
    state = {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
        is_vendor: true,
        password: '',
        password2: '',
        shop_name: '',
        address: '',
        location_long: -1,
        location_lat: -1,
        pincode: '',
        cod_available: true,
        transaction_id: 'not added',
        is_active: false,
    };

    static propTypes = {
        registerVendor: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    };

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.registerVendor(this.state);
    };

    onChange = (e) => {
        console.log(e.target.name);
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        const {
            username,
            password,
            password2,
            first_name,
            last_name,
            phone,
            is_vendor,
            email,
            shop_name,
            address,
            location_long,
            location_lat,
            pincode,
            cod_available,
            transaction_id,
            is_active,
        } = this.state;
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Register Vendor</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={this.onChange}
                                value={username}
                            />
                        </div>
                        <div className="form-group">
                            <label>firstname</label>
                            <input
                                type="text"
                                className="form-control"
                                name="first_name"
                                onChange={this.onChange}
                                value={first_name}
                            />
                        </div>
                        <div className="form-group">
                            <label>lastname</label>
                            <input
                                type="text"
                                className="form-control"
                                name="last_name"
                                onChange={this.onChange}
                                value={last_name}
                            />
                        </div>
                        <div className="form-group">
                            <label>email</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                onChange={this.onChange}
                                value={email}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange}
                                value={password}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password2"
                                onChange={this.onChange}
                                value={password2}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                onChange={this.onChange}
                                value={phone}
                            />
                        </div>
                        <div className="form-group">
                            <label>Shop name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="shop_name"
                                onChange={this.onChange}
                                value={shop_name}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                onChange={this.onChange}
                                value={address}
                            />
                        </div>

                        <div className="form-group">
                            <label>Pincode</label>
                            <input
                                type="text"
                                className="form-control"
                                name="pincode"
                                onChange={this.onChange}
                                value={pincode}
                            />
                        </div>

                        <input
                            hidden
                            name="is_vendor"
                            value={is_vendor}
                        ></input>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {registerVendor})(VendorRegister);
