import React, {Component, useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import product from '../reducers/product';
import {Link, Redirect, useParams} from 'react-router-dom';
import store from '../store';
import {
    PRODUCT_LOADING,
    PRODUCT_LOADED,
    PRODUCT_REMOVED,
} from '../actions/types';
import {
    getProduct,
    getComment,
    postComment,
    deleteComment,
} from '../actions/product';
import CommentList from './Comment/commentList';
import CommentForm from './Comment/commentForm';

class Product extends Component {
    static propTypes = {
        product: PropTypes.object,
        isProductLoaded: PropTypes.bool,
        isAuthenticated: PropTypes.bool,
        isCommentloading: PropTypes.bool,
        comments: PropTypes.object,
        isCommentloaded: PropTypes.bool,
        user: PropTypes.object,
        commentDeleted: PropTypes.bool,
    };
    constructor(props) {
        super(props);
        let id = this.props.match.params.id;

        console.log(id);
        store.dispatch(getProduct(id));
        store.dispatch(getComment(id));
    }
    componentWillUnmount() {
        store.dispatch({type: PRODUCT_REMOVED});
    }
    commentSubmitHandler = (msg) => {
        let id = this.props.match.params.id;
        let obj = {
            pid: id,
            description: msg,
        };
        this.props.postComment(obj);
        this.props.getComment(id);
    };
    getCommentsProduct = (id) => {
        store.dispatch(getComment(id));
    };
    onDelete = (e) => {
        let id = this.props.match.params.id;
        // e.preventDefault();
        // console.log(e);
        this.props.deleteComment(e.target.id);
        this.props.getComment(id);
    };
    handler = () => {
        let id = this.props.match.params.id;
        store.dispatch(getComment(id));
    };
    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
        }
        console.log(this.props.comments);
        if (this.props.isProductLoaded) {
            // return <Redirect to="/" />;
            return (
                <div>
                    <CommentList
                        loading={this.props.isCommentloading}
                        comments={this.props.comments}
                        onDelete={this.onDelete}
                        user={this.props.user.email}
                    ></CommentList>
                    <CommentForm
                        disabled={true}
                        submitHandler={this.commentSubmitHandler}
                    ></CommentForm>
                </div>
            );
            return (
                <div>
                    <div
                        id="carouselExampleIndicators"
                        className="carousel slide"
                        data-ride="carousel"
                    >
                        <ol className="carousel-indicators">
                            {this.props.product.image.map((img, index) => {
                                return (
                                    <li
                                        data-target="#carouselExampleIndicators"
                                        data-slide-to={index}
                                        className="active"
                                    ></li>
                                );
                            })}
                        </ol>
                        <div className="carousel-inner">
                            {this.props.product.image.map((img) => {
                                if (img == this.props.product.image[0])
                                    return (
                                        <div className="carousel-item active">
                                            <img
                                                className="d-block w-100"
                                                src={`http://127.0.0.1:8000${img}`}
                                                style={{
                                                    height: '30rem',
                                                    width: '10rem',
                                                }}
                                            />
                                        </div>
                                    );
                                return (
                                    <div className="carousel-item ">
                                        <img
                                            className="d-block w-100"
                                            src={`http://127.0.0.1:8000${img}`}
                                            style={{height: '30rem'}}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <a
                            className="carousel-control-prev"
                            href="#carouselExampleIndicators"
                            role="button"
                            data-slide="prev"
                        >
                            <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a
                            className="carousel-control-next"
                            href="#carouselExampleIndicators"
                            role="button"
                            data-slide="next"
                        >
                            <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                    {/* comments */}
                </div>
            );
        }
        return <div></div>;
    }
}

// function Product(props) {
//     let { id } = useParams();
//     useEffect(() => {
//         store.dispatch(getProduct(id));
//       });

//     console.log("HERE")
//     if (!props.isAuthenticated) {
//         return <Redirect to="/login" />;
//     }
//     if (!props.isProductLoaded) {
//         return <Redirect to="/" />;
//     }
//     return (
//         <div>

//             <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
//                 <ol className="carousel-indicators">
//                     {
//                         props.product.image.map((img,index) =>{
//                             return(
//                                 <li data-target="#carouselExampleIndicators" data-slide-to={index} className="active"></li>
//                             )
//                         })
//                     }
//                 </ol>
//                 <div className="carousel-inner">
//                     {
//                         props.product.image.map(img =>{
//                             if(img == props.product.image[0])
//                                 return(
//                                 <div className="carousel-item active">
//                                     <img className="d-block w-100" src={`http://127.0.0.1:8000${img}`} />
//                                 </div>)
//                             return(
//                                 <div className="carousel-item ">
//                                     <img className="d-block w-100" src={`http://127.0.0.1:8000${img}`} />
//                                 </div>
//                             )})
//                     }
//                 </div>
//                 <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
//                     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                     <span className="sr-only">Previous</span>
//                 </a>
//                 <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
//                     <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                     <span className="sr-only">Next</span>
//                 </a>
//                 </div>
//         </div>
//     )
// }

// Product.propTypes = {
//     product: PropTypes.object,
//     isProductLoaded: PropTypes.bool,
//     isAuthenticated: PropTypes.bool
// }

const mapStateToProps = (state) => ({
    product: state.product.product,
    isAuthenticated: state.auth.isAuthenticated,
    isProductLoaded: state.product.isProductLoaded,
    isCommentloading: state.product.isCommentloading,
    isCommentloaded: state.product.isCommentloaded,
    comments: state.product.comments,
    user: state.auth.user,
    commentDeleted: state.product.commentDeleted,
});

export default connect(mapStateToProps, {
    getComment,
    postComment,
    deleteComment,
})(Product);
// export default getCommentsProduct;
