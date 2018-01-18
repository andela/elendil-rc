import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";
import { formatPriceString } from "/client/api";

class ProductGridItems extends Component {
  static propTypes = {
    additionalMedia: PropTypes.func,
    canEdit: PropTypes.bool,
    connectDragSource: PropTypes.func,
    connectDropTarget: PropTypes.func,
    displayPrice: PropTypes.func,
    isMediumWeight: PropTypes.func,
    isSearch: PropTypes.bool,
    isSelected: PropTypes.func,
    media: PropTypes.func,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    pdpPath: PropTypes.func,
    positions: PropTypes.func,
    product: PropTypes.object,
    weightClass: PropTypes.func
  }

  handleDoubleClick = (event) => {
    if (this.props.onDoubleClick) {
      this.props.onDoubleClick(event);
    }
  }

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  renderPinned() {
    return this.props.positions().pinned ? "pinned" : "";
  }

  renderVisible() {
    return this.props.product.isVisible ? "" : "not-visible";
  }

  renderOverlay() {
    if (this.props.product.isVisible === false) {
      return (
        <div className="product-grid-overlay" />
      );
    }
  }

  renderMedia() {
    if (this.props.media() === false) {
      return (
        <span className="product-image thumbnail" style={{ backgroundImage: "url('/resources/placeholder.gif')" }} />
      );
    }
    return (
      <span className="product-image thumbnail" style={{ backgroundImage: `url('${this.props.media().url({ store: "large" })}')` }} />
    );
  }

  renderAdditionalMedia() {
    if (this.props.additionalMedia() !== false) {
      if (this.props.isMediumWeight()) {
        return (
          <div className={`product-additional-images ${this.renderVisible()}`}>
            {this.props.additionalMedia().map((media) => {
              return <span key={media._id} className="product-image" style={{ backgroundImage: `url('${media.url({ store: "medium" })}')` }} />;
            })}
            {this.renderOverlay()}
          </div>
        );
      }
    }
  }

  renderNotices() {
    return (
      <div className="grid-alerts">
        <Components.GridItemNotice product={this.props.product} />
        <Components.GridItemControls product={this.props.product} />
      </div>

    );
  }

  renderOverlayClass() {
    return this.props.isSearch ? "" : "caption";
  }

  renderGridContent() {
    return (
      <div className="grid-conten">
        <a
          href={this.props.pdpPath()}
          data-event-category="grid"
          data-event-action="product-click"
          data-event-label="grid product click"
          data-event-value={this.props.product._id}
          onDoubleClick={this.handleDoubleClick}
          onClick={this.handleClick}
        >
          <div className={`${this.renderOverlayClass()}`}>
            <center><h4 className="color-blue">{this.props.product.title}</h4>
              <h4 className="color-blue">{formatPriceString(this.props.displayPrice())}</h4>
            </center>
          </div>
          {this.props.isSearch &&
            <div className="overlay-description">{this.props.product.description}</div>
          }
        </a>
      </div>
    );
  }

  renderHoverClassName() {
    return this.props.isSearch ? "item-content" : "item";
  }

  render() {
    const productItem = (
      <li
        className={`product-grid-item ${this.renderPinned()} ${this.props.weightClass()} ${this.props.isSelected()}`}
        data-id={this.props.product._id}
        id={this.props.product._id}
      >
        <div className={this.renderHoverClassName()}>
          <div className="black-overlay" />
          <span className="product-grid-item-alerts" />

          <div className="middle">
            <button type="button" className="btn add-cart"
              href={this.props.pdpPath()}
              data-event-category="grid"
              data-event-label="grid product click"
              data-event-value={this.props.product._id}
              onDoubleClick={this.handleDoubleClick}
              onClick={this.handleClick}
            >
              <i className="fa fa-shopping-cart" /> Add To Cart</button>
          </div>
          <a className="product-grid-item-images"
            href={this.props.pdpPath()}
            data-event-category="grid"
            data-event-label="grid product click"
            data-event-value={this.props.product._id}
            onDoubleClick={this.handleDoubleClick}
            onClick={this.handleClick}
          >
            <div className={`product-primary-images ${this.renderVisible()}`}>
              {this.renderMedia()}
              {this.renderOverlay()}
            </div>

            {this.renderAdditionalMedia()}
          </a>

          {!this.props.isSearch && this.renderNotices()}
          {this.renderGridContent()}
        </div>
      </li>
    );

    if (this.props.canEdit) {
      return (
        this.props.connectDropTarget(
          this.props.connectDragSource(productItem)
        )
      );
    }

    return productItem;
  }
}

export default ProductGridItems;
