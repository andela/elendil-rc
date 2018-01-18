import { ShopReviews } from "/lib/collections";
import { Meteor } from "meteor/meteor";


Meteor.publish("ShopReviews", function () {
  return ShopReviews.find();
});
