import React from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {trending} from '../actions/landingPageActions';
import ResourceNotFound from './ResourceNotFound';

class Trending extends React.Component{
  componentDidMount(){  
      if(this.props.trendingHits.length === 0){
        this.props.trending();
      }
  }
  render(){
    const {error} = this.props
    if(error) return <ResourceNotFound error={error}/>;
    return(
      <div className="row">
          {this.props.trendingHits && this.props.trendingHits.map((trending,index)=>
          <div className="col-sm-3 col-md-3 col-lg-3 " key={index}>
            <Link to={`/SmartView/${trending.name}/${trending.modelname}`} className="routeDecorator">
               <div className="bg-white border mb-2 p-3 rounded productBlock">
                 <img src={`${trending.thumbnailimage}`} alt="productimage" width="100%" height="200px" />
                 <h5 className="mt-2 ">{trending.modelname} | {trending.modelsubtitle} </h5>
                   <span className="text-grey productHits">
                     <span className="mr-2">
                     <i className="fa fa-thumbs-o-up" aria-hidden="true"> {trending.modellikes}</i>
                     </span>
                     <span className="float-right">
                     <i className="fa fa-eye" aria-hidden="true"> {trending.modelviews} views</i>
                     </span>
                   </span>
               </div>
             </Link>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state){
  const {trendingHits,trendingError}=state.main
  return {
    trendingHits,
    error:trendingError
  }
}

export default connect(mapStateToProps,{trending})(Trending);
