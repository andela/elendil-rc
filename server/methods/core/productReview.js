import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import * as Collections from "/lib/collections";
import {  Reaction } from "/server/api";

/**
 * @file Methods for posting and managing product reviews.
 * Run these methods using `Meteor.call()`.
 * @example Meteor.call("productReview/postReview", userId, shop._id, product._id, review)
 * @namespace Methods/ProductReview
*/

/**
 * @method checkUserPermissions
 * @private
 * @summary Perform check to see if user is owner or admin
 * @return {Boolean} - check user permission status
 */
function checkUserPermissions() {
  const isOwner = Reaction.hasOwnerAccess();
  const isAdmin = Reaction.hasAdminAccess();
  const isGuest = !Reaction.hasPermission("account/profile");

  return (isOwner || isAdmin || isGuest);
}

Meteor.methods({
  /**
   * @name productReview/postReview
   * @method
   * @memberof Methods/ProductReview
   * @summary Allows authenticated users that are not of owner or admin post reviews for products
   * It checks if the current user is a just a customer
   * @param {String} userId - id of the user posting the review
   * @param {String} shopId - id of the shop the product being viewed belongs
   * @param {String} productId - id of the product being reviewed
   * @param {String} review - review of the product from the user
   * @return {Void} - or Error object on failure
   */
  "productReview/postReview": function (userId, shopId, productId, review) {
    check(userId, String);
    check(shopId, String);
    check(productId, String);
    check(review, String);

    if (checkUserPermissions()) {
      throw new Meteor.Error(403, "Owners or Admins can't review");
    }

    if (Meteor.user().name) {
      const name = Meteor.user().name;
      const email = Meteor.user().emails[0].address;
      Collections.ProductReviews.insert({
        name: name,
        email: email,
        userId: userId,
        shopId: shopId,
        productId: productId,
        review: review
      });
    } else {
      throw new Meteor.Error(401, "Please update account profile");
    }
  },
  /**
   * @name productReview/deleteReview
   * @method
   * @memberof Methods/ProductReview
   * @summary Allows authenticated users that are not of owner or admin delete their reviews
   * @param {String} id - id of the review to be deleted
   * @param {String} userId - id of the user
   * @param {String} shopId - id of the shop
   * @param {String} productId - id of the product
   * @return {Void} - or Error object on failure
   */
  "productReview/deleteReview": function (id, userId, shopId, productId) {
    check(id, String);
    check(userId, String);
    check(shopId, String);
    check(productId, String);

    const review = Collections.ProductReviews.findOne({ _id: id, userId, shopId, productId });
    if (review && (review.userId === userId)) {
      Collections.ProductReviews.remove({ _id: id, userId, shopId, productId });
    } else {
      throw new Meteor.Error(401, "Access denied");
    }
  },
  /**
   * @name updateReview/deleteReview
   * @method
   * @memberof Methods/ProductReview
   * @summary Allows authenticated users that are not of owner or admin delete their reviews
   * @param {String} id - id of the review to be edited
   * @param {String} userId - id of the user
   * @param {String} shopId - id of the shop
   * @param {String} productId - id of the product
   * @param {String} newReview - updated comment on product to replace exixting one
   * @return {Void} - or Error object on failure
   */
  "productReview/updateReview": function (id, userId, shopId, productId, newReview) {
    check(id, String);
    check(userId, String);
    check(shopId, String);
    check(productId, String);
    check(newReview, String);

    const review = Collections.ProductReviews.findOne({ _id: id, userId, shopId, productId });
    if (review && (review.userId === userId)) {
      Collections.ProductReviews.update({ _id: id, userId, shopId, productId }, { $set: { review: newReview } });
    } else {
      throw new Meteor.Error(401, "Access denied");
    }
  }
});
