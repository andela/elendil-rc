import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";

import roundToTwo from "../../helpers/roundToTwo";

class WalletCheckout extends Component {
  state = {
    showBody: false
  }

  handleButtonClick = () => {
    this.props.checkout(this.props.wallet)
      .then((walletCheckoutSuccess) => {
        Alerts.toast(walletCheckoutSuccess.message);
      })
      .catch((walletCheckoutError) => {
        Alerts.toast(walletCheckoutError.message, walletCheckoutError.type);
      });
  }

  toggleBody = () => {
    this.setState({ showBody: !this.state.showBody });
  }

  render() {
    const { showBody } = this.state;
    return (
      <div className="panel panel-default wallet-checkout">
        <Components.Button
          status="secondary"
          buttonType="submit"
          onClick={this.toggleBody}
          bezelStyle="solid"
          style={{ fontSize: "18px", color: "white", backgroundColor: "orange" }}
          label={"Pay with wallet"}
        />
        {
          showBody &&
          <div className="panel-body">
            <p className="wallet-checkout__balance">
              Balance: ₦{roundToTwo(this.props.wallet.balance)}
            </p>
            <button
              className="btn btn-success col-md-8 wallet-checkout__pay"
              onClick={this.handleButtonClick}
            >Pay now</button>
          </div>
        }

      </div>
    );
  }
}

WalletCheckout.propTypes = {
  checkout: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    balance: PropTypes.number.isRequired,
    ownerEmail: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired
};

export default WalletCheckout;
