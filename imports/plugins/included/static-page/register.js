import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Static Page",
  name: "reaction-static-page",
  icon: "fa fa-list",
  autoEnable: true,
  settings: {
    name: "Static Page"
  },
  registry: [
    {
      provides: ["dashboard"],
      route: "/dashboard/static",
      name: "static-page",
      label: "Static Page",
      description: "Create static page",
      icon: "fa fa-list",
      priority: 1,
      container: "core",
      workflow: "coreStaticPageWorkflow",
      template: "staticPage",
      permissions: [{
        label: "dashboard/static",
        permission: "dashboard/static"
      }]

    }
  ],
  layout: [{
    layout: "coreLayout",
    workflow: "coreStaticPageWorkflow",
    collection: "StaticPage",
    theme: "default",
    enabled: true,
    structure: {
      template: "staticPage",
      layoutHeader: "layoutHeader",
      layoutFooter: "layoutFooter",
      notFound: "notFound",
      dashboardHeader: "dashboardHeader",
      dashboardControls: "dashboardControls",
      dashboardHeaderControls: "dashboardHeaderControls",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
