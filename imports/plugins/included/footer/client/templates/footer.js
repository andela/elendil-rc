import { Reaction } from "/client/api";
import { StaticPage } from "/lib/collections";
import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";

Template.footer.helpers({
  staticPage() {
    const subscription = Meteor.subscribe("StaticPage");
    if (subscription.ready()) {
      const x = StaticPage.find({ shopId: Reaction.getShopId(), isEnabled: { $eq: true } }, { limit: 3 });
      return x;
    }
  }
});
