import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "All static page",
  name: "allpages",
  autoEnable: true,
  registry: [
    {
      name: "allpages",
      template: "allStaticPages",
      route: "/allPages",
      workflow: "coreStaticPageWorkflow"
    }
  ]
});
