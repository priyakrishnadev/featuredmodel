import React from 'react';
import { Field,reduxForm } from 'redux-form';
import validate from '../components/validate'
import {connect} from 'react-redux';
import SelectCategory from '../components/SelectCategory';
import SelectProduct from '../components/SelectProduct';
import {categoryLoad,productLoad,EditProductValues} from '../actions/productActions';

class EditProductContainer extends React.Component{
constructor(props){
  super(props);
  this.onSubmit = this.onSubmit.bind(this);
}

componentDidMount(){
  this.props.categoryLoad();
}
onSubmit(values) {
    return this.props.EditProductValues(values);
}

myCallback = (selectedCategory) => {
    this.props.productLoad(selectedCategory);
}

render(){
  const { handleSubmit, productLoad, getProductInfo, pristine, reset, submitting} = this.props
  return(
          <form>
            <div className="row mx-0 my-3 pt-3 rounded text-white bgSmartView">
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <h3>Product Information</h3>
                </div>

                <div className="col-sm-3 col-md-3 col-lg-3 ">
                  <SelectCategory
                  Categories={this.props.category}
                  callbackFromParent={this.myCallback}
                  />
                </div>

                <div className="col-sm-3 col-md-3 col-lg-3 ">
                  <SelectProduct
                  Products={this.props.products}
                  error={this.props.error}
                  productParentCallback={this.productBack}
                  />
                </div>

                <div className="col-sm-2 col-md-2 col-lg-2 ">
                  <button type="submit"  className=" btn btn-primary btn-block" name="EditForm"
                  onClick = {handleSubmit(values =>this.onSubmit({values},'EditForm'))}
                  disabled={submitting}>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit Product Info
                  </button>
                </div>
            </div>
          </form>
        );
    }
}

EditProductContainer = connect(
  state => ({
    category:state.category.category,
    products:state.products.product,
    error:state.products.error
    }),
    {
      EditProductValues,
      categoryLoad,
      productLoad}
)(EditProductContainer);

export default reduxForm({
    form: 'FilterProduct', // a unique name for this form
    validate
})(EditProductContainer);
