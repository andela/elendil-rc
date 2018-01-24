import React from "react";
import _ from "lodash";
import { BarChart, XAxis, YAxis, Legend, CartesianGrid, Tooltip, Bar } from "recharts";

export const SimpleChart = (props) => {
  const {
    fetchedData, statValue, productStatSearchTerm, filterValue
  } = props;
  const mappedData = [];
  let sortedData = [];
  let filteredData = [];
  const allProductArray = [];
  const searchTerm = new RegExp(productStatSearchTerm.toLowerCase());
  _.map(fetchedData, (items, key) => {
    if (key.toLowerCase().match(searchTerm) || searchTerm.length === 0) {
      allProductArray.push({
        name: key,
        quantitySold: items.quantitySold,
        customerCount: items.customerCount,
        totalSales: items.totalSales,
        averageSalesPerDay: items.averageSalesPerDay,
        totalProfit: items.totalProfit,
        productType: items.productType
      });
    }
    if (mappedData.length < 5 && key.toLowerCase().match(searchTerm) && searchTerm.length !== 0) {
      mappedData.push({
        name: key,
        quantitySold: items.quantitySold,
        customerCount: items.customerCount,
        totalSales: items.totalSales,
        averageSalesPerDay: items.averageSalesPerDay,
        totalProfit: items.totalProfit,
        productType: items.productType
      });
    } else if (mappedData.length < 5 && searchTerm.length === 0) {
      mappedData.push({
        name: key,
        quantitySold: items.quantitySold,
        customerCount: items.customerCount,
        totalSales: items.totalSales,
        averageSalesPerDay: items.averageSalesPerDay,
        totalProfit: items.totalProfit,
        productType: items.productType
      });
    }
  });
  sortedData = _.sortBy(mappedData, [statValue]);
  filteredData = _.filter(allProductArray, ["productType", filterValue]);
  return (
    <div className="row container">
      <div className="col-md-4 col-md-offset-3" id="Bar">
        <BarChart
          width={600}
          height={300}
          data={filterValue === "allProduct" ? sortedData : filteredData}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          {statValue === "quantitySold" && <Bar dataKey="quantitySold" fill="#8884d8" />}
          {statValue === "customerCount" && <Bar dataKey="customerCount" fill="#82ca9d" />}
          {statValue === "totalSales" && <Bar dataKey="totalSales" fill="#01c8ff" />}
          {statValue === "averageSalesPerDay" && <Bar dataKey="averageSalesPerDay" fill="#ff01fa" />}
          {statValue === "totalProfit" && <Bar dataKey="totalProfit" fill="darksalmon" />}
        </BarChart>
      </div>
    </div>
  );
};
export default SimpleChart;
