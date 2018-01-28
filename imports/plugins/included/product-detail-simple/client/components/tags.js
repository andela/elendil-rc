import React, { Component } from "react";
import PropTypes from "prop-types";
import { Reaction } from "/client/api";
import { ReactionProduct } from "/lib/api";
import { Shops } from "/lib/collections";
import classnames from "classnames";
import { Components, registerComponent } from "@reactioncommerce/reaction-components";

class ProductTags extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  get tags() {
    return this.props.tags;
  }

  get showEditControls() {
    return this.props.product && this.props.editable;
  }

  getProductShopName() {
    const currentProduct = ReactionProduct.selectedProduct();
    const { shopId } = currentProduct;
    const productShop = Shops.find({ _id: shopId }).fetch();
    return { merchant: productShop[0].name, shopId };
  }

  renderEditButton() {
    if (this.showEditControls) {
      return (
        <span className="edit-button">
          <Components.EditContainer
            data={this.props.product}
            disabled={this.props.editable === false}
            editView="ProductAdmin"
            field="hashtags"
            i18nKeyLabel="productDetailEdit.productSettings"
            label="Product Settings"
            permissions={["createProduct"]}
          />
        </span>
      );
    }

    return null;
  }

  handleClick(event) {
    event.preventDefault();
    const { merchant, shopId } = this.getProductShopName();
    Reaction.Router.go("review", {
      shopName: merchant
    },
    {
      _: shopId
    });
  }

  render() {
    const { merchant } = this.getProductShopName();
    if (Array.isArray(this.tags) && this.tags.length > 0) {
      const headerClassName = classnames({
        "tags-header": true,
        "edit": this.showEditControls
      });

      return (
        <div className="pdp product-tags">
          <h3 className={headerClassName}>
            <Components.Translation defaultValue="Tags" i18nKey="productDetail.tags" />
            {this.renderEditButton()}
          </h3>
          <Components.TagList
            editable={false}
            product={this.props.product}
            tags={this.tags}
          />
          <Components.Button
            bezelStyle="outline"
            buttonType="submit"
            className="btn btn-default"
            onClick={this.handleClick}
          >
            <p
              style={{ cursor: "pointer", marginBottom: "0" }}
            >
              <span>
                <img
                  style={{ height: "30px" }}
                  src="/resources/star.ico"
                />
              </span> Rate { merchant }
            </p>
          </Components.Button>
        </div>
      );
    }
    return null;
  }
}

ProductTags.propTypes = {
  editButton: PropTypes.node,
  editable: PropTypes.bool,
  product: PropTypes.object,
  tags: PropTypes.arrayOf(PropTypes.object)
};

registerComponent("ProductTags", ProductTags);

export default ProductTags;
