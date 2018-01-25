import React from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";

const SocialContent = () => (
  <div style={{ width: "65%" }}>
    <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Felendilrc%2F&tabs=timeline&width=500&height=400&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=751851811692314" width="100%" height="400" style={{ border:'none', overflow:'hidden'}} scrolling="no" frameBorder="0" allowTransparency="true"></iframe>
  </div>
);

registerComponent("SocialContent", SocialContent);

export default SocialContent;
