import React from 'react';
import {connect} from 'react-redux';
import {getCategoryInfo,search,sortBy} from '../actions/productActions';
import {getVisibleCategory} from '../selectors';
import {Link} from 'react-router-dom';
import ResourceNotFound from './ResourceNotFound';
import SortBy from './SortBy';
import SearchBy from './SearchBy';

 class SmartCategory extends React.Component{
   constructor(props){
     super(props);
     this.state={
       searchFilter:""
     }
     this.searchData=this.searchData.bind(this);
   }

   searchData(data){
     this.setState({
      searchFilter:data
    });
    this.props.search(data);
   }

   componentDidMount(){
       // if(this.props.product === undefined || this.props.product.length === 0){
       this.props.getCategoryInfo(this.props.page,this.props.pageId);
      // }
   }

   componentWillReceiveProps(nextProps){
       if(nextProps.page !== this.props.page || nextProps.pageId !== this.props.pageId){
          this.props.getCategoryInfo(nextProps.page,nextProps.pageId);
       }
   }

  changeText(){
    if(this.props.categoryTitle !== undefined){
      let categoryTitle=this.props.categoryTitle.charAt(0).toUpperCase() + this.props.categoryTitle.slice(1);
      categoryTitle=categoryTitle.split('_').join(' ');
      return categoryTitle;
    }
  }

  myCallback = (data) => {
      this.props.sortBy(data);
  }

render(){
  const {error,isLoading}=this.props
    if(error) return <ResourceNotFound error={error}/>;
    if(isLoading) return <div className="spinner"></div>;
    return (
      <div className="container-fluid mb-4 categoryWrapper">
        <div className="row mx-0 pt-4">
          <div className="col-sm-6 col-md-6 col-lg-6">
            <h3 className=" productTitle">
            {this.changeText()}
            </h3>
          </div>
          <div className=" col-sm-4 col-md-4 col-lg-4 px-2">
            <SearchBy
              handleSearch={this.searchData}
              searchValue={this.state.searchFilter}
            />
          </div>
          <div className=" col-sm-2 col-md-2 col-lg-2 px-2">
            <SortBy
              handleSortBy={this.myCallback}
            />
          </div>
        </div>
        <div className="row mx-0 py-3">
          {this.props.isLoading ? <div className="spinner"></div> : null}
            {this.props.product && this.props.product.map((product,i)=>
                <div className="col-sm-3 col-md-3 col-lg-3" key={product.id}>
                  <Link to={`/SmartView/${this.props.page}/${product.modelname}`} className="routeDecorator">
                    <div className="border mb-2 p-3 rounded itemCard">
                      <img src={`http://127.0.0.1:8000${product.thumbnailimage}`} alt="" width="100%" height="200px" />
                        <h5 className="productTitle my-2">{product.modelname}</h5>
                        <p className="productDescription text-secondary">
                          {product.modelsubtitle}
                        </p>
                        <span className="text-grey productHits">
                        <span className="mr-2">
                        <i className="fa fa-thumbs-o-up" aria-hidden="true"> {product.modellikes}</i>
                        </span>
                        <span className="float-right">
                        <i className="fa fa-eye" aria-hidden="true"> {product.modelviews} views</i>
                        </span>
                        </span>
                    </div>
                  </Link>
                </div>
            )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  const {isLoading,error,categoryTitle,product} = state.products
    return {
        isLoading,
        error,
        product:getVisibleCategory(state) || product,
        categoryTitle
    }
}

export default connect(mapStateToProps,{getCategoryInfo,search,sortBy})(SmartCategory);
