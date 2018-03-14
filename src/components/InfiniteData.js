import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import FeaturedOffer from './FeaturedOffer';
const BUSY = {};

class InfiniteData extends React.Component{

constructor(props){
super(props);
this.state={
  newData: [],
  requestSent: false,
  scrollCounter:1
  }
  this.handleOnScroll = this.handleOnScroll.bind(this);
  this.buildData = this.buildData.bind(this);
  this.groupBy = this.groupBy.bind(this);
  this.methodCall = this.methodCall.bind(this);
}

componentDidMount(){
  if(this.state.newData.length === 0){
    window.addEventListener('scroll', this.handleOnScroll);
    this.doQuery(1).then(res=>
      this.setState({
       newData: this.state.newData.slice().concat(res),
      requestSent: false
    }))
  }
}

componentWillUnmount() {
  window.removeEventListener('scroll', this.handleOnScroll);
}

queryActive = false;
doQuery(queryParam) {
  if(this.queryActive){
    return Promise.resolve(BUSY);
  }
  this.queryActive=true;
  switch(queryParam){
    case 1: return this.buildData("furniture","pets")
                  .then((res)=>res)
                  .catch((err)=>err)
    case 2: return this.buildData("resorts","interior_designs")
                   .then((res)=>res)
                   .catch((err)=>err)
    case 3: return this.buildData("resto_pubs","fitness_sports")
                  .then((res)=>res)
                  .catch((err)=>err)
    // case 4: return this.buildData("").then((res)=>res);
    // break;
    default: return true;
  }

}

buildData(queryParam1,queryParam2){
  return axios.get("http://127.0.0.1:8000/rewards/categories",{
  params: {
    firstCategory: queryParam1,
    secondCategory: queryParam2
  }
})
  .then( res=> {this.queryActive=false;return res.data;})
  .catch(err=>{
    this.queryActive=false;
    return Promise.reject(err);
  })
}


handleOnScroll(){
  var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
  var clientHeight = document.documentElement.clientHeight || window.innerHeight;
  var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
  if (scrolledToBottom) {
    this.setState({
      scrollCounter: this.state.scrollCounter + Math.floor(scrolledToBottom)
    })

    if(this.state.scrollCounter<4){
      this.doQuery(this.state.scrollCounter).then(res=>
      (res===BUSY)
        ? false
        : this.setState({
            newData: this.state.newData.slice().concat(res)
          })
        )
        .catch(err=>this.setState({requestSent: false}))
        this.setState({requestSent: true});
    }else{
      return true
    }
  }
}

  groupBy(xs, key) {
    if(xs[0] !== undefined){
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    }return xs=[];
  };

  changeText(categoryName){
    if(categoryName !== undefined){
      let categoryTitle=categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
      categoryTitle=categoryTitle.split('_').join(' ');
      return categoryTitle;
    }
  }
  // to change the string to uppercase and remove underscore
  methodCall(str){
    let i=0;
    let frags = str.split('_');
    for (i=0; i<frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }

  render()
  {
    const groupedByCategory = this.groupBy(this.state.newData,'name')
    const renderContext = this
    return (
    <div>
     <div className="data-container">
      {this.state.newData.length > 0 && Object.keys(groupedByCategory).map(function(categoryName,i)
        {return(
          <div key={i} className="row mx-0 my-3">
              <div className="col-sm-10 col-md-10 col-lg-10 mb-2">
                <h3 className="featureTitle ">
                Featured {renderContext.methodCall(categoryName)}
                </h3>
              </div>
              <div className="col-sm-2 col-md-2 col-lg-2 mb-2">
                <Link to={`/SmartView/${categoryName}`} className="routeDecorator ">
                  <h5 className="featureTitle float-right mt-3">View All
                   <i className="fa fa-angle-right font-weight-bold px-1" aria-hidden="true"></i>
                  </h5>
                </Link>
              </div>
              {
                groupedByCategory[categoryName].map((data,i) =>
                  <FeaturedOffer
                    key={i}
                    categoryName={`${categoryName}`}
                    title={data.name}
                    offerDescription={data.offerdescription}
                    rewardImage={data.reward_image}
                    productName={data.modelname}
                    thumbnailImage={data.thumbnailimage}
                  />
                )
              }
          </div>
        );})}
     </div>
    </div>
    );
  }
}

export default InfiniteData;
