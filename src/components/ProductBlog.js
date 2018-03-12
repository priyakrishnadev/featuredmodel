import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getProductInfo} from '../actions/productActions';

export class ProductBlog extends React.Component{

constructor(props){
  super(props);
  this.blogdetails=this.blogdetails.bind(this);
}

// componentDidMount(){
//   if(this.props.productInfo === undefined || this.props.productInfo.length == 0){
//     this.props.getProductInfo(this.props.page,this.props.pageId);
// }
// }

blogdetails(data){
  if(data.length > 50)
  var blogtext = data.substring(0,50);
  return blogtext;
}

render(){
    return(
        <div>
          { this.props.productInfo && this.props.productInfo.map((product)=>
            <div className="col-sm-12 col-md-12 col-lg-12 bg-white pt-3 pb-5 rounded" key={product.id}>
               <img src={`http://127.0.0.1:8000${product.blogimage}`} alt="" width="100%" height="250px" />
               <h4 className="py-2 mb-0">{product.modelname}</h4>
               <p className="text-secondary">{product.blogdetails}</p>
               <Link to={`/blog/${this.props.page}/${product.modelname}`} type="button" className="btn btn-info btn-sm float-right">Read More</Link>
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

// export default connect(mapStateToProps,{getProductInfo})(ProductBlog);
export default connect(null,{getProductInfo})(ProductBlog);
