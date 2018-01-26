import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ProductRatings } from "/lib/collections";
import {  Reaction } from "/server/api";

/**
 * @file Methods for rating products.
 * Run these methods using `Meteor.call()`.
 * @example Meteor.call("productRating/postRating", userId, shop._id, product._id, rating)
 * @namespace Methods/ProductRating
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
   * @name productRating/postRating
   * @method
   * @memberof Methods/ProductRating
   * @summary Allows authenticated users that are not of owner or admin rate products
   * It checks if the current user is a just a customer
   * @param {String} userId - id of the user posting the review
   * @param {String} shopId - id of the shop the product being viewed belongs
   * @param {String} productId - id of the product to be rated
   * @param {String} rating - rating score
   * @return {Void} - or Error object on failure
   */
  "productRating/postRating": function (userId, shopId, productId, rating) {
    check(userId, String);
    check(shopId, String);
    check(productId, String);
    check(rating, Number);

    if (checkUserPermissions()) {
      throw new Meteor.Error(403, "Owners or Admins can't rate");
    }

    if (ProductRatings.findOne({ userId, shopId, productId })) {
      ProductRatings.update({ userId, shopId, productId }, { $set: { rating: rating } });
    } else {
      ProductRatings.insert({
        userId: userId,
        shopId: shopId,
        productId: productId,
        rating: rating
      });
    }
  }
});
