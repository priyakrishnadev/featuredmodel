import React from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {suggested} from '../actions/landingPageActions';
import ResourceNotFound from './ResourceNotFound';

class Suggested extends React.Component{

  componentDidMount(){
    if(this.props.suggestedInfo.length === 0){
      this.props.suggested();
    }
  }

  render(){
      const {error} = this.props
      if(error) return <ResourceNotFound error={error}/>;
    return(
      <div className="row">
      {this.props.suggestedInfo && this.props.suggestedInfo.map((suggest,index)=>
       <div className="col-sm-3 col-md-3 col-lg-3 " key={index}>
         <Link to={`/SmartView/${suggest.name}/${suggest.modelname}`} className="routeDecorator">
            <div className="bg-white border mb-2 p-3 rounded productBlock">
              <img src={`${suggest.thumbnailimage}`} alt="productimage" width="100%" height="200px" />
              <h5 className=" mt-2 ">{suggest.modelname} | {suggest.modelsubtitle} </h5>
                <span className="text-grey productHits">
                  <span className="mr-2">
                  <i className="fa fa-thumbs-o-up" aria-hidden="true"> {suggest.modellikes}</i>
                  </span>
                  <span className="float-right">
                  <i className="fa fa-eye" aria-hidden="true"> {suggest.modelviews} views</i>
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
  const {suggestedInfo,suggestionError}=state.main
  return {
    suggestedInfo,
    error:suggestionError
  }
}

export default connect(mapStateToProps,{suggested})(Suggested);
