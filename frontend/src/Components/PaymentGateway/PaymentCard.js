import React, { Component } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import CardSection from "./CardSection";
import "../../style/CardSection.css";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import { pay } from "../../actions/payment";

export class PaymentCard extends Component {
    state = {
        email: "",
        amount: 2999.99,
        stripeToken: "",
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { stripe, elements } = this.props;
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card);
        if (result.error) {
            console.log(result.error.message);
        } else {
            this.setState({ email: this.props.auth.user.email });
            this.setState({ stripeToken: result.token.id });
            this.props.pay(this.state);
        }
    };
    render() {
        console.log(this.props);
        return (
            <div className="cardcontainer">
                <form onSubmit={this.handleSubmit}>
                    <CardSection />
                    <button
                        disabled={!this.props.stripe}
                        type="submit"
                        className="btn btn-primary bg-success"
                    >
                        Buy Now
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { pay })(PaymentCard);
