import { StaticPage } from "/lib/collections";
import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { Router } from "/client/api";

Template.staticPageView.helpers({
  staticPage() {
    const currentPage = Router.current();
    const pageAddress = currentPage.params.pageAddress;
    const subscription = Meteor.subscribe("StaticPage");
    if (subscription.ready()) {
      const page = StaticPage.find({ pageAddress }).fetch();
      if (page.length > 0) {
        const pageContent = page[0].pageContent;
        return ([{ title: page[0].pageName, content: pageContent }]);
      }
    }
  }
});
