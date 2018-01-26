import { ProductRatings } from "/lib/collections";
import { Meteor } from "meteor/meteor";


Meteor.publish("ProductRatings", function () {
  return ProductRatings.find();
});
