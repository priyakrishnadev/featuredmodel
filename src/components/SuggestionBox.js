import React from 'react';
import {connect} from 'react-redux';
import {getSuggestions} from '../actions/productActions';
import {Link,withRouter} from 'react-router-dom';

class SuggestionBox extends React.Component{




render(){
    return (
            <div>
              <div className=" border rounded bg-white py-2">
                <div className="suggestionHeader text-center  border-0">
                  <h4 className="px-2">Suggestions</h4>
                </div>
              </div>
              <div className="suggestionSection scrollBar bg-white">
                <div className="componentMap">
                  <ul>
                    { this.props.suggestions &&
                      this.props.suggestions.sort((a, b) => a.suggestionslot > b.suggestionslot).map((suggestion)=>
                      <li key={suggestion.id}>
                        <Link to={`/SmartView/${this.props.page}/${suggestion.modelname}`} className="routeDecorator">
                          <div  className="row mx-0 border py-2 px-2">
                            <div className="col-sm-4 col-md-4 col-lg-4 pr-2 pl-0 ">
                              <img src={`http://127.0.0.1:8000${suggestion.thumbnailimage}`} className="rounded" alt="suggestedVR" width="100%" height="70px" />
                            </div>
                            <div className="userInfo col-sm-8 col-md-8 col-lg-8 noPadding">
                              <h6>{suggestion.modelname}</h6>
                              <p className="userComment text-grey">{suggestion.modelsubtitle}</p>
                              <div className="row mx-0">
                                <div className="col-sm-6 col-md-6 col-lg-6 px-0 ">
                                  <span className=" text-grey ">
                                    <span className="mr-2">
                                      <i className="fa fa-eye" aria-hidden="true"> {suggestion.modelviews} views</i>
                                    </span>

                                    {/*<span className="like">
                                      <i className="fa fa-thumbs-o-up" aria-hidden="true"> 45</i>
                                    </span>*/}
                                  </span>
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-6  noPadding">
                                  <span className="float-right text-secondary shareBtn rounded-circle">
                                    <span className="suggestedProductRating">
                                      {/*<i className="fa fa-star-o text-info" aria-hidden="true"></i>
                                      <i className="fa fa-star-o text-info" aria-hidden="true"></i>
                                      <i className="fa fa-star-o text-info" aria-hidden="true"></i>
                                      <i className="fa fa-star-o text-info" aria-hidden="true"></i>
                                      <i className="fa fa-star-o " aria-hidden="true"></i>*/}
                                      <span className="like">
                                        {suggestion.averagerating} <i className="fa fa-star-o text-info" aria-hidden="true"></i>
                                      </span>
                                    </span>
                                  </span>
                                </div>

                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                      )
                    }
                  </ul>
                </div>
              </div>
            </div>
          );
  }
}

// function mapStateToProps(state){
//   return {
//     suggestions:state.products.suggestions
//   }
// }

// export default connect(mapStateToProps,{getSuggestions})(SuggestionBox);
// export default withRouter(connect(mapStateToProps,{getSuggestions})(SuggestionBox));
export default withRouter(connect(null,{getSuggestions})(SuggestionBox));
