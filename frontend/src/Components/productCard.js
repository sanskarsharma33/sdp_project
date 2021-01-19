import React, { Component } from 'react'
import PropTypes, { element } from 'prop-types'
import 'bootstrap/dist/css/bootstrap.css';
import '../style/productCard.css';
import store from '../store';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
    PRODUCT_LOADING,
    PRODUCT_LOADED,
    PRODUCT_LOADING_FAIL,
    PRODUCT_ADDED
  } from '../actions/types';

class ProductCard extends Component {
    static propTypes = {
        prop: PropTypes,
        isProductLoaded: PropTypes.bool,
    }
    state ={
        redirect: false,
    }
    onClick = (e) =>
    {
        e.preventDefault();
        this.setState({redirect: true}, () =>{
            this.renderRedirect();
        })
    }
    renderRedirect = () =>{
        if(this.state.redirect)
        {
            console.log("renderRedirect");
            return <Redirect to={`/Product/${this.props.element.id}`} />;
        }
    }
    render() {
        
        return (
            <div>
                {this.renderRedirect()}
            <div className="product" style={{minHeight:"30rem", maxHeight:"35rem", maxWidth:"25rem", minWidth:"15rem"}}>
              <div className="product__info">
                <p>{this.props.element.title}</p>
                <p className="product__price">
                  <small>$</small>
                  <strong>{this.props.element.amount}</strong>
                </p>
                
              </div>
        
              <img src={`http://127.0.0.1:8000${this.props.element.image[0]}`} alt="" />
        
              <button onClick={this.onClick}>Show</button>
            </div></div>
          );
        return (
            <div style={{margin:"20px 10px 10px"}}>
                    <div className="card">
                        <img className="card-img" src={`http://127.0.0.1:8000${this.props.element.image[0]}`} style={{height: "20rem", width: "20rem"}} alt="Vans" ></img>
                        <div className="card-img-overlay d-flex justify-content-end">
                        <a href="#" className="card-link text-danger like" style={{fontSize: "1.5rem"}}>
                            <i className="fas fa-heart"></i>
                        </a>
                        </div>
                        <div className="card-body">
                            <h4 className="card-title">{this.props.element.title}</h4>
                            {/* <h6 className="card-subtitle mb-2 text-muted">Style: VA33TXRJ5</h6> */}
                            <p className="card-text">
                                {this.props.element.details}
                            </p>
                            <div className="buy d-flex justify-content-between align-items-center">
                                <div className="price text-success"><h5 className="mt-4">${this.props.element.amount}</h5></div>
                                <a href="#" className="btn btn-danger mt-3"><i className="fas fa-shopping-cart"></i> Add to Cart</a>
                            </div>
                        </div>
                    </div>
            </div>
        )
        
    }
}

const mapStateToProps = (state) => ({
    isProductLoaded: state.product.isProductLoaded
});

export default connect(mapStateToProps)(ProductCard);
