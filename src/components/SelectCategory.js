import React from 'react';
import { Field } from 'redux-form';

class SelectCategory extends React.Component {
  onChangeOption=(e)=>{
    if (e.detail === 0){
      this.props.callbackFromParent(e.target.value);
    }
  }

  render() {
    return (
        <div className="form-group mb-0">
            <Field
            component="select"
            className=" form-control"
            name="selectCategory"
            onClick={this.onChangeOption}
            required
            >
            <option value="" disabled>Select Category</option>
            { this.props.Categories && this.props.Categories.map((category) =>
            <option key={category.id} value={category.name} className="textTransform">
            { category.name.charAt(0).toUpperCase() + category.name.slice(1) }
            </option>
            )}
            </Field>
        </div>
    );
  }
}
export default SelectCategory;
