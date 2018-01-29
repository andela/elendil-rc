import React from "react";
import $ from "jquery";
import _ from "lodash";
import { Template } from "meteor/templating";
import { Orders } from "/lib/collections";
import { formatPriceString } from "/client/api";
import { ReactiveDict } from "meteor/reactive-dict";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { ReportSideBar } from "../components/ReportSideBar";
import { RetailDashBoard } from "../components/RetailDashBoard";
import { SalesReport } from "../components/SalesReport";
import { InventoryReport } from "../components/InventoryReport";
import { ProductStat } from "../components/ProductStat";
import { analyseOrder } from "../helpers/analyseOrder";
import { getAverageSales } from "../helpers/getAverageSales";
import { Meteor } from "meteor/meteor";
import { DateTimePicker } from "../components/datePicker/DateTimePicker";


/**
 * @export
 * @class Report
 * @extends {React.Component}
 */
export class Report extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "allProduct",
      statValue: "quantitySold",
      ordersPlaced: 0,
      ordersData: [],
      beforeDate: new Date(),
      afterDate: new Date(),
      totalSales: 0,
      totalItemsPurchased: 0,
      ordersCancelled: 0,
      totalShippingCost: 0,
      salesPerDay: 0,
      analytics: {},
      analyticsStatement: {},
      ordersAnalytics: [],
      productsAnalytics: [],
      fromDate: Date.parse("2017-10-13"),
      toDate: Date.now(),
      dateIsChange: false,
      productInventoryData: [],
      productSearchTerm: "",
      headingText: "Retail DashBoard",
      grossProfit: 0,
      productStatSearchTerm: "",
      selectedTab: "tab1"
    };
  }

  componentDidMount() {
    // fetch product category documents
    this.getAnalytics(this.state.fromDate, this.state.toDate);
  }


  componentDidUpdate() {
    // get product analysis when date is changed
    if (this.state.dateIsChange) {
      this.getAnalytics(this.state.fromDate, this.state.toDate);
    }
  }
  /**
   * @memberof Report
   * @description it fetches orders by date arguments and returns
   * analysis report
   * @param {date} fromDate
   * @param {date} toDate
   * @returns {object} product analysis
   */
  getAnalytics = (fromDate, toDate) => {
    Meteor.call("getOrders",
      {
        fromDate: fromDate,
        toDate: toDate
      },
      (errors, ordersFetched) => {
        if (errors) {
          return errors;
        }
        if (ordersFetched) {
          const analyticsItems = analyseOrder(ordersFetched, fromDate, toDate);
          this.setState({
            dateIsChange: false,
            ordersData: ordersFetched,
            ordersPlaced: ordersFetched.length,
            totalSales: analyticsItems.totalSales,
            totalItemsPurchased: analyticsItems.totalItemsPurchased,
            totalShippingCost: analyticsItems.totalShippingCost,
            analytics: analyticsItems.analytics,
            ordersAnalytics: analyticsItems.ordersAnalytics,
            ordersCancelled: analyticsItems.ordersCancelled,
            grossProfit: (analyticsItems.totalSales - analyticsItems.totalCostPrice)
          });

          this.setState({
            salesPerDay: getAverageSales(this.state.totalSales, fromDate, toDate)
          });
        }
      });
  }

  getProductInventoryData = (searchTerm) => {
    Meteor.call("getProductInventoryData",
      {
        searchTerm: searchTerm
      }, (errors, fetchedProductInventoryData) => {
        if (errors) {
          return errors;
        }
        this.setState({
          productInventoryData: fetchedProductInventoryData
        });
      });
  }
  /**
   * @memberof Report
   * @param {object} event
   * @returns {void}
   */
  handleShowRetailDashBoard = () => {
    this.setState({
      headingText: "Retail DashBoard",
      selectedTab: "tab1"
    });
  }
  /**
 * @memberof Report
 * @param {object} event
 * @returns {void}
 */
  handleShowSalesReport = () => {
    this.setState({
      headingText: "Sales Report",
      selectedTab: "tab2"
    });
  }
  /**
   * @memberof Report
   * @param {object} event
   * @returns {void}
   */
  handleShowInventoryReport = () => {
    this.setState({
      headingText: "Inventory Report",
      selectedTab: "tab3"
    });
  }
  /**
 * @memberof Report
 * @param {object} event
 * @returns {void}
 */
  handleShowProductStats = () => {
    this.setState({
      headingText: "Products Stats",
      selectedTab: "tab4"
    });
  }
  /**
   * @memberof Report
   * @param {object} event
   * @returns {void}
   */
  handleToDateInputChange = (event) => {
    if (!_.isEmpty(event.target.value)) {
      this.setState({
        toDate: Date.parse(event.target.value),
        dateIsChange: true
      });
    }
  }
  /**
   * @memberof Report
   * @param {object} event
   * @returns {void}
   */
  handleFromDateInputChange = (event) => {
    if (!_.isEmpty(event.target.value)) {
      this.setState({
        fromDate: Date.parse(event.target.value),
        dateIsChange: true
      });
    }
  }
  /**
   * @memberof Report
   * @param {object} event
   * @returns {void}
   */
  handleProductTypeChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }
  /**
   * @memberof Report
   * @param {object} event
   * @returns {void}
   */
  handleOptionChange = (event) => {
    this.setState({
      statValue: event.target.value
    });
  }
  /**
   * @memberof Report
   * @param {object} event
   * @returns {void}
   */
  handleInventoryInputChange = (event) => {
    this.getProductInventoryData(event.target.value);
  }
  /**
 * @memberof Report
 * @param {object} event
 * @returns {void}
 */
  handleSalesInputChange = (event) => {
    this.setState({
      productSearchTerm: event.target.value
    });
  }
  /**
 * @memberof Report
 * @param {object} event
 * @returns {void}
 */
  handleProductStatInputChange = (event) => {
    this.setState({
      productStatSearchTerm: event.target.value
    });
  }
  render() {
    return (
      <div className="container-fluid">
        <ReportSideBar
          handleShowRetailDashBoard={this.handleShowRetailDashBoard}
          handleShowSalesReport={this.handleShowSalesReport}
          handleShowInventoryReport={this.handleShowInventoryReport}
          handleShowProductStats={this.handleShowProductStats}
        />
        <div className="row">
          <div className="col-sm-4 col-md-4 col-md-offset-1 col-lg-4 col-lg-offset-1">
            <h3>{this.state.headingText}</h3>
          </div>

          <DateTimePicker
            handleInputChange={this.handleFromDateInputChange}
            sideLabel="FROM"
            dateClass="col-sm-3 report-date from-date"
            inputName="from-date-input"
          />
          <DateTimePicker
            handleInputChange={this.handleToDateInputChange}
            sideLabel="TO"
            dateClass="col-sm-3 report-date"
            inputName="to-date-input"
          />
        </div>

        <RetailDashBoard
          OrdersData={this.state}
        />
        <SalesReport
          selectedTab={this.state.selectedTab}
          productSearchTerm={this.state.productSearchTerm}
          productSalesData={this.state.analytics}
          handleSalesInputChange={this.handleSalesInputChange}
        />
        <InventoryReport
          selectedTab={this.state.selectedTab}
          productInventoryData={this.state.productInventoryData}
          handleInventoryInputChange={this.handleInventoryInputChange}
        />
        <ProductStat
          selectedTab={this.state.selectedTab}
          salesData={this.state.analytics}
          handleProductTypeChange={this.handleProductTypeChange}
          handleOptionChange={this.handleOptionChange}
          handleProductStatInputChange={this.handleProductStatInputChange}
          statValue={this.state.statValue}
          filterValue={this.state.value}
          productStatSearchTerm={this.state.productStatSearchTerm}
        />
      </div>
    );
  }
}
registerComponent("Report", Report);
export default Report;
