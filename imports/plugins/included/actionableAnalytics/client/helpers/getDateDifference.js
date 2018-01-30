/**
 * @param {date} fromDate
 * @param {date} todate
 * @description calculates date difference
 * @returns {number} DifferenceInday(s)
 */
export const getDateDifference = (fromDate, todate) => {
  const oneDayInMilliseconds = 86400000;
  const dateDifference = new Date(todate).setHours(23) - new Date(fromDate).setHours(0);
  const dayDifference = Math.round(dateDifference / oneDayInMilliseconds);
  return dayDifference;
};

export default getDateDifference;
