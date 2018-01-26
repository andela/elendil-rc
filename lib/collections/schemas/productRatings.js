import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { shopIdAutoValue } from "./helpers";
import { registerSchema } from "@reactioncommerce/reaction-collections";

export const ProductRatings = new SimpleSchema({
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
  productId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  rating: {
    type: Number,
    label: "Product Rating",
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

registerSchema("ProductRatings", ProductRatings);
