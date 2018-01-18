import { ProductReviews } from "/lib/collections";
import { Meteor } from "meteor/meteor";


Meteor.publish("ProductReviews", function () {
  return ProductReviews.find();
});
