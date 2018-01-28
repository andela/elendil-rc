import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Shop Review Page",
  name: "shop-review-page",
  icon: "fa fa-cubes",
  autoEnable: true,
  registry: [{
    route: "/review/:shopName",
    name: "review",
    template: "shopReview",
    workflow: "coreWorkflow"
  }],
  layout: [{
    layout: "coreLayout",
    workflow: "coreWorkflow",
    collection: "ShopReviews",
    theme: "default",
    enabled: true,
    structure: {
      template: "shopReview",
      layoutHeader: "layoutHeader",
      layoutFooter: "",
      notFound: "notFound",
      dashboardHeader: "dashboardHeader",
      dashboardControls: "",
      dashboardHeaderControls: "",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
