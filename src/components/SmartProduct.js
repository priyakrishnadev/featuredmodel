import React from 'react';
import {CommentBox} from './CommentBox';
import SuggestionBox from './SuggestionBox';
import ProductBlog from './ProductBlog';
import FeaturesList from './FeaturesList';
import ContactForm from './ContactForm';
import WebVRSuggestion from './WebVRSuggestion';
import RewardModal from './RewardModal';
import ModelFooter from './ModelFooter';
import WebVR from './WebVR';
// import Ftower from './furniture/Ftower';
import {connect} from 'react-redux';
import {getProductInfo,getSuggestions} from '../actions/productActions';
import {getComments} from '../actions/commentActions';

// import {withRouter} from 'react-router-dom';

class SmartProduct extends React.Component{
constructor(props){
  super(props);
  this.state={
    objPath:"",
    mtlPath:"",
    materialName:""
  };
}

// An ideal way
// componentDidMount(){
//   // if(this.props.productInfo === undefined || this.props.productInfo.length == 0){
//   this.props.getProductInfo(this.props.page,this.props.pageId);
//   // this.props.getComments(this.props.page,this.props.pageId);
// // }
// }

//To execute the parent before the child componentWillMount(){}
componentWillMount(){
  // if(this.props.productInfo === undefined || this.props.productInfo.length == 0){
  this.props.getProductInfo(this.props.page,this.props.pageId);
  this.props.getComments(this.props.page,this.props.pageId);
  this.props.getSuggestions(this.props.page,this.props.pageId);
// }
}

componentWillReceiveProps(nextProps){
   if(nextProps.page !== this.props.page || nextProps.pageId !== this.props.pageId){
       this.props.getProductInfo(nextProps.page,nextProps.pageId);
       this.props.getComments(nextProps.page,nextProps.pageId);
       this.props.getSuggestions(nextProps.page,nextProps.pageId);
     }
}

render(){
    return (
      <div className="container-fluid bg-darkGrey ">
        <div className="row mx-0 py-3 bgTheme">
          {/*
            <RewardModal
            page={this.props.page}
            pageId={this.props.pageId}
            />

            <RewardModal
            page={this.props.page}
            pageId={this.props.pageId}
            />

             <h3>{this.props.page}</h3>
          <h3>{this.props.pageId}</h3>*/}
          <RewardModal
          page={this.props.page}
          pageId={this.props.pageId}
          />
          <div className="col-sm-3 col-md-3 col-lg-3 mb-2">
            <CommentBox
            page={this.props.page}
            pageId={this.props.pageId}
            comments={this.props.comments}
             />
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6 productWrapper">
            <div className="productVR rounded" >
            <WebVR
            width={625}
            height={405}
            page={this.props.page}
            pageId={this.props.pageId}
            productInfo={this.props.productInfo}
             />
             {/*
               <Ftower
               width={625}
               height={405}
               objPath={this.state.objPath}
               mtlPath={this.state.mtlPath}
               materialName={this.state.materialName}
               />
                <WebVR /> <div id="container123"></div>
              <div id="container123" style={containerStyle}></div>
             */}

            </div>
            <ModelFooter page={this.props.page}
              pageId={this.props.pageId}
              productInfo={this.props.productInfo}
             />
          </div>
          <div className="col-sm-3 col-md-3 col-lg-3 ">
            <SuggestionBox
            page={this.props.page}
            pageId={this.props.pageId}
            suggestions={this.props.suggestions}
            />
          </div>
        </div>
        <div className="row mx-0">
          <div className="col-sm-3 col-md-3 col-lg-3">
             <ProductBlog page={this.props.page}
                pageId={this.props.pageId}
               productInfo={this.props.productInfo}
              />
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6 productFeatures rounded">
              <FeaturesList page={this.props.page}
              pageId={this.props.pageId}
              productInfo={this.props.productInfo}
              />
              {/*  productInfo={this.props.productInfo} */}
          </div>
          <div className="col-sm-3 col-md-3 col-lg-3 rounded">
            <ContactForm page={this.props.page} pageId={this.props.pageId} />
          </div>
        </div>
        <div className="row mx-0 mt-4 mb-2">
          <div className="col-sm-12 col-md-12 col-lg-12 bg-info py-2 rounded text-center">
            <h5 className="text-white mb-0">You Might Also Like These</h5>
          </div>
        </div>
        <WebVRSuggestion
        page={this.props.page}
        pageId={this.props.pageId}
        suggestions={this.props.suggestions}
        />
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    productInfo:state.products.productsInfo,
    comments:state.comments.comments,
    suggestions:state.products.suggestions
  }
}

export default connect(mapStateToProps,{getProductInfo,getComments,getSuggestions})(SmartProduct);
