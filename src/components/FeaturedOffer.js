import React from "react";
import { Link } from 'react-router-dom';

const FeaturedOffer = ({offerDescription,rewardImage,productName,categoryName,thumbnailImage}) => (
      <div className="col-sm-3 col-md-3 col-lg-3 ">
        <Link to={`/SmartView/${categoryName}/${productName}`}>
          <div className="featuredProductWrapper">
            <span className="offerTag">{offerDescription}</span>
            <img className="" src={`http://127.0.0.1:8000${thumbnailImage}`} alt="furniture" width="100%" height="250px" />
            <div className="productOverlayTitle">
              {productName}
            </div>
            <img className="productOffer" src={`http://127.0.0.1:8000${rewardImage}`} alt="furniture" width="64px" height="64px" />
          </div>
        </Link>
      </div>
)

export default FeaturedOffer
