import React from "react";
import PropTypes from "prop-types";
import { moment } from "meteor/momentjs:moment";
import { Components } from "@reactioncommerce/reaction-components";

const Review = (props) => {
  const { review, name, userId, email, updatedAt } = props.content;
  const time = moment(updatedAt).fromNow();
  return (
    <div className="review-item-container" >
      <div className="user-avatar">
        <Components.ReactionAvatar
          size={60}
          className={"img-responsive"}
          email={email}
          name={name}
          round
        />
      </div>
      <div className="review-body" >
        <div className="review-header" >
          <p><b>{name}</b></p>
          <p className="review-time"><b>{time}</b></p>
        </div>
        <div className="review-text">
          <p>{review}</p>
        </div>
        {props.currentUserId === userId &&
        <div className="review-btn">
          <span className="review-btn-edit">
            <i
              id={props.id}
              data-index={props.index}
              content={review}
              onClick={props.update}
              className="fa fa-pencil"
            />
          </span>
          <span>
            <i
              style={{ cursor: "pointer" }}
              id={props.id}
              onClick={props.delete}
              className="fa fa-trash"
            />
          </span>
        </div>}
      </div>
    </div>
  );
};

Review.propTypes = {
  content: PropTypes.object,
  currentUserId: PropTypes.string,
  delete: PropTypes.func,
  id: PropTypes.string,
  index: PropTypes.number,
  update: PropTypes.func
};

export default Review;
