import { Reaction } from "/client/api";
import { Template } from "meteor/templating";
import { StaticPage } from "/lib/collections";

Template.allStaticPages.onCreated(function () {
  this.autorun(() => {
    this.subscribe("StaticPage");
  });
});

Template.allStaticPages.helpers({
  userStaticPage() {
    const instance = Template.instance();
    if (instance.subscriptionsReady()) {
      return StaticPage.find({
        shopId: Reaction.getShopId()
      });
    }
  }
});
