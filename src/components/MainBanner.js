import React from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import SlideShow from './SlideShow';
import {getBannerImages} from '../actions/landingPageActions';
import {getMainBannerImages} from '../selectors';

class MainBanner extends React.Component{

  componentWillMount(){
    if(this.props.bannerImages.length === 0){
      this.props.getBannerImages();
    }
  }

  render(){
    const {bannerImages} = this.props
    return(
      <div className="row">
          <SlideShow>
          {
            bannerImages && bannerImages.map((image,i)=>
            <img key={i} src={`${image.mainbannerimages}`} alt="mainbanner" width="100%" height="320px" />
            )
          }
          </SlideShow>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    bannerImages:getMainBannerImages(state)
  }
}

export default connect(mapStateToProps,{getBannerImages})(MainBanner);
