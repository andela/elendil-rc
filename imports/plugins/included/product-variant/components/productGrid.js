import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";

class ProductGrid extends Component {
  static propTypes = {
    isSearch: PropTypes.bool,
    products: PropTypes.array
  }

  renderProductGridItems = (products) => {
    if (Array.isArray(products)) {
      return products.map((product, index) => {
        return (
          <Components.ProductGridItems
            {...this.props}
            product={product} key={index} index={index}
          />
        );
      });
    }
    return (
      <div className="row">
        <div className="text-center">
          <h3>
            <Components.Translation defaultValue="No Products Found" i18nKey="app.noProductsFound" />
          </h3>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container-main padded">
        <div className="product-grid">
          {Array.isArray(this.props.products) &&
            <header className="title-section">
              <div className="line" />
              <center>
                <h1 className="title-main">
                  {this.props.isSearch ? "Search Results" : "Our products"}
                </h1>
              </center>
              <div className="line" />
            </header>}
          <Components.DragDropProvider>
            <ul className="product-grid-list list-unstyled" id="product-grid-list">
              {this.renderProductGridItems(this.props.products)}
            </ul>
          </Components.DragDropProvider>
        </div>
      </div>
    );
  }
}

export default ProductGrid;
