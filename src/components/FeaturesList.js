// import React,{PropTypes} from 'react';
import React from 'react';
 import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {getProductInfo} from '../actions/productActions';
import { Carousel } from 'react-responsive-carousel';

// general styles
// import 'react-responsive-carousel/lib/styles/main.css';

// carousel styles
import 'react-responsive-carousel/lib/styles/carousel.css';

class FeaturesList extends React.Component{

  // componentDidMount(){
  //   if(this.props.productInfo === undefined || this.props.productInfo.length == 0){
  //     this.props.getProductInfo(this.props.page,this.props.pageId);
  //   }
  // }
render(){

    return(
            <div>
            { this.props.productInfo && this.props.productInfo.map((product)=>
              <div className="bg-white  rounded-bottom" key={product.id}>
                <ul id="productFeaturePane" className="nav nav-pills py-2 text-center rounded-top" role="tablist">
                  <li className="nav-item col-sm-2 col-md-2 col-lg-2 ml-auto px-0">
                    <a className="nav-link active" href="#description" id="description-tab" role="pill" data-toggle="pill" aria-controls="description" aria-expanded="true">{product.featuretabtitleone}</a>
                  </li>
                  <li className="nav-item  col-sm-2 col-md-2 col-lg-2 px-0">
                  <a className="nav-link" href="#location" role="pill" id="location-tab" data-toggle="pill" aria-controls="location">{product.featuretabtitletwo}</a>

                  </li>
                  <li className="nav-item  col-sm-2 col-md-2 col-lg-2 px-0">
                  <a className="nav-link" href="#events" role="pill" id="events-tab" data-toggle="pill" aria-controls="events">{product.featuretabtitlethree}</a>

                  </li>
                  <li className="nav-item col-sm-2 col-md-2 col-lg-2 px-0">
                  <a className="nav-link" href="#images" role="pill" id="images-tab" data-toggle="pill" aria-controls="images">Images</a>
                  </li>
                  <li className="nav-item  col-sm-2 col-md-2 col-lg-2 mr-auto px-0">
                    <a className="nav-link" href="#videos" role="pill" id="videos-tab" data-toggle="pill" aria-controls="videos">Videos</a>
                  </li>
                </ul>
                <div className="tab-content px-3 mt-3">
                  <div role="tabpanel" className="tab-pane fade show active" id="description" aria-labelledby="description-tab">
                    <div>{product.featuretabtitleonedescription}</div>
                  </div>
                  <div role="tabpanel" className="tab-pane fade" id="location" aria-labelledby="location-tab">
                    <div>
                      <iframe src={product.featuretabtitletwodescription} key={product.id}
                      width="100%" height="366px" frameBorder="0">
                      </iframe>
                      {/*<iframe
                      width="420"
                      height="366px"
                      frameBorder="0"
                      src={this.getLocation(product.featuretabtitletwodescription)}
                      frameBorder="0"
                      allowFullScreen>
                      </iframe>*/}
                    </div>
                  </div>
                  <div role="tabpanel" className="tab-pane fade" id="events" aria-labelledby="events-tab">
                    <div>{product.featuretabtitlethreedescription}</div>
                  </div>
                  <div role="tabpanel" className="tab-pane fade" id="images" aria-labelledby="images-tab">
                    <div>
                    <Carousel
                    autoPlay={true} interval={1000} infiniteLoop
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={false}
                    transitionTime={500}
                    >
                    {product.featureimages.map((image)=>
                        <div key={image}>
                            <img  src={`http://127.0.0.1:8000${image}`}
                            width="100%" height="350px"
                             />
                        </div>
                      )}
                    </Carousel>
                    </div>
                  </div>
                  <div role="tabpanel" className="tab-pane fade" id="videos" aria-labelledby="videos-tab">
                    {/*<div>{
                      product.featurevideos.map((video)=>
                      <video ref="vidRef" key={video} autoPlay controls src={video.video} type="video/mp4"></video>)
                    }
                    <button onClick={this.playVideo.bind(this)}>PLAY</button>
                    </div>*/}
                    {product.featurevideos.map((video)=>
                    <div className="col-sm-6 col-md-6 col-lg-6" key={video}>
                    <iframe width="100%" height="186" frameBorder="0"  src={video.video} frameBorder="0" allowFullScreen></iframe>
                    </div>
                  )}
                  </div>
                </div>
              </div>
            )}
            </div>
          );
  }
}

// function mapStateToProps(state){
//   return {
//     productInfo:state.products.productsInfo
//   }
// }

// export default connect(mapStateToProps,{getProductInfo})(FeaturesList);
export default connect(null,{getProductInfo})(FeaturesList);
