import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { login } from '../actions/auth';
import store from '../store';
import { getAllProductList } from '../actions/productList';
import { Link, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import productList from '../reducers/productList';

export class Home extends Component {

    static propTypes = {
        productList : PropTypes.object,
    };

    componentDidMount(){
        store.dispatch(getAllProductList());
    }

    render() {
        const productList = this.props.productList;
        return (
            <div>
                <div className="container">
                        <div className="row">
                {
                    productList ?
                    
                    productList.map(element => element.image.map(image=>{
                        return (
                            <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                            <div className="card">
                                <img className="card-img" src={`http://127.0.0.1:8000${image}`} style={{height: "20rem"}} alt="Vans" ></img>
                                <div className="card-img-overlay d-flex justify-content-end">
                                <a href="#" className="card-link text-danger like" style={{fontSize: "1.5rem"}}>
                                    <i className="fas fa-heart"></i>
                                </a>
                                </div>
                                <div className="card-body">
                                    <h4 className="card-title">Vans Sk8-Hi MTE Shoes</h4>
                                    <h6 className="card-subtitle mb-2 text-muted">Style: VA33TXRJ5</h6>
                                    <p className="card-text">
                                        The Vans All-Weather MTE Collection features footwear and apparel designed to withstand the elements whilst still looking cool.             </p>
                                    <div className="options d-flex flex-fill">
                                        <select className="custom-select mr-1">
                                            <option selected>Color</option>
                                            <option value="1">Green</option>
                                            <option value="2">Blue</option>
                                            <option value="3">Red</option>
                                        </select>
                                        <select className="custom-select ml-1">
                                            <option selected>Size</option>
                                            <option value="1">41</option>
                                            <option value="2">42</option>
                                            <option value="3">43</option>
                                        </select>
                                    </div>
                                    <div className="buy d-flex justify-content-between align-items-center">
                                        <div className="price text-success"><h5 className="mt-4">$125</h5></div>
                                        <a href="#" className="btn btn-danger mt-3"><i className="fas fa-shopping-cart"></i> Add to Cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                            
                        )
                    {/* //  <img src={`http://127.0.0.1:8000${image}`} /> */}
                    }))
                     : "No products"
                }
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    // console.log(state)
    productList: state.productList.productList,
  });
export default connect(mapStateToProps)(Home);
