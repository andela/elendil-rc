import { getAverageSales } from "./getAverageSales";
/**
 * @param {array} fetchedOrders
 * @param {date} fromDate
 * @param {date} toDate
 * @returns {object} analytics report
 */
export const analyseOrder = (fetchedOrders, fromDate, toDate) => {
  const analytics = {};
  const ordersAnalytics = [];
  let totalItemsPurchased = 0;
  let totalShippingCost = 0;
  let totalSales = 0;
  let ordersCancelled = 0;
  let totalCostPrice = 0;


  fetchedOrders.forEach((order) => {
    const orderDate = order.createdAt;
    const dateString = orderDate.toISOString().split("T")[0];
    if (order.workflow.status !== "canceled") {
      ordersAnalytics.push({
        date: dateString,
        country: order.billing[0].address.country,
        city: `${order.billing[0].address.city}, ${order.billing[0].address.region}`,
        paymentProcessor: order.billing[0].paymentMethod.processor,
        shipping: order.billing[0].invoice.shipping,
        taxes: order.billing[0].invoice.taxes
      });
      totalSales += Number.parseFloat(order.billing[0].invoice.subtotal);
      totalItemsPurchased += order.items.length;
      totalShippingCost += order.billing[0].invoice.shipping;
      order.items.forEach((item) => {
        totalCostPrice += Number.parseFloat(item.variants.costPrice * item.quantity);
        if (analytics[item.variants.title]) {
          analytics[item.variants.title].quantitySold += item.quantity;
          analytics[item.variants.title].totalSales += item.variants.price * item.quantity;
          analytics[item.variants.title].averageSalesPerDay =
            getAverageSales(analytics[item.variants.title].totalSales, fromDate, toDate);
          analytics[item.variants.title].lastSale = order.createdAt.toLocaleDateString();
          analytics[item.variants.title].totalProfit += ((item.variants.price * item.quantity)
            - (item.variants.costPrice * item.quantity));
          analytics[item.variants.title].userIds.forEach((userId) => {
            if (userId.toString() !== order.userId.toString()) {
              analytics[item.variants.title].userIds.push(order.userId.toString());
              analytics[item.variants.title].customerCount += 1;
            }
          });
        } else {
          analytics[item.variants.title] = {
            firstSale: order.createdAt.toLocaleDateString(),
            lastSale: order.createdAt.toLocaleDateString(),
            quantitySold: item.quantity,
            totalSales: item.variants.price * item.quantity,
            userIds: [order.userId.toString()],
            customerCount: 1,
            productType: item.productType,
            totalProfit: ((item.variants.price * item.quantity) -
              (item.variants.costPrice * item.quantity)),
            averageSalesPerDay:
              getAverageSales(item.variants.price * item.quantity, fromDate, toDate)
          };
        }
      });
    } else {
      ordersCancelled += 1;
    }
  });
  return {
    totalSales,
    totalItemsPurchased,
    totalShippingCost,
    analytics,
    ordersAnalytics,
    ordersCancelled,
    totalCostPrice
  };
};

export default analyseOrder;
