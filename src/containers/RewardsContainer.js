import React from 'react';
import ValidateRewards from '../components/ValidateRewards';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';
import SelectCategory from '../components/SelectCategory';
import SelectProduct from '../components/SelectProduct';
import {categoryLoad,productLoad,rewardsSubmit} from '../actions/productActions';

class RewardsContainer extends React.Component{

    constructor(props){
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
    }

    renderErrors({ meta: {error } }){
      return (<div>
        <div className="form-group">
          {error && <span className="text-danger">{error}</span>}
        </div>
      </div>);
    }
    renderField({ input, label, type, meta: { touched, error } }){
      return (<div>
        <label>{label}</label>
        <div className="form-group">
          <input {...input} type={type} placeholder={label} className="form-control" />
          {touched && error && <span className="text-danger">{error}</span>}
        </div>
      </div>);
    }

    renderDropzoneInput(field){
        const files = field.input.value;
        return (
          <div>
            <Dropzone
              name={field.name}
              multiple={false}
              className="productInfoDropZone"
              onDrop={(acceptedFiles) => {
                  acceptedFiles.forEach(file => {
                      const reader = new FileReader();
                       console.log(reader);
                      reader.onload = () => {
                          const fileAsBinaryString = reader.result;
                          field.input.onChange(acceptedFiles)
                      };
                      reader.onabort = () => console.log('file reading was aborted');
                      reader.onerror = () => console.log('file reading has failed');
                      reader.readAsBinaryString(file);
                  });
              }}
            >
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>

            {field.meta.touched &&
              field.meta.error &&
              <span className="text-danger">{field.meta.error}</span>}

            {files && Array.isArray(files) && (
              <ul className=" row imagesList">
                { files.map((file, i) => <li key={i}
                className= "col-sm-4 col-md-4 col-lg-4 ">
                <div className="mt-2">
                <p className="mb-2 font-weight-bold">Image Preview</p>
                <img src={file.preview} width="100%" height="200px" />
                {file.name}
                {/*file.picture_id.preview ? <img src={file.picture_id.preview} width="100%" height="200px" /> :*/}
                </div>
                </li>) }
              </ul>
            )}
          </div>
        );
      }

    onSubmit(values) {
        this.props.rewardsSubmit(values)
    }

    componentDidMount(){
      this.props.categoryLoad();
    }

    myCallback = (selectedCategory) => {
        this.props.productLoad(selectedCategory);
    }

render(){
  const {
    handleSubmit,
    productLoad,
    getProductInfo,
    pristine,
    reset,
    submitting
  } = this.props
  return(
          <div className="container-fluid my-3">
            <div className="card border border-secondary border-top-0">
              <h4 className="card-header bg-secondary text-white">
                Rewards
              </h4>

              <form onSubmit={handleSubmit(this.onSubmit)}>
              <div className="card-body">
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                    {this.props.rewardsUploadSuccess  &&
                      <p className="alert alert-success">{this.props.rewardsUploadSuccess}</p>
                    }
                    {this.props.rewardsUploadError &&
                      <p className="alert alert-danger">{this.props.rewardsUploadError}</p>
                    }
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4 col-md-4 col-lg-4">
                      <div className="form-group">
                         <Field
                         name="offerDescription"
                         component={this.renderField}
                         type="text"
                         label="Offer Description"
                         />
                      </div>
                    </div>

                    <div className="col-sm-4 col-md-4 col-lg-4">
                      <div className="form-group">
                         <Field
                         name="rewardName"
                         component={this.renderField}
                         type="text"
                         label="Reward Name"
                         />
                      </div>
                    </div>

                    <div className="col-sm-4 col-md-4 col-lg-4">
                      <div className="form-group">
                         <Field
                         name="totalRewardCount"
                         component={this.renderField}
                         type="number"
                         label="Total Reward Count"
                         />
                      </div>
                    </div>

                  </div>

                  <div className="row ">
                    <div className="col-sm-6 col-md-6 col-lg-6 selectOption">

                      <SelectCategory
                      Categories={this.props.category}
                      callbackFromParent={this.myCallback}
                      name="selectCategory"
                      />
                      <div className='errorContainer'>
                        <Field
                          component={this.renderErrors}
                          name="categoryError"
                        ></Field>
                      </div>
                      <SelectProduct
                      Products={this.props.products}
                      error={this.props.error}
                      productParentCallback={this.productBack}
                      />
                      <div className='errorContainer'>
                      <Field
                      component={this.renderErrors}
                      name="productError"
                      ></Field>
                      </div>

                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-6">
                      <label htmlFor="rewardImage">Upload Reward Image</label>
                        <Field
                          name="rewardImage"
                          component={this.renderDropzoneInput}
                          label="Upload Reward Image"
                        />
                    </div>
                  </div>

                  <div className="row ">
                    <div className="col-sm-6 col-md-6 col-lg-6">
                      <button className="btn btn-secondary " type="button"
                      disabled={pristine || submitting} onClick={reset}
                      >
                      <i className="fa fa-refresh mr-2"></i>
                       Reset</button>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6">
                      <button className="btn btn-primary float-right"
                      type="submit"
                      disabled={submitting}
                      >
                      <i className="fa fa-paper-plane mr-2" aria-hidden="true"></i>
                       Submit
                      </button>
                    </div>
                  </div>
              </div>
              </form>
            </div>
          </div>
        );
    }
}

RewardsContainer = connect(
  state => ({
    category:state.category.category,
    products:state.products.product,
    error:state.products.error,
    rewardsUploadSuccess:state.products.rewardsUploadSuccess,
    rewardsUploadError:state.products.rewardsUploadError,
    }),
    {
      rewardsSubmit,
      categoryLoad,
      productLoad
    }
)(RewardsContainer);
export default reduxForm({form: 'Rewards',validate:ValidateRewards})(RewardsContainer);
