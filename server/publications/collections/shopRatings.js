import { ShopRatings } from "/lib/collections";
import { Meteor } from "meteor/meteor";


Meteor.publish("ShopRatings", function () {
  return ShopRatings.find();
});
