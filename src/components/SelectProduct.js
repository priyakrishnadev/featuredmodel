import React from 'react';
import { Field } from 'redux-form';

class SelectProduct extends React.Component {
  products=()=>{
    if(this.props.Products){
      if(this.props.error){
        return <option className="textTransform text-danger">
        {this.props.error}
        </option>
      }else{
        return this.props.Products && this.props.Products.map((product) =>
        <option key={product.id} value={product.id} className="textTransform">
        {product.modelname}
        </option>)
      }
    }
  }
  render() {
    let isProductAvailable=true;
    if(this.props.Products===undefined || !this.props.Products){
      isProductAvailable=false;
    }
    return (
        <div className="form-group mb-0">
            <Field
            name="selectProduct"
            component="select"
            className="form-control"
            required
            >
            <option value="0" className="text-danger">Select Product</option>
            {isProductAvailable && this.products()}
            </Field>
        </div>
    );
  }
}
export default SelectProduct;
