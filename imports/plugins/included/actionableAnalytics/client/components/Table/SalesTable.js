import React from "react";
import _ from "lodash";

import { formatPriceString } from "/client/api";


export const SalesTable = (props) => {
  let isMatched = false;
  const { fetchedTableData, tableHeadingArray, productSearchTerm } = props;
  const tableHeading = tableHeadingArray.map(item =>
    (<th key={item} >{item}</th>));
  const searchTerm = new RegExp(productSearchTerm.toLowerCase());
  const tablerow = _.map(fetchedTableData, (item, key) => {
    if (key.toLowerCase().match(searchTerm) && !_.isEmpty(productSearchTerm)) {
      isMatched = true;
      return (
        <tr key={key} >
          <td >{key}</td>
          <td >{item.quantitySold}</td>
          <td >{formatPriceString(item.totalSales)}</td>
          <td >{formatPriceString(item.totalProfit)}</td>
          <td >{item.firstSale}</td>
          <td >{item.lastSale}</td>
          <td >{item.customerCount}</td>
          <td >{formatPriceString(item.averageSalesPerDay)}</td>
        </tr>
      );
    } else if (!key.toLowerCase().match(searchTerm) && _.isEmpty(productSearchTerm)) {
      isMatched = false;
    }
  });
  return (
    <table className="table table-striped table-hover table-responsive table-bordered">
      {
        isMatched
        &&
        <thead className="theme-color">
          <tr>
            {tableHeading}
          </tr>
        </thead>
      }
      {
        isMatched
        &&
        <tbody>
          {tablerow}
        </tbody>}
      {
        !isMatched
        &&
        <thead>
          <tr>
            <th className="text-center">No Product Sales report</th>
          </tr>
        </thead>
      }
    </table>
  );
};

export default SalesTable;

