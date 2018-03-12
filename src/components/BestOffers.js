import React from 'react';
import {connect} from 'react-redux';
import {getBestOffers,searchforOffer,sortByOffer} from '../actions/productActions';
import {getVisibleOffers} from '../selectors';
import {Link} from 'react-router-dom';
import FeaturedOffer from './FeaturedOffer';
import SortBy from './SortBy';
import SearchBy from './SearchBy';
import ResourceNotFound from './ResourceNotFound';

 class BestOffers extends React.Component{
   constructor(props){
     super(props);
     this.state={
       searchFilter:""
     }
     this.searchData=this.searchData.bind(this);
   }
   componentDidMount(){
      // if(this.props.product === undefined || this.props.product.length === 0){
       this.props.getBestOffers()
      // }
   }
   searchData(data){
     this.setState({
      searchFilter:data
    });
    this.props.searchforOffer(data);
   }
   myCallback = (data) => {
       this.props.sortByOffer(data);
   }
   render(){
     const {offerNotFound,isLoading,isLoaded}=this.props
     if(offerNotFound) return <ResourceNotFound error={offerNotFound}/>;
     if(isLoading) return <div className="spinner"></div>;
     return (
       <div className="container-fluid mb-4 categoryWrapper">
         <div className="row mx-0 pt-4">
           <div className="col-sm-6 col-md-6 col-lg-6">
             <h3 className=" productTitle">
             Best Offers
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
           {
             this.props.bestOffersData && this.props.bestOffersData.map((data,i) =>
               <FeaturedOffer
                 key={i}
                 categoryName={data.name}
                 offerDescription={data.offerdescription}
                 rewardImage={data.reward_image}
                 productName={data.modelname}
                 thumbnailImage={data.thumbnailimage}
               />
             )
           }
         </div>
      </div>
     );
   }
}

function mapStateToProps(state){
  const {bestoffers,searchText,sortValue,offerNotFound,isLoading,isLoaded} = state.products
    return {
      offerNotFound,
      isLoading,
      isLoaded,
      bestOffersData:getVisibleOffers(state) || bestoffers
    }
}

export default connect(mapStateToProps,{getBestOffers,searchforOffer,sortByOffer})(BestOffers);
