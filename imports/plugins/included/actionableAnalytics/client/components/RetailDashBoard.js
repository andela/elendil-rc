
import React from 'react';
import { registerComponent } from '@reactioncommerce/reaction-components';
import { formatPriceString } from '/client/api';
import { Box } from '../components/box/Box';


export const RetailDashBoard = (props) => {
  const { OrdersData } = props;
  const {
    totalSales,
    salesPerDay,
    ordersCancelled,
    ordersPlaced,
    totalItemsPurchased,
    grossProfit,
  } = OrdersData;
  return (
    <div
      id="tab1"
      style={{ display: OrdersData.selectedTab === 'tab1' ? 'block' : 'none' }}
      className="col-sm-12 col-md-offset-1 col-lg-10 col-lg-offset-2 tabBox tab-pane fade in active"
    >
      {/* Revenue board */}
      <Box
        boxTitle="REVENUE"
        boxValue={formatPriceString(totalSales)}
      />
      {/* Avaerage sales board */}
      <Box
        boxTitle="AVERAGE SALES"
        boxValue={formatPriceString(salesPerDay)}
      />
      {/* cancelled order box */}
      <Box
        boxTitle="CANCELLED ORDERS"
        boxValue={ordersCancelled}
      />
      {/* gross profit box */}
      <Box
        boxTitle="GROSS PROFIT"
        boxValue={formatPriceString(grossProfit)}
      />
      {/* placed orders board */}
      <Box
        boxTitle="PLACED ORDERS"
        boxValue={ordersPlaced}
      />
      {/* purchased item board */}
      <Box
        boxTitle="PURCHASED ITEMS"
        boxValue={totalItemsPurchased}
      />
    </div>
  );
};
registerComponent('RetailDashBoard', RetailDashBoard);
export default RetailDashBoard;
