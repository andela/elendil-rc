import { Meteor } from "meteor/meteor";
import { StaticPage } from "/lib/collections";
import { Reaction } from "/server/api";

/**
 * Static Pages
 */

Meteor.publish("StaticPage", () => {
  const shopId = Reaction.getShopId();
  if (!shopId) {
    return this.ready();
  }
  return StaticPage.find({
    shopId
  });
});

Meteor.publish("viewPage", () => StaticPage.find({}));
