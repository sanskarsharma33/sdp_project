import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Switch, Link, Redirect, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../../style/Cart.css";
import CartCard from "./CartCard";
import { getCartItems } from "../../actions/cart";
import { loadUser } from "../../actions/auth";
import ProductCard from "../productCard";

class Cart extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.props.getCartItems();
  }
  handler() {
    this.props.getCartItems();
  }
  render() {
    console.log(this.props.cart);
    if (!this.props.auth.isAuthenticated) {
      console.log(this.props.auth);
      return <Redirect to="/" />;
    }
    if (this.props.auth.user.is_vendor) {
      return <Redirect to="/" />;
    }
    if (this.props.cart.isCartLoading) {
      return <FontAwesomeIcon icon={faSpinner} />;
    }
    if (this.props.cart.cartUpdated) {
      console.log("a");
      return <div>{this.props.getCartItems()}</div>;
    }
    console.log(this.props.cart.cartItems);
    const cart = this.props.cart.cartItems;
    const items =
      cart && cart.length ? (
        cart.map((element) => {
          return (
            <div>
              <CartCard element={element} />
            </div>
          );
        })
      ) : (
        /**/
        <div>No Items In Cart</div>
      );
    return (
      <div>
        <h5 class="mb-4">
          Cart (<span>{this.props.cart.cartItems.length}</span> items)
        </h5>
        {items}
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCartItems, loadUser })(Cart);
