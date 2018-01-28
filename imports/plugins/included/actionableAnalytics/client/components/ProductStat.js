import React from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { SimpleChart } from "./charts/SimpleChart";
import { SelectOption, DisplayOption } from "../components/selectOption/option";
import { SearchInput } from "../components/input/SearchInput";

export const ProductStat = (props) => {
  const {
    salesData, selectedTab, handleProductTypeChange, handleOptionChange, statValue,
    handleProductStatInputChange, productStatSearchTerm, filterValue
  } = props;
  return (
    <div
      id="tab4"
      style={{ display: selectedTab === "tab4" ? "block" : "none" }}
      className="col-sm-12 col-md-12 col-lg-10 col-lg-offset-1 tabBox tab-pane fade"
    >
      <div className="container" />
      <div className="row">
        <DisplayOption
          handleOptionChange={handleOptionChange}
          firstValue="quantitySold"
          secondValue="customerCount"
          thirdValue="totalSales"
          fourthValue="averageSalesPerDay"
          fifthValue="totalProfit"
          firstOption="Quantity Sold"
          secondOption="Customer Count"
          thirdOption="Total Sales"
          fourthOption="Average Sales"
          fifthOption="Total Profit"
          chartClass="col-md-3 col-md-offset-2"
        />
        <SelectOption
          handleProductTypeChange={handleProductTypeChange}
          firstValue="allProduct"
          secondValue="nonDigital"
          thirdValue="digital"
          firstOption="All Products"
          secondOption="Non-Digital"
          thirdOption="Digital"
          chartClass="col-md-3"
        />
        <SearchInput
          inputName="productSearchInput"
          inputPlaceholder="Type product name"
          handleInputChange={handleProductStatInputChange}
          inputClass="col-md-4"
        />
      </div>
      <SimpleChart
        fetchedData={salesData}
        statValue={statValue}
        filterValue={filterValue}
        productStatSearchTerm={productStatSearchTerm}
      />
    </div>
  );
};
registerComponent("ProductStat", ProductStat);

export default ProductStat;
