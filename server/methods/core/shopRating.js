import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ShopRatings } from "/lib/collections";
import {  Reaction } from "/server/api";

/**
 * @file Methods for rating products.
 * Run these methods using `Meteor.call()`.
 * @example Meteor.call("shopRating/postRating", userId, shop._id, rating)
 * @namespace Methods/ShopRating
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
   * @name shopRating/postRating
   * @method
   * @memberof Methods/ShopRating
   * @summary Allows authenticated users that are not of owner or admin rate products
   * It checks if the current user is a just a customer
   * @param {String} userId - id of the user rating
   * @param {String} shopId - id of the shop to be rated
   * @param {String} rating - rating score
   * @return {Void} - or Error object on failure
   */
  "shopRating/postRating": function (userId, shopId, rating) {
    check(userId, String);
    check(shopId, String);
    check(rating, Number);

    if (checkUserPermissions()) {
      throw new Meteor.Error(403, "Owners or Admins can't rate");
    }

    if (ShopRatings.findOne({ userId, shopId })) {
      ShopRatings.update({ userId, shopId }, { $set: { rating: rating } });
    } else {
      ShopRatings.insert({
        userId: userId,
        shopId: shopId,
        rating: rating
      });
    }
  }
});
