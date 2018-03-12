import React from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {mostpopular} from '../actions/landingPageActions';
import ResourceNotFound from './ResourceNotFound';

class MostPopular extends React.Component{
  componentDidMount(){
    if(this.props.mostPopular.length === 0){
      this.props.mostpopular();
    }
  }
  render(){
    const {error} = this.props
    if(error) return <ResourceNotFound error={error}/>;
    return(
      <div className="row">
     {this.props.mostPopular && this.props.mostPopular.map((popular,index)=>
      <div className="col-sm-3 col-md-3 col-lg-3 " key={index}>
        <Link to={`/SmartView/${popular.name}/${popular.modelname}`} className="routeDecorator">
           <div className="bg-white border mb-2 p-3 rounded productBlock">
             <img src={`${popular.thumbnailimage}`} alt="productimage" width="100%" height="200px" />
             <h5 className="mt-2 ">{popular.modelname} | {popular.modelsubtitle} </h5>
               <span className="text-grey productHits">
                 <span className="mr-2">
                 <i className="fa fa-thumbs-o-up" aria-hidden="true"> {popular.modellikes}</i>
                 </span>
                 <span className="float-right">
                 <i className="fa fa-eye" aria-hidden="true"> {popular.modelviews} views</i>
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
  const {mostPopular,mostpopularError}=state.main
  return {
    mostPopular,
    error:mostpopularError
  }
}

export default connect(mapStateToProps,{mostpopular})(MostPopular);
