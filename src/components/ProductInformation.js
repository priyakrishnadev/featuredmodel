import React from 'react';
import {connect} from 'react-redux';
import ModelForm from './ModelForm';
import EditProductContainer from '../containers/EditProductContainer';

class ProductInformation extends React.Component{
  constructor(props){
    super(props);
    this.notify=this.notify.bind(this);
  }
  notify(){
    window.scrollTo(0,0);
    return <span>{this.props.productNotification}</span>;
  }
  render(){
    const {productNotification} = this.props
    return(
      <div className="row mx-0">
           <div className="container-fluid productInfoForm bg-darkGrey">
                <EditProductContainer />
                {productNotification && <p className="alert alert-primary"> {this.notify()}</p>}
                <ModelForm
                initialValues={this.props.initialValues}
                 />
           </div>
        </div>
      );
    }
}

function mapStateToProps(state){
  const {productNotification} = state.products
  return{
      initialValues:state.products.productsInfo,
      productNotification
  };
}

export default connect(mapStateToProps,null)(ProductInformation);
