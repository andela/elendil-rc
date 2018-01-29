import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { shopIdAutoValue } from "./helpers";
import { registerSchema } from "@reactioncommerce/reaction-collections";

export const ShopRatings = new SimpleSchema({
  _id: {
    type: String,
    label: "Rating Id"
  },
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  shopId: {
    type: String,
    autoValue: shopIdAutoValue,
    regEx: SimpleSchema.RegEx.Id,
    index: 1
  },
  rating: {
    type: Number,
    label: "Shop Rating",
    min: 0,
    max: 5,
    decimal: true
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date
        };
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      return new Date;
    },
    optional: true
  }
});

registerSchema("ShopRatings", ShopRatings);
