import React from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";

const UpdateReview = (props) => {
  const { handleChange, handleReviewUpdate, handleCancel, value, name, email } = props;
  return (
    <div className="review-edit-container">
      <div className="user-avatar">
        <Components.ReactionAvatar
          size={60}
          className={"img-responsive"}
          email={email}
          name={name}
          round
        />
      </div>
      <form className="review-edit-form">
        <Components.TextField
          name="editReview"
          type="text"
          multiline
          onChange={handleChange}
          value={value}
        />
        <div className="review-edit-btn" >
          <span className="cancel-btn">
            <Components.Button
              bezelStyle="solid"
              buttonType="submit"
              className="btn btn-primary"
              onClick={handleCancel}
            >
            Cancel
            </Components.Button>
          </span>
          <span>
            <Components.Button
              bezelStyle="solid"
              buttonType="submit"
              className="btn btn-primary"
              onClick={handleReviewUpdate}
            >
            Update
            </Components.Button>
          </span>
        </div>
      </form>
    </div>
  );
};

UpdateReview.propTypes = {
  email: PropTypes.string,
  handleCancel: PropTypes.func,
  handleChange: PropTypes.func,
  handleReviewUpdate: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string
};

export default UpdateReview;
