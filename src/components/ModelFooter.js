import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {getProductInfo,downVotePollModel,upVotePollModel,modelviewhits,modelrating} from '../actions/productActions';

export class ModelFooter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      localVote: false
    }
    this.updatedTime=this.updatedTime.bind(this);
    this.handleUpvoteClicked = this.handleUpvoteClicked.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.base_url = this.base_url.bind(this);
  }

  // componentDidMount(){
  //   if(this.props.productInfo === undefined || this.props.productInfo.length == 0){
  //     this.props.getProductInfo(this.props.page,this.props.pageId)
  //     .then(res=>this.props.modelviewhits(this.props.pageId));
  //   }
  // }

  handleRating(value){
    this.props.modelrating(value,this.props.pageId);
  }

  updatedTime(data){
    var myarr = data.split(" ");
    var myvar = myarr[0];
    try {
      return  myvar.split('-').reverse().join('-');
    }
    catch(e) {
        return null;
    }
  }

  handleUpvoteClicked(id,voteStatus,like) {
    if(voteStatus === false){
      this.setState({localVote:true});
      this.props.upVotePollModel(id,voteStatus,like);
    }else{
      this.setState({localVote:true});
      this.props.downVotePollModel(id,voteStatus,like);
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
        localVote:false
      });
      if(nextProps.pageId !== this.props.pageId){
        this.props.modelviewhits(this.props.pageId)
      }
  }

base_url() {
      // var pathparts = window.location.pathname.split('/');
      let url = "";
      if (typeof window !== 'undefined') {
        url  = window.location.href;
      } else {
         url = window.location.origin
      }
      return url;
  }

render(){
    return (
          <div>
            { this.props.productInfo && this.props.productInfo.map((product)=>
            <div className="productFooter bg-white border p-3 mb-2" key={product.id}>
              <h4>{product.modelname}
                <span className="float-right productIcons text-info">
                <button className={classnames('float-right text-grey like',
                product.voteStatus === true && 'text-primary glow' )}
                disabled={this.state.localVote}
                onClick={()=>{this.handleUpvoteClicked(product.id,product.voteStatus,product.modellikes)}}
                > <i className="fa fa-thumbs-o-up" aria-hidden="true"></i> {product.modellikes}
                </button>
                  {/*
                    <span className="mx-2">
                      <i className="fa fa-thumbs-o-up" aria-hidden="true">
                       {this.props.productInfo.modellikes}
                       </i>
                    </span>
                    <span className="mx-2">
                    <i className="fa fa-barcode" aria-hidden="true"> </i>
                  </span>*/}
                  <span className="mx-3">
                    <i className="fa fa-eye" aria-hidden="true"> {product.modelviews}</i>
                  </span>
                </span>
              </h4>
              <div className="col-sm-12 col-md-12 col-lg-12 noPadding">
                <p className="text-secondary mb-0">{product.modeldescription}</p>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-12 noPadding">
                <div className="row mx-0">
                  <div className="col-sm-6 col-md-6 col-lg-6 noPadding">
                    <p className="productLaunchedDate mt-2 text-grey">Updated on: {this.updatedTime(product.created_at)}</p>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6  noPadding">
                    <span className="float-right text-secondary shareBtn rounded-circle">

                    <fieldset className="rating">
                      <input type="radio" id="star5" name="rating"
                      value="5"
                        onClick={()=>this.handleRating(5)}
                      />
                        <label className="mt-1 mb-0 mr-2" htmlFor="star5" title="Rocks!">5 stars</label>
                      <input type="radio" id="star4" name="rating"
                      value="4"
                      onClick={()=>this.handleRating(4)}
                      />
                        <label className="mt-1 mb-0" htmlFor="star4" title="Pretty good">4 stars</label>
                      <input type="radio" id="star3" name="rating"
                      value="3"
                      onClick={()=>this.handleRating(3)}
                      />
                        <label className="mt-1 mb-0 " htmlFor="star3" title="Meh">3 stars</label>
                      <input type="radio" id="star2" name="rating"
                      value="2"
                      onClick={()=>this.handleRating(2)}
                      />
                        <label className="mt-1 mb-0" htmlFor="star2" title="Kinda bad">2 stars</label>
                      <input type="radio" id="star1" name="rating"
                      value="1"
                      onClick={()=>this.handleRating(1)}
                      />
                        <label className="mt-1 mb-0" htmlFor="star1" title="Sucks big time">1 star</label>
                    </fieldset>
                      <span className="shareTooltip">
                        <span className="socialIcons">
                          <a href={`whatsapp://send?text=${this.base_url()}`}
                           data-action="share/whatsapp/share" title="whatsapp" target="_blank">
                            <img src="/img/whatsapp.png" width="32px" height="32px" alt="whatsapp" />
                          </a>
                          <a href={`https://www.facebook.com/sharer/sharer.php?u=${this.base_url()}`} target="_blank" title="facebook">
                            <img src="/img/facebook.png" width="32px" height="32px" alt="facebook" />
                          </a>
                          {/*<a href="" className="" title="youtube" target="_blank">
                            <img src="/img/youtube.png" width="32px" height="32px" alt="youtube" />
                          </a>*/}
                          <span className="arrowDown"></span>
                        </span>
                        <i className="fa fa-share-alt-square" aria-hidden="true"></i>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
          );
        }
  }

  //
  function mapStateToProps(state){
    return {
      productInfo:state.products.productsInfo
    }
  }

  export default connect(mapStateToProps,{getProductInfo,downVotePollModel,upVotePollModel,modelrating,modelviewhits})(ModelFooter);
