import React from "react";

import { registerComponent } from "@reactioncommerce/reaction-components";
import { SearchInput } from "../components/input/SearchInput";
import { InventoryTable } from "../components/Table/InventoryTable";

export const InventoryReport = (props) => {
  const { productInventoryData, selectedTab } = props;
  return (
    <div
      id="tab3"
      style={{ display: selectedTab === "tab3" ? "block" : "none" }}
      className="col-sm-12 col-md-12 col-lg-10 col-lg-offset-1 tabBox tab-pane fade"
    >
      <div className="container-fluid">
        <div className="row">
          <SearchInput
            inputName="inventorySearchInput"
            inputPlaceholder="Type product name"
            handleInputChange={props.handleInventoryInputChange}
            inputClass="col-sm-6 col-sm-offset-3"
          />
        </div>
      </div>
      <div className="card container col-lg-offset-1">
        <InventoryTable
          tableHeadingArray={[
            "Title",
            "Weight",
            "Length",
            "Quantity",
            "Selling Price",
            "Cost Price",
            "Width",
            "Height",
            "Origin Country"
          ]}
          fetchedTableData={productInventoryData}
        />
      </div>
    </div>
  );
};

registerComponent("InventoryReport", InventoryReport);

export default InventoryReport;
