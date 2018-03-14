import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getProductInfo} from '../actions/productActions';

class BlogContainer extends React.Component{

componentDidMount(){
  this.props.getProductInfo(this.props.match.params.page,this.props.match.params.pageId);
}

render(){
    return(
        <div className="row mx-0 ">
          { this.props.productInfo &&
              this.props.productInfo.map((product,i)=>
              <div className="col-sm-12 col-md-12 col-lg-12 px-0" key={i}>
                 <img src={`http://127.0.0.1:8000${product.blogimage}`} alt="Blog_Cover" width="100%" height="350px" />
                 <div className="container">
                   <div className="row mx-0 blogPage">
                     <div className="col-sm-3 col-md-3 col-lg-3 px-0 ">
                      <div className="blogPic">
                      <img className="bordered" src={`http://127.0.0.1:8000${product.thumbnailimage}`} alt="thumbnailImage" width="100%" height="300px" />
                      <h4 className="text-center my-3">{product.modelname}</h4>
                      </div>
                     </div>
                     <div className="col-sm-9 col-md-9 col-lg-9 px-0 blogDetails">
                       <p className="lead ml-4 my-4">
                       {product.blogdetails}
                       </p>
                       <p>
                       <Link to={`/SmartView/${this.props.match.params.page}/${product.modelname}`}  className="text-primary float-right noDecoration"><i className="fa fa-arrow-circle-left" aria-hidden="true"></i> Go back to main page</Link>
                       </p>
                     </div>
                   </div>
                 </div>
              </div>
            )
          }
        </div>
    );
  }
}

function mapStateToProps(state){
  return {
    productInfo:state.products.productsInfo
  }
}

export default connect(mapStateToProps,{getProductInfo})(BlogContainer);
