import React from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";


export const ReportSideBar = props => (
  <div className="col-sm-12 col-md-12 col-lg-1">
    <ul className="nav nav-pills">
      <li className="active respon">
        <a
          data-toggle="tab"
          role="presentation"
          onClick={props.handleShowRetailDashBoard}
          className="responsive"
          href="#tab1"
        ><strong>RETAIL DASHBOARD</strong>
        </a>
      </li>
      <li className="respon">
        <a
          data-toggle="tab"
          role="presentation"
          onClick={props.handleShowSalesReport}
          className="responsive"
          href="#tab2"
        >
          <strong>SALES REPORT</strong>
        </a>
      </li>
      <li className="respon">
        <a
          data-toggle="tab"
          role="presentation"
          onClick={props.handleShowInventoryReport}
          className="responsive"
          href="#tab3"
        >
          <strong>INVENTORY REPORT</strong>
        </a>
      </li>
      <li className="respon">
        <a
          data-toggle="tab"
          role="presentation"
          onClick={props.handleShowProductStats}
          className="responsive"
          href="#tab4"
        ><strong>PRODUCT STATS</strong>
        </a>
      </li>
    </ul>
  </div>
);

registerComponent("ReportSideBar", ReportSideBar);
export default ReportSideBar;
