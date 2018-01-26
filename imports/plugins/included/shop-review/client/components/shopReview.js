import React, { Component } from "react";
import { Reaction } from "/client/api";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import Review from "./review";
import ShopRating from "./shopRating";
import UpdateReview from "./updateReview";
import { ShopReviews, ShopRatings } from "/lib/collections";
import { Components, registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";

class ShopReview extends Component {
  static propTypes = {
    query: PropTypes.object,
    shopReviews: PropTypes.arrayOf(PropTypes.object)
  }
  constructor(props) {
    super(props);
    this.state = {
      review: "",
      editReview: "",
      editReviewId: "",
      index: "",
      displayReviewform: true,
      displayEditForm: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleReviewUpdate = this.handleReviewUpdate.bind(this);
  }

  componentDidMount() {
    this.handleFormDisplay();
  }

  handleChange(event, value, field) {
    this.setState({
      [field]: value
    });
  }

  handleFormDisplay() {
    const isOwner = Reaction.hasOwnerAccess();
    const isAdmin = Reaction.hasAdminAccess();
    const isGuest = !Reaction.hasPermission("account/profile");
    if (isOwner || isAdmin || isGuest) {
      this.setState({
        displayReviewform: false
      });
      return false;
    }
    return true;
  }

  getCurrentUserDetails() {
    const user = Meteor.user();
    if (Reaction.hasPermission("account/profile")) {
      return {
        name: user.name,
        email: user.emails[0].address
      };
    }
    return {
      name: "Guest",
      email: ""
    };
  }

  handleDelete(event) {
    const { id } = event.target;
    const { query: { userId, shopId } } = this.props;
    Meteor.call("shopReview/deleteReview", id, userId, shopId, (error) => {
      if (error) {
        Alerts.toast(error.reason, "error");
      } else {
        Alerts.toast("Review deleted", "success");
      }
    });
  }

  handleUpdate(event) {
    const { id } = event.target;
    this.setState({
      displayEditForm: true,
      editReviewId: id,
      editReview: event.target.getAttribute("content"),
      index: event.target.getAttribute("data-index")
    });
  }

  handleReviewUpdate(event) {
    event.preventDefault();
    const { editReviewId, editReview } = this.state;
    const { query: { userId, shopId } } = this.props;

    Meteor.call(
      "shopReview/updateReview",
      editReviewId, userId, shopId, editReview, (error) => {
        if (error) {
          Alerts.toast(error.reason, "error");
        } else {
          Alerts.toast("Review updated", "success");
        }
      });
    this.setState({
      editReview: "",
      editReviewId: "",
      displayEditForm: false,
      index: ""
    });
  }

  handleSubmit(event, value) {
    event.preventDefault();

    const { query: { userId, shopId } } = this.props;
    Meteor.call(
      "shopReview/postReview",
      userId, shopId, value, (error) => {
        if (error) {
          Alerts.toast(error.reason || error, "error");
        } else {
          Alerts.toast("Thanks for reviewing", "success");
        }
      });
    this.setState({
      review: ""
    });
  }

  renderReviews(index) {
    const review = this.props.shopReviews[index];
    const { query: { shopId } } = this.props;
    let userRating = ShopRatings.find({ userId: review.userId, shopId }).fetch();
    userRating = userRating.length ? userRating[0].rating : 0;
    return (
      <Review
        key={review._id}
        id={review._id}
        rating={userRating}
        index={index}
        content={review}
        delete={this.handleDelete}
        update={this.handleUpdate}
        currentUserId={Meteor.userId()}
      />
    );
  }

  handleCancel(event) {
    event.preventDefault();

    this.setState({
      editReview: "",
      editReviewId: "",
      displayEditForm: false,
      index: ""
    });
  }

  render() {
    const shopName = Reaction.Router.getParam("shopName");
    const { name, email } = this.getCurrentUserDetails();
    const { displayReviewform } = this.state;
    return (
      <div>
        <div className="shop-review-container">
          <h1 className="page-header">Ratings and Reviews for { shopName}</h1>
        </div>
        <div className="row"
          style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}
        >
          <div className="col-lg-6 col-sm-10 col-md-8 col-xs-10 sub-content" style={{ margin: "auto" }}>
            <ShopRating />
            {displayReviewform ?
              <h3 onClick={this.handleClick}>Drop a review</h3> :
              <div>
                <h3 onClick={this.handleClick}>Reviews</h3>
                <h5>Login to review this shop</h5>
              </div>
            }
            <Components.Card>
              <Components.CardHeader
                i18nKeyTitle={name}
                title={name}
              />
              <Components.CardBody>
                { displayReviewform &&
              <div className="row">
                <div className="col-lg-2 hidden-xs hidden-sm hidden-md">
                  <Components.ReactionAvatar
                    size={80}
                    style={{ marginTop: 5 }}
                    className={"img-responsive"}
                    email={email}
                    name={name}
                    round
                  />
                </div>
                <form className="">
                  <div className="form-group col-lg-10">
                    <Components.TextField
                      name="review"
                      label="Review"
                      type="text"
                      multiline
                      onChange={this.handleChange}
                      value={this.state.review}
                      i18nKeyPlaceholder="Drop your review..."
                    />
                  </div>
                  <div style={{ paddingRight: 5 }}>
                    <Components.Button
                      bezelStyle="solid"
                      buttonType="submit"
                      className="btn btn-primary pull-right"
                      value={this.state.review}
                      onClick={this.handleSubmit}
                    >
                        Post review
                    </Components.Button>
                  </div>
                </form>
              </div>}
                <div>
                  {this.props.shopReviews.length ?
                    <div>
                      {this.props.shopReviews.map((review, index) => {
                        if (index.toString() === this.state.index) {
                          return (
                            <UpdateReview
                              key={review._id}
                              name={name}
                              email={email}
                              index={index}
                              handleCancel={this.handleCancel}
                              handleChange={this.handleChange}
                              handleUpdate={this.handleUpdate}
                              handleReviewUpdate={this.handleReviewUpdate}
                              value={this.state.editReview}
                            />
                          );
                        }
                        return this.renderReviews(index);
                      })}
                    </div> :
                    <h5>Be the first to review this shop</h5>
                  }
                </div>
              </Components.CardBody>
            </Components.Card>
          </div>
        </div>
      </div>
    );
  }
}

function composer(props, onData) {
  const userId = Meteor.userId();
  let shopId = Reaction.Router.getQueryParam("_");
  if (shopId) {
    localStorage.setItem("shopId", shopId);
    onData(null, {
      shopReviews: ShopReviews.find({ shopId }, { sort: { createdAt: -1 }, limit: 10 }).fetch(),
      query: {
        userId,
        shopId: shopId
      }
    });
  } else if (!shopId) {
    shopId = localStorage.getItem("shopId");
    onData(null, {
      shopReviews: ShopReviews.find({ shopId }, { sort: { createdAt: -1 }, limit: 10 }).fetch(),
      query: {
        userId,
        shopId: shopId
      }
    });
  } else {
    onData(null, {});
  }
}

registerComponent("ShopReview", ShopReview);

export default composeWithTracker(composer)(ShopReview);
