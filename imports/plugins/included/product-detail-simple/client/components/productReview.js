import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import Review from "./review";
import UpdateReview from "./updateReview";
import { ReactionProduct } from "/lib/api";
import { ProductReviews, Shops, ProductRatings } from "/lib/collections";
import { Reaction } from "/client/api";
import { Components, registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";

class ProductReview extends Component {
  static propTypes = {
    productReviews: PropTypes.arrayOf(PropTypes.object),
    query: PropTypes.object,
    userRatingScore: PropTypes.array
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

  getProductShopDetails() {
    const currentProduct = ReactionProduct.selectedProduct();
    const { shopId } = currentProduct;
    const productShop = Shops.find({ _id: shopId }).fetch();
    return { merchant: productShop[0].name, shopId };
  }

  handleDelete(event) {
    const { id } = event.target;
    const { shopId } = this.getProductShopDetails();
    const { query: { userId, productId } } = this.props;
    Meteor.call("productReview/deleteReview", id, userId, shopId, productId, (error) => {
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
    const { shopId } = this.getProductShopDetails();
    const { query: { userId, productId } } = this.props;

    Meteor.call(
      "productReview/updateReview",
      editReviewId, userId, shopId, productId, editReview, (error) => {
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

    const { shopId } = this.getProductShopDetails();
    const { query: { userId, productId } } = this.props;
    Meteor.call(
      "productReview/postReview",
      userId, shopId, productId, value, (error) => {
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

  getUserRating() {
    if (this.props.userRatingScore.length) {
      const { userRatingScore } = this.props;
      return userRatingScore[0].rating;
    }
    return 0;
  }

  renderReviews(index) {
    const review = this.props.productReviews[index];
    const { query: { productId } } = this.props;
    const { shopId } = this.getProductShopDetails();
    let userRating = ProductRatings.find({ userId: review.userId, shopId, productId }).fetch();
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
    const { name, email } = this.getCurrentUserDetails();
    const { displayReviewform } = this.state;
    return (
      <div className="review-container">
        {displayReviewform ?
          <h3 onClick={this.handleClick}>Drop a review</h3> :
          <div>
            <h3 onClick={this.handleClick}>Reviews</h3>
            <h5>Login to review this product</h5>
          </div>
        }
        <Components.Card>
          <Components.CardHeader
            i18nKeyTitle={name}
            title={name}
          />
          <Components.CardBody>
            { displayReviewform && <div className="row">
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
              {this.props.productReviews.length ?
                <div>
                  {this.props.productReviews.map((review, index) => {
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
                <h5>Be the first to review this product</h5>
              }
            </div>
          </Components.CardBody>
        </Components.Card>
      </div>
    );
  }
}

function composer(props, onData) {
  const userId = Meteor.userId();
  const productId = ReactionProduct.selectedProductId();
  if (productId) {
    onData(null, {
      productReviews: ProductReviews.find({ productId }, { sort: { createdAt: -1 }, limit: 10 }).fetch(),
      query: {
        userId,
        productId
      }
    });
  } else {
    onData(null, {});
  }
}

registerComponent("ProductReview", ProductReview);

export default composeWithTracker(composer)(ProductReview);
