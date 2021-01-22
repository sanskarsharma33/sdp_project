import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { login } from '../actions/auth';
import store from '../store';
import { getAllProductList } from '../actions/productList';
import { Switch, Link, Redirect, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import ProductCard from './productCard';
import '../style/home.css';
import { PRODUCT_LOADING_FAIL } from '../actions/types';

export class Home extends Component {

    static propTypes = {
        auth: PropTypes.object,
        productList : PropTypes.object,
        isProductListLoaded: PropTypes.bool,
        isProductListUpdated: PropTypes.bool,
    };
    constructor(props){
        super(props)
        store.dispatch(getAllProductList());
    }
    handler(){
        store.dispatch(getAllProductList());
    }
    render() {
        const productList = this.props.productList;
        const {user} = this.props.auth;
        if(this.props.isProductListLoaded && user!=null)
        {
            return (
                <div>
                    <div style={{marginTop:"20px"}}>
                        <div className="row">
                    {
                        productList ?
                        
                        productList.map(element => {
                            // console.log(element)
                            // console.log(user.email)
                            if(user.is_vendor && element.vendor_email === user.email)
                            {
                                 console.log(element.id);
                                return (
                                    <div className="col-12 col-sm-4 col-md-6 col-lg-4">
                                    <ProductCard element={element} canEdit={true} handler={this.handler}/>
                                    </div>
                                )
                            }
                            else if(!user.is_vendor)
                            {
                                return (
                                    <div className="col-12 col-sm-4 col-md-6 col-lg-4">
                                    <ProductCard element={element} canEdit={false}/>
                                    </div>
                                )
                            }
                        })
                        : "No products"
                    }
                        </div>
                    </div>
                </div>
            )
        }
        else if(this.props.isProductListUpdated)
        {
            return(<div>{this.handler()}</div>)
        }
        return (<div></div>)
    }
}
const mapStateToProps = (state) => ({
    // console.log(state)
    auth: state.auth,
    productList: state.productList.productList,
    isProductListLoaded: state.productList.isProductListLoaded,
    isProductListUpdated: state.productList.isProductListUpdated
});
export default connect(mapStateToProps)(Home);
