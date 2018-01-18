import { Components } from "@reactioncommerce/reaction-components";
import { Template } from "meteor/templating";


Template.shopReview.helpers({
  ShopReviewComponent() {
    return Components.ShopReview;
  }
});
