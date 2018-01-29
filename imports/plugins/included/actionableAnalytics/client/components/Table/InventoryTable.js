import React from "react";
import _ from "lodash";

export const InventoryTable = (props) => {
  const { fetchedTableData, tableHeadingArray } = props;
  const tableHeading = tableHeadingArray.map(item =>
    (<th key={item} >{item}</th>));
  const tablerow = fetchedTableData.map(item =>
    (
      <tr key={item._id} >
        <td >{item.title}</td>
        <td >{item.weight}</td>
        <td >{item.length}</td>
        <td >{item.inventoryQuantity}</td>
        <td >{item.price}</td>
        <td >{item.costPrice}</td>
        <td >{item.width}</td>
        <td >{item.height}</td>
        <td >{item.originCountry}</td>
      </tr>
    ));
  return (
    <table className="table table-striped table-hover table-responsive table-bordered">
      {
        !_.isEmpty(fetchedTableData)
        &&
        <thead className="theme-color">
          <tr>
            {tableHeading}
          </tr>
        </thead>
      }
      {!_.isEmpty(fetchedTableData)
        &&
        <tbody>
          {tablerow}
        </tbody>}
      {
        _.isEmpty(fetchedTableData)
        &&
        <thead>
          <tr>
            <th className="text-center">No inventory data report</th>
          </tr>
        </thead>
      }
    </table>
  );
};

export default InventoryTable;
