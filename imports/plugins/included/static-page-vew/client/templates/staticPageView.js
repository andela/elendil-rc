import { StaticPage } from "/lib/collections";
import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { Router } from "/client/api";
import { Reaction } from "/lib/api";

Template.staticPageView.helpers({
  staticPage() {
    const currentPage = Router.current();
    const pageAddress = currentPage.params.pageAddress;
    const subscription = Meteor.subscribe("StaticPage");
    if (subscription.ready()) {
      const page = StaticPage.find({ pageAddress }).fetch();
      const isAdmin = Reaction.hasAdminAccess();
      
      if (page.length > 0) {
        if (isAdmin) {
          const pageContent = page[0].pageContent;
          return ([{ title: page[0].pageName, content: pageContent }]);
        }

        if (page[0].isEnabled) {
          const pageContent = page[0].pageContent;
          return ([{ title: page[0].pageName, content: pageContent }]);
        }
      }
      return ([{ title: "Noting to show", content: "<div style='text-align: center; font-size: 457%%;'>404 Page not found</div>" }]);
    }
  }
});
