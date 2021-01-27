import { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faRupeeSign,
  faPlusCircle,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Switch, Link, Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.css";
import "../../style/Cart.css";
import { deleteCartItem } from "../../actions/cart";

class CartCard extends Component {
  static propTypes = {
    //product : PropTypes.object.isRequired,
  };

  itemDelete = (e) => {
    console.log("Deleting");
    this.props.deleteCartItem(this.props.element.id);
  };
  render() {
    console.log(this.props.element);
    return (
      <div className="row mb-4">
        <div className="col-3">
          <div className="">
            <img
              className="img-fluid w-100 h-90"
              src={`http://127.0.0.1:8000${this.props.element.product.image[0]}`}
              alt={this.props.element.product.title}
            />
          </div>
        </div>
        <div className="col-9">
          <div>
            <div className="d-flex justify-content-between">
              <div>
                <h4 className="text-uppercase">
                  {this.props.element.product.title}
                </h4>
                <span className="text-muted text-uppercase describe">
                  {this.props.element.product.catagory}
                </span>
                <br />
                <span className="text-muted text-uppercase describe">
                  {this.props.element.product.details}
                </span>
                <br />
              </div>
              <div>
                <div className="input-group">
                  <span className="input-group-btn">
                    <FontAwesomeIcon icon={faMinusCircle} />
                  </span>
                  <input
                    type="text"
                    name="quantity"
                    className="number"
                    value={this.props.element.quantity}
                    min="1"
                    max="10"
                  />
                  <span className="input-group-btn">
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <button
                  className="btn btn-danger btn-lg rounded-0"
                  onClick={this.itemDelete}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <p className="mb-0">
                <span>
                  <strong id="summary">
                    <FontAwesomeIcon icon={faRupeeSign} />
                    {this.props.element.product.amount}
                  </strong>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteCartItem })(CartCard);
