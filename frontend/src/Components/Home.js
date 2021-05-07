import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import store from '../store';
import {getAllProductList} from '../actions/productList';
import 'bootstrap/dist/css/bootstrap.css';
import ProductCard from './productCard';
import '../style/home.css';
import {getCartItems} from '../actions/cart';

export class Home extends Component {
    static propTypes = {
        auth: PropTypes.object,
        productList: PropTypes.object,
        isProductListLoaded: PropTypes.bool,
        isProductListUpdated: PropTypes.bool,
        cartItems: PropTypes.object.isRequired,
        cartUpdated: PropTypes.bool,
    };
    state = {
        search: '',
        found: false,
        productList: [],
    };
    onChange = (e) => {
        console.log(e.target.name);
        this.setState({[e.target.name]: e.target.value});
    };
    constructor(props) {
        super(props);
        store.dispatch(getAllProductList());
    }
    handler() {
        store.dispatch(getAllProductList());
    }
    onSearch = () => {
        // var productlist = this.props.productList.filter((name) => {
        //     if (
        //         name.title.toString().toLowerCase() ==
        //         this.state.search.toString().toLowerCase()
        //     ) {
        //         return name;
        //     }
        // });

        var productlist = this.props.productList.filter((product) =>
            product.title
                .toLowerCase()
                .includes(this.state.search.toLowerCase())
        );

        console.log(productlist.length);
        if (productlist.length == 0) {
            this.setState({found: false});
        } else {
            this.setState({found: true});
        }
        this.setState({productList: productlist});
    };
    render() {
        var productList = this.props.productList;
        const {user} = this.props.auth;
        if (this.state.found) {
            console.log('Searched items loaded');
            console.log(this.state.productList);
            if (this.state.productList.length == 0)
                productList = this.props.productList;
            else productList = this.state.productList;
            console.log(productList);
        }
        if (!user) {
            return <Redirect to="/Login" />;
        }
        if (!user.is_vendor && this.props.cartUpdated) {
            return <div>{this.props.getCartItems()}</div>;
        }
        if (this.props.isProductListLoaded && user != null) {
            return (
                <div>
                    <br></br>
                    <div className="input-group">
                        <div className="form-outline row">
                            <div>
                                <input
                                    type="search"
                                    name="search"
                                    className="form-control d-inline"
                                    value={this.state.search}
                                    onChange={this.onChange}
                                />
                            </div>
                            &nbsp; &nbsp; &nbsp; &nbsp;
                            <div>
                                <button
                                    className="btn btn-success d-inline"
                                    onClick={this.onSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <div className="row" style={{marginTop: '20px'}}>
                            {productList
                                ? productList.map((element) => {
                                      // console.log(element)
                                      // console.log(user.email)
                                      if (
                                          user.is_vendor &&
                                          element.vendor_email === user.email
                                      ) {
                                          console.log(element.id);
                                          return (
                                              <div className="col-12 col-sm-4 col-md-6 col-lg-4">
                                                  <ProductCard
                                                      element={element}
                                                      canEdit={true}
                                                      handler={this.handler}
                                                  />
                                              </div>
                                          );
                                      } else if (!user.is_vendor) {
                                          return (
                                              <div className="col-12 col-sm-4 col-md-6 col-lg-4">
                                                  <ProductCard
                                                      element={element}
                                                      canEdit={false}
                                                  />
                                              </div>
                                          );
                                      }
                                  })
                                : 'No products'}
                        </div>
                    </div>
                </div>
            );
        } else if (this.props.isProductListUpdated) {
            return <div>{this.handler()}</div>;
        }
        return <div />;
    }
}
const mapStateToProps = (state) => ({
    // console.log(state)
    auth: state.auth,
    productList: state.productList.productList,
    isProductListLoaded: state.productList.isProductListLoaded,
    isProductListUpdated: state.productList.isProductListUpdated,
    cartItems: state.cart.cartItems,
    cartUpdated: state.cart.cartUpdated,
});
export default connect(mapStateToProps, {getCartItems})(Home);
