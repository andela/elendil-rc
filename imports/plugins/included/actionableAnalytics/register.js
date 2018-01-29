import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Report",
  name: "Report",
  icon: "fa fa-bar-chart",
  autoEnable: true,
  settings: {
    name: "Report"
  },
  registry: [
    {
      route: "/dashboard/analytics",
      provides: ["dashboard"],
      name: "Report",
      label: "Report",
      description: "View report",
      icon: "fa fa-bar-chart",
      priority: 1,
      container: "core",
      workflow: "coreDashboardWorkflow",
      template: "analytics",
      permissions: [{
        label: "dashboard/analytics",
        permission: "dashboard/analytics"
      }]
    }
  ]
});
