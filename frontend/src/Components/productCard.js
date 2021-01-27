import React, { Component } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.css";
import "../style/productCard.css";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { delete_Product } from "../actions/product";
import { addToCart, getCartItems } from "../actions/cart";

class ProductCard extends Component {
  static propTypes = {
    prop: PropTypes,
    isProductLoaded: PropTypes.bool,
    isProductDeleted: PropTypes.bool,
    cartUpdated: PropTypes.bool,
    cartItems: PropTypes.object.isRequired,
    isCartLoading: PropTypes.bool,
  };
  state = {
    redirect: false,
    Editredirect: false,
    pid: 0,
    quantity: 1,
    flag: true,
    isInCart: false,
  };
  constructor(props) {
    super(props);
    this.props.getCartItems();
    /*this.props.cartItems.forEach((e) => {
      if (e.product.id == this.props.element.id) {
        this.setState({ isInCart: true });
        this.setState({ quantity: e.quantity });
      }
    });*/
  }

  async UpdateState() {
    await this.props.cartItems.forEach((e) => {
      if (e.product.id === this.props.element.id) {
        console.log("a");
        this.setState({ isInCart: true });
        this.setState({ quantity: e.quantity });
      }
    });
    console.log(this.state);
  }

  componentDidUpdate() {
    if (!this.props.isCartLoading) {
      if (this.state.flag) {
        //console.log(this.props.vendor);
        this.setState({ flag: false });
        this.UpdateState();
      }
    }
  }

  addToCart = (e) => {
    e.preventDefault();
    this.state.pid = this.props.element.id;
    this.state.quantity = 1;
    this.props.addToCart(this.state);
  };
  onClick = (e) => {
    e.preventDefault();
    this.setState({ redirect: true }, () => {
      this.renderRedirect();
    });
  };
  onEditClick = (e) => {
    e.preventDefault();
    console.log("Edit");
    this.setState({ Editredirect: true }, () => {
      this.renderRedirect();
    });
  };
  onDeleteClick = (e) => {
    // e.preventDefault();
    // store.dispatch({type:PRODUCT_LIST_UPDATING})
    this.props.delete_Product(this.props.element.id);
  };
  onUploadImagesClick = (e) => {
    // e.preventDefault();
    // store.dispatch({type:PRODUCT_LIST_UPDATING})
    return <Redirect to={`/Product/UploadImages/${this.props.element.id}`} />;
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      console.log("renderRedirect");
      return <Redirect to={`/Product/${this.props.element.id}`} />;
    }
    if (this.state.Editredirect)
      return <Redirect to={`/Product/Edit/${this.props.element.id}`} />;
    if (this.props.isProductDeleted) this.props.handler();
  };
  render() {
    return (
      <div>
        {this.renderRedirect()}
        <div
          className="product"
          style={{
            minHeight: "30rem",
            maxHeight: "35rem",
            maxWidth: "25rem",
            minWidth: "15rem",
          }}
        >
          <div className="product__info">
            <p>{this.props.element.title}</p>
            <p className="product__price">
              <small>$</small>
              <strong>{this.props.element.amount}</strong>
            </p>
          </div>
          <img
            src={`http://127.0.0.1:8000${this.props.element.image[0]}`}
            alt=""
          />
          {this.props.canEdit ? (
            <div>
              <Link to={`/Product/Images/${this.props.element.id}`}>
                <button> Images</button>
              </Link>
              <Link to={`/Product/UploadImages/${this.props.element.id}`}>
                <button> Add Images</button>
              </Link>
              <button onClick={this.onEditClick}>Edit</button>{" "}
              <button onClick={this.onDeleteClick}>Delete</button>
            </div>
          ) : (
            <div>
              {this.props.isCartLoading ? (
                <FontAwesomeIcon icon={faSpinner} />
              ) : (
                <div>
                  <button onClick={this.onClick}>Show</button>
                  {this.state.isInCart ? (
                    <span>Added To Cart</span>
                  ) : (
                    <button onClick={this.addToCart}>Add To Cart</button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
    // return (
    //     <div style={{margin:"20px 10px 10px"}}>
    //     {this.renderRedirect()}
    //         <div className="card" style={{maxWidth: "20rem"}}>
    //             <img className="card-img" src={`http://127.0.0.1:8000${this.props.element.image[0]}`} style={{maxHeight: "20rem", maxWidth: "20rem"}} alt="Vans" ></img>
    //             <div className="card-img-overlay d-flex justify-content-end">
    //             <a href="#" className="card-link text-danger like" style={{fontSize: "1.5rem"}}>
    //                 <i className="fas fa-heart"></i>
    //             </a>
    //             </div>
    //             <div className="card-body">
    //                 <h4 className="card-title">{this.props.element.title}</h4>
    //                 {/* <h6 className="card-subtitle mb-2 text-muted">Style: VA33TXRJ5</h6> */}
    //                 <p className="card-text">
    //                     {this.props.element.details}
    //                 </p>
    //                 <div className="buy d-flex justify-content-between align-items-center">
    //                     <div className="price text-success"><h5 className="mt-4">${this.props.element.amount}</h5></div>
    //                     <a href="#" className="btn btn-danger mt-3"><i className="fas fa-shopping-cart"></i> Add to Cart</a>
    //                 </div>
    //             </div>
    //         </div>
    // </div>
    // )
  }
}

const mapStateToProps = (state) => ({
  isProductLoaded: state.product.isProductLoaded,
  isProductListUpdating: state.product.isProductDeleted,
  cartUpdated: state.cart.cartUpdated,
  cartItems: state.cart.cartItems,
  isCartLoading: state.cart.isCartLoading,
});

export default connect(mapStateToProps, {
  delete_Product,
  addToCart,
  getCartItems,
})(ProductCard);
