import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import ReactStars from "react-stars";
import { ReactionProduct } from "/lib/api";
import { ProductRatings } from "/lib/collections";
import { Reaction } from "/client/api";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";

class ProductRating extends Component {
  static propTypes = {
    productRatings: PropTypes.arrayOf(PropTypes.object),
    query: PropTypes.objectOf(PropTypes.string),
    userRatingScore: PropTypes.arrayOf(PropTypes.object)
  }
  constructor() {
    super();
    this.state = {
      selectedRating: 0,
      showRatingStars: true
    };
    this.handleRating = this.handleRating.bind(this);
  }

  componentDidMount() {
    this.handleRatingDisplay();
  }

  getProductShopDetails() {
    const currentProduct = ReactionProduct.selectedProduct();
    const { shopId } = currentProduct;
    return { shopId };
  }

  getProductAverageRating() {
    const ratings = this.props.productRatings;
    const ratingsCount = ratings.length;
    const totalRatings = ratings.reduce((prevVal, elem) => prevVal + elem.rating, 0);
    const avgRating = ratingsCount ? totalRatings / ratingsCount : 0;
    return { avgRating: avgRating.toFixed(1), ratingsCount };
  }

  getPreviousUserRating() {
    if (this.props.userRatingScore.length) {
      const { userRatingScore } = this.props;
      return userRatingScore[0].rating;
    }
    return this.state.selectedRating;
  }

  handleRating(rating) {
    const { query: { userId, productId } } = this.props;
    const { shopId } = this.getProductShopDetails();
    this.setState({ selectedRating: rating });
    Meteor.call("productRating/postRating", userId, shopId, productId, rating, (error) => {
      if (error) {
        Alerts.toast(error.reason, "error");
      } else {
        Alerts.toast("Thanks for rating this product", "success");
      }
    });
  }

  handleRatingDisplay() {
    const isOwner = Reaction.hasOwnerAccess();
    const isAdmin = Reaction.hasAdminAccess();
    const isGuest = !Reaction.hasPermission("account/profile");
    if (isOwner || isAdmin || isGuest) {
      this.setState({
        showRatingStars: false
      });
    }
  }

  render() {
    const { avgRating, ratingsCount } = this.getProductAverageRating();
    const ratingValue = this.getPreviousUserRating();
    const { showRatingStars } = this.state;
    return (
      <div className="ratings-container">
        <div className="ratings-star-score">
          <img className="img-responsive" src="/resources/star.ico" />
          <div className="ratings-score-container">
            <h3>{avgRating}</h3>
          </div>
          <h6>Based on {ratingsCount} ratings</h6>
        </div>
        {showRatingStars &&
          <div>
            <h5>Have you used this product before? Rate it!</h5>
            <ReactStars
              className="rating-stars"
              count={5}
              size={24}
              value={ratingValue}
              onChange={this.handleRating}
              color2={"#ffd700"}
            />
          </div>}
      </div>
    );
  }
}

function composer(props, onData) {
  const userId = Meteor.userId();
  const productId = ReactionProduct.selectedProductId();
  const shopId = ReactionProduct.selectedProduct().shopId;

  if (productId) {
    onData(null, {
      productRatings: ProductRatings.find({ productId }).fetch(),
      userRatingScore: ProductRatings.find({ userId, shopId, productId }).fetch(),
      query: {
        userId,
        productId
      }
    });
  } else {
    onData(null, {});
  }
}

registerComponent("ProductRating", ProductRating);

export default composeWithTracker(composer)(ProductRating);
