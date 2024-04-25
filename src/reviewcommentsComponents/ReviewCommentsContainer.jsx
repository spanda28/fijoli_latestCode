

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReviewCommentsController from '../Controllers/ReviewCommentsController';

import "./ReviewCommentsContainer.css"
import ReviewerReview from './ReviewerReview';
import SubmitterReview from './SubmitterReview';

//component which holds the submitter and reviewer review comments
const ReviewCommentsContainer = ({ postitem, menuoptions }) => {

  //holds the parsed review comments which is used to display/post reviews
  const [reviewcomments, setreviewcomments] = useState([]);
  //get data of posted comment user info and review comments
  const loggedInUser = useSelector((state) => state.storeComponent.configData.profileData);
  
  //hook which parses the single entry review comment to
  //multiple entries of the reviw comments to show submitter/reviewer reviews
  useEffect(() => {

    //review comment controller parses the single entry to 
    //submitter and reviewer review comments
    const reviewCtrl = new ReviewCommentsController(postitem);

    //holds parsed review comments
    const result = reviewCtrl.getlstofReviews(loggedInUser, menuoptions);
    setreviewcomments([...result]);
    menuoptions = result["menuoptions"];
  }, [postitem]);

  return (
    <>
      <div className="divider nospace"></div>
      <div className='pad padyc'>
        {
          (0 < reviewcomments.length) &&
          reviewcomments.map((reviewComment, index) => {
            return (() => {
              if (0 === index) {
                return <SubmitterReview key={reviewComment.user_id.toString() + index.toString()} reviewComment={reviewComment} menuoption={menuoptions["submitter"]} />
              } else if (1 === index) {
                return <ReviewerReview key={reviewComment.reviewer_user_id.toString() + index.toString()} reviewComment={reviewComment} menuoption={menuoptions["reviewer"]} />
              }
            })()
          })
        }
      </div>
    </>
  )
}

export default ReviewCommentsContainer