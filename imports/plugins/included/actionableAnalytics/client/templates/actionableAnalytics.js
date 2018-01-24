import { Template } from "meteor/templating";
import { Report } from "../containers/Report";

/**
 * Search Helpers
 */

Template.analytics.helpers({
  displayReport() {
    return {
      component: Report
    };
  }
});
