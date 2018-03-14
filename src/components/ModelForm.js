import React from 'react';
import FileInput from './FileInput';
import { Field, FieldArray, reduxForm } from 'redux-form';
import validate from './validate'
import {connect} from 'react-redux';
import {handleProductValues,categoryLoad} from '../actions/productActions';
import Dropzone from 'react-dropzone';

class ModelForm extends React.Component{

  renderField({ input, label, type, meta: { touched, error } }){
    return (<div>
      <label>{label}</label>
      <div className="form-group">
        <input {...input} type={type} placeholder={label}  className="form-control" />
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
          multiple={field.input.name==="featureimages1" ? true : false}
          className="productInfoDropZone"
          onDrop={(acceptedFiles) => {
              acceptedFiles.forEach(file => {
                  const reader = new FileReader();
                  reader.onload = () => {
                      // const fileAsBinaryString = reader.result;
                      // console.log(fileAsBinaryString);
                      field.input.onChange(acceptedFiles)
                      // do whatever you want with the file content
                  };
                  // reader.onabort = () => console.log('file reading was aborted');
                  // reader.onerror = () => console.log('file reading has failed');
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
            className= "col-sm-2 col-md-2 col-lg-2 ">
            <div className="mt-2">
            <p className="mb-2 font-weight-bold">Image Preview</p>
            <img src={file.preview} width="100%" height="200px"
            alt="imagepreview"
            />
            {file.name}
            {/*file.picture_id.preview ? <img src={file.picture_id.preview} width="100%" height="200px" /> :*/}
            </div>
            </li>) }
          </ul>
        )}
      </div>
    );
  }

  renderTextarea({ input, label, type, meta: { touched, error } }){
    return(
    <div>
      <div className="form-group">
        <textarea {...input} type={type} placeholder={label} rows="10" className="form-control shareThought"></textarea>
        {touched && error && <span className="text-danger">{error}</span>}
      </div>
    </div>
  );
}

renderImageFeatures({ fields, meta: { error, submitFailed } }){
  return (
    <div>
        <button type="button" className="btn btn-success" onClick={() => fields.push({})}>
          <i className="fa fa-plus-circle" aria-hidden="true"></i> Add Images
        </button>
        {submitFailed && error && <div className="text-danger">{error}</div>}
        <ul className="featuresList">
          {fields.map((featureimages, index) => (
            <li key={index} className="col-md-2  my-2">
            <button
                type="button"
                title="Remove Image"
                className="btn btn-danger pull-right"
                onClick={() => fields.remove(index)}
              ><i className="fa fa-trash" aria-hidden="true"></i>
              </button>
              <h5>Image #{index + 1}</h5>
              <div className="form-group">
              <Field name={`${featureimages}.image`}
                 component={FileInput}
                 type="file"
              />
              </div>
            </li>
          ))}
        </ul>
  </div>
);
}

renderSelectField({ input, label, type, meta: { touched, error }, children }){
  return (
  <div>
    <div>
      <select {...input} className="form-control">
        {children}
      </select>
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);
}

renderVideoFeatures({ fields, meta: { error, submitFailed } }) {
  return (
    <div>
        <button type="button" className="btn btn-success" onClick={() => fields.push({})}>
          <i className="fa fa-plus-circle" aria-hidden="true"></i> Add Videos
        </button>
        <span className="text-danger pull-right">{/*Please do not add images and videos features here!!*/}</span>
        {submitFailed && error && <div className="text-danger">{error}</div>}
        <ul className="featuresList">
          {fields.map((featurevideos, index) => (
            <li key={index} className="col-md-4  my-2">
            <button
                type="button"
                title="Remove Video"
                className="btn btn-danger pull-right"
                onClick={() => fields.remove(index)}
              ><i className="fa fa-trash" aria-hidden="true"></i>
              </button>
              <h5>Video #{index + 1}</h5>
              <div className="form-group">
                <Field name={`${featurevideos}.video`}
                   component="input"
                   type="text"
                   className="form-control"
                />
              </div>
            </li>
          ))}
        </ul>
  </div>
);
}

  constructor(props){
    super(props);
    this.state={
      isClientChecked:false,
      clientValue:false
    }
    this.categories=this.categories.bind(this);
    this.handleCheckBox=this.handleCheckBox.bind(this);
    this.handleCheckBoxValue=this.handleCheckBoxValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    this.props.handleProductValues(values);
  }

handleCheckBox(e) {
  // this.setState({
  //   // isClientChecked:e.target.checked
  //   isClientChecked : e.target.checked
  // })
  this.setState({ isClientChecked : e.target.checked });
}

handleCheckBoxValue(evt) {
  this.setState({
        clientValue: evt.target.value
  });
}

  categories() {
    return this.props.category && this.props.category.map((category) =>
        <option key={category.id} value={category.name} className="textTransform">
          {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
        </option>
      )
  }

  render(){
    const { handleSubmit,pristine,reset,submitting} = this.props
    return(
      <div>

          <div className="card border border-secondary border-top-0">
            <h4 className="card-header bg-secondary text-white">
              Model Info
            </h4>

            <div className="card-body">
                <div className="row">

                  <div className="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <Field
                        name="modelname"
                        type="text"
                        component={this.renderField}
                        label="Model Name"
                      />
                    </div>
                  </div>

                  <div className="col-sm-2 col-md-2 col-lg-2">
                    <div className="form-group">
                      <Field
                        name="modellikes"
                        type="number"
                        component={this.renderField}
                        label="Model Likes"
                      />
                    </div>
                  </div>

                  <div className="col-sm-2 col-md-2 col-lg-2">
                    <div className="form-group">
                        <Field
                          name="modelviews"
                          type="number"
                          component={this.renderField}
                          label="Model Views"
                        />
                    </div>
                  </div>

                  <div className="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                        <Field
                          name="averagerating"
                          type="number"
                          component={this.renderField}
                          label="Average Rating Out of 5"
                        />
                    </div>
                  </div>

                </div>
                <div className="row">
                  <div className="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group ">
                    <label>Model Genre/Category</label>
                    <Field name="modelGenre"
                    component={this.renderSelectField}>
                      <option value="0" disabled>Select Category</option>
                    { this.categories() }
                    </Field>
                    <div className="featuredClientContainer mt-3">
                      <label htmlFor="featured_client">Featured Client
                        <Field
                            name="featured_client"
                            component="input"
                            type="checkbox"
                            onClick={this.handleCheckBox}
                            onChange={this.handleCheckBoxValue}
                         />
                        <span className="checkmark"></span>
                       </label>
                    </div>

                    {/*<Field name="modelGenre" component="select" className="form-control">
                        <option value="0" disabled>Select Category</option>
                        { this.categories() }
                      </Field>*/}
                    </div>
                    <div className="form-group ">
                      <Field
                        name="modelsubtitle"
                        type="text"
                        component={this.renderField}
                        label="Model Mini Title"
                      />
                    </div>
                    <div className="form-group">
                        <label>Suggestion Slot</label>
                          <Field name="suggestionslot" component="select" className="form-control">
                            <option value="0" disabled>None</option>
                            <option value="1">Rank 1</option>
                            <option value="2">Rank 2</option>
                            <option value="3">Rank 3</option>
                            <option value="4">Rank 4</option>
                            <option value="5">Rank 5</option>
                          </Field>
                    </div>

                  </div>
                  <div className="col-sm-8 col-md-8 col-lg-8">
                    <div className="form-group ">
                      <label htmlFor="modeldescription">Model Description</label>
                      <Field
                        name="modeldescription"
                        component={this.renderTextarea}
                        rows="12"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group ">
                      <label>Thumbnail Image</label>
                      <Field
                        name="thumbnailimage1"
                        component={this.renderDropzoneInput}
                      />
                    </div>
                    <div className="form-group ">
                      <label> Model File <span className="text text-secondary">[---Please upload the zip file having gltf file---]</span></label>
                      <Field
                        name="modelfile"
                        component={this.renderDropzoneInput}
                      />
                    </div>
                    <div className="row mx-0">
                      <div className="col-sm-6 col-md-6 col-lg-6 px-0">
                        <div className="row mx-0">
                          <div className="col-sm-12 col-md-12 col-lg-12">
                          <label> Scale Position </label>
                          </div>
                          <div className="col-sm-4 col-md-4 col-lg-4">
                            <div className="form-group ">
                              <Field
                                name="modelScaleParam1"
                                type="number"
                                component={this.renderField}
                                label="Scale Param1"
                              />
                            </div>
                          </div>
                          <div className="col-sm-4 col-md-4 col-lg-4">
                            <div className="form-group ">
                              <Field
                              name="modelScaleParam2"
                              type="number"
                              component={this.renderField}
                              label="Scale Param2"
                              />
                            </div>
                          </div>
                          <div className="col-sm-4 col-md-4 col-lg-4">
                            <div className="form-group ">
                              <Field
                              name="modelScaleParam3"
                              type="number"
                              component={this.renderField}
                              label="Scale Param3"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-6 col-lg-6 px-0">
                        <div className="row mx-0">
                          <div className="col-sm-12 col-md-12 col-lg-12">
                          <label> Light Position </label>
                          </div>
                          <div className="col-sm-4 col-md-4 col-lg-4">
                            <div className="form-group ">
                              <Field
                              name="modelLightParam1"
                              type="number"
                              component={this.renderField}
                              label="Light Param1"
                              />
                            </div>
                          </div>
                          <div className="col-sm-4 col-md-4 col-lg-4">
                            <div className="form-group ">
                              <Field
                              name="modelLightParam2"
                              type="number"
                              component={this.renderField}
                              label="Light Param2"
                              />
                            </div>
                          </div>
                          <div className="col-sm-4 col-md-4 col-lg-4">
                            <div className="form-group ">
                              <Field
                              name="modelLightParam3"
                              type="number"
                              component={this.renderField}
                              label="Light Param3"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="row mx-0">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                    <label>Camera Angle Position Parameters</label>
                    </div>
                      <div className="col-md-2 col-sm-2 col-lg-2">
                        <div className="form-group ">
                          <Field
                            name="modelCameraFor"
                            type="number"
                            component={this.renderField}
                            label="Camera For"
                          />
                        </div>
                      </div>

                      <div className="col-md-2 col-sm-2 col-lg-2">
                        <div className="form-group ">
                          <Field
                            name="modelCameraNear"
                            type="number"
                            component={this.renderField}
                            label="Camera Near"
                          />
                        </div>
                      </div>
                      <div className="col-md-2 col-sm-2 col-lg-2">
                        <div className="form-group ">
                          <Field
                            name="modelCameraFar"
                            type="number"
                            component={this.renderField}
                            label="Camera Far"
                          />
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-3 col-lg-3">
                        <p className="alert alert-warning">Please enter light color with hexadecimal format eg:<span className="hexaColor">#2F3255</span></p>
                        <div className="form-group ">
                          <Field
                            name="modelLightColor"
                            type="text"
                            component={this.renderField}
                            label="Light Color"
                          />
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-3 col-lg-3">
                      <p className="alert alert-warning">Please enter background color with following format eg:<span className="text-info">0x00c8d6</span></p>
                        <div className="form-group ">
                          <Field
                            name="modelBackgroundColor"
                            type="text"
                            component={this.renderField}
                            label="Model Background Color"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div className="card my-3 border-secondary">
            <h4 className="card-header bg-secondary text-white">
              Features List
            </h4>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <div className="form-group">
                    <Field
                      name="featuretabtitleone"
                      type="text"
                      component={this.renderField}
                      label="Feature Tab Title"
                    />
                    <label>Feature Tab Description</label>
                    <Field
                      name="featuretabtitleonedescription"
                      component={this.renderTextarea}
                    />
                  </div>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <div className="form-group">
                    <Field
                      name="featuretabtitletwo"
                      type="text"
                      component={this.renderField}
                      label="Feature Tab Title"
                    />
                    <div className="alert alert-warning">
                    <p className="mb-0"> If the title is "Location",add the company address without special character for example: https://www.google.com/maps/embed/v1/place?q=COMPANY_ADDRESS&key=AIzaSyCOc19rNqIOQnlDtBEH2lOuGhCnnP-avgY&zoom=12
                    </p>
                    {/*Use google key AIzaSyCjRlKOwkai8sujtHoidWGF-pCiJx7YcF0*/}
                    </div>
                    <label>Feature Tab Description</label>
                    <Field
                      name="featuretabtitletwodescription"
                      component={this.renderTextarea}
                    />
                  </div>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <div className="form-group">
                    <Field
                      name="featuretabtitlethree"
                      type="text"
                      component={this.renderField}
                      label="Feature Tab Title"
                    />
                    <label>Feature Tab Description</label>
                    <Field
                      name="featuretabtitlethreedescription"
                      component={this.renderTextarea}
                    />
                  </div>
                </div>
              </div>
            </div>
            <h4 className="card-header bg-secondary text-white">
              Add Images
            </h4>
            <div className="card-body">
              {/*  <FieldArray name="imagefeatures" component={renderImageFeatures} />*/}
              <Field
                name="featureimages1"
                component={this.renderDropzoneInput}
              />
            </div>
            <h4 className="card-header bg-secondary text-white">
              Add Videos
            </h4>
            <div className="alert alert-warning">
              Add only the video embed code.
            </div>
            <div className="card-body">
              <FieldArray name="featurevideos" component={this.renderVideoFeatures} />
            </div>
            <h4 className="card-header bg-secondary  text-white">
              Blog
            </h4>
            <div className="card-body">
              <div className="form-group">
                <label>Blog Image</label>
                {/*<Field
                  name="blogImage"
                  component={FileInput}
                  type="file"
                />*/}
                <Field
                  name="blogimage1"
                  component={this.renderDropzoneInput}
                />
                <br />
                <label>Blog Details</label>
                <Field
                  name="blogdetails"
                  component={this.renderTextarea}
                />
              </div>
            </div>
          </div>

          <div className="card my-3 border-secondary">
            <div className="card-body">
                <div className="row mx-0">
                  <div className="container-fluid px-0 mb-2">
                    <div className="alert alert-warning pull-right" role="alert">
                      <span className="alert-link"><i className="fa fa-exclamation-triangle font-weight-bold" aria-hidden="true"></i> Before publishing the product information,make sure all the information entered above are correct & verified !!</span>
                    </div>
                  </div>
                  <div className="container-fluid px-0">
                    <div className="form-group pull-right">
                      <button type="submit" className="btn btn-success"
                       onClick = {handleSubmit(values =>this.onSubmit({values},'SubmitForm'))}
                       disabled={submitting}>
                        <i className="fa fa-paper-plane" aria-hidden="true"></i> Publish Product Info
                      </button>
                    </div>
                    <div className="form-group pull-right mx-3">
                      <button type="button" className="btn btn-primary text-white"
                       disabled={pristine || submitting} onClick={reset}
                       >
                        <i className="fa fa-eraser" aria-hidden="true"></i> Clear All Values
                      </button>
                    </div>
                  </div>
                </div>
            </div>
          </div>

      </div>
    );
  }
}

ModelForm = connect(
  state => ({
    category:state.category.category
    }),
    {handleProductValues,
      categoryLoad}
)(ModelForm);

export default reduxForm({
    form: 'ModelForm', // a unique name for this form
    validate,
    enableReinitialize : true
})(ModelForm);
