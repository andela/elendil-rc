import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import ReactStars from "react-stars";
import { ShopRatings } from "/lib/collections";
import { Reaction } from "/client/api";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";

class ShopRating extends Component {
  static propTypes = {
    query: PropTypes.object,
    shopRatings: PropTypes.arrayOf(PropTypes.object),
    userRatingScore: PropTypes.array
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

  getShopAverageRating() {
    const ratings = this.props.shopRatings;
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
    const { query: { userId, shopId } } = this.props;
    this.setState({ selectedRating: rating });
    Meteor.call("shopRating/postRating", userId, shopId, rating, (error) => {
      if (error) {
        Alerts.toast(error.reason, "error");
      } else {
        Alerts.toast("Thanks for rating this shop", "success");
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
    const { avgRating, ratingsCount } = this.getShopAverageRating();
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
            <ReactStars
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
  const shopId = Reaction.Router.getQueryParam("_");

  if (shopId) {
    onData(null, {
      shopRatings: ShopRatings.find({ shopId }).fetch(),
      userRatingScore: ShopRatings.find({ userId, shopId }).fetch(),
      query: {
        userId,
        shopId
      }
    });
  } else {
    onData(null, {});
  }
}

registerComponent("ShopRating", ShopRating);

export default composeWithTracker(composer)(ShopRating);
