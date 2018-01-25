import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { shopIdAutoValue } from "./helpers";
import { registerSchema } from "@reactioncommerce/reaction-collections";

export const ProductReviews = new SimpleSchema({
  _id: {
    type: String,
    label: "Review Id"
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
  name: {
    type: String,
    label: "Name"
  },
  email: {
    type: String,
    label: "Email"
  },
  productId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  review: {
    type: String,
    label: "Review",
    max: 255
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

registerSchema("ProductReviews", ProductReviews);
