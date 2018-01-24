import { getDateDifference } from "../helpers/getDateDifference";
/**
 * @param {number} totalSales
 * @param {date} fromDate
 * @param {date} toDate
 * @description Calculate average sales by day difference
 * @returns {number} salesPerDay
 */
export const getAverageSales = (totalSales, fromDate, toDate) => {
  const difference = getDateDifference(fromDate, toDate);
  const salesPerDay = difference === 0 ? totalSales : totalSales / difference;
  return salesPerDay;
};

export default getAverageSales;
