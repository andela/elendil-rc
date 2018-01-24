import { Meteor } from "meteor/meteor";
import * as Collections from "/lib/collections";
import { check } from "meteor/check";

Meteor.methods({
  getProductInventoryData: (objectValuie) => {
    check(objectValuie, Object);
    check(objectValuie.searchTerm, String);

    return Collections.Products.find({
      $and: [{
        type: "variant",
        title: {
          $regex: objectValuie.searchTerm,
          $options: "i"
        }
      }]
    }).fetch();
  }
});
