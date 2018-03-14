import React from 'react'
import {connect} from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { landingPageValues } from '../actions/landingPageActions';
import Dropzone from 'react-dropzone';

const renderDropzoneInput=(field)=>{
    const files = field.input.value;
    return (
      <div>
        <Dropzone
          name={field.name}
          multiple={field.input.name==="mainbannerimages" ? true : false}
          className="productInfoDropZone"
          onDrop={(acceptedFiles) => {
              acceptedFiles.forEach(file => {
                  const reader = new FileReader();
                   console.log(reader);
                  reader.onload = () => {
                      // const fileAsBinaryString = reader.result;
                      // console.log(fileAsBinaryString);
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
              className= "col-sm-2 col-md-2 col-lg-2 ">
              <div className="mt-2 breakWord">
              <p className="mb-2 font-weight-bold">Banner Preview</p>
              <img src={file.preview} width="100%" height="200px" alt="imagepreview" />
              {file.name}
              {/*file.picture_id.preview ? <img src={file.picture_id.preview} width="100%" height="200px" /> :*/}
              </div>
              </li>) }
            </ul>
          )}
      </div>
    );
}

class LandingPageForm extends React.Component{

  onSubmit=(values, dispatch)=>{
    if(values.mainbannerimages.length!==0){
      return this.props.landingPageValues(values);
    }
  }

  render(){
    const { handleSubmit, pristine, reset, submitting, error, mainUploadData } = this.props
    return (
        <div className="row mx-0">
          <div className="col-12 appHeight my-3">
          {error && <p className="alert alert-danger">{error}</p>}
          {mainUploadData && <p className="alert alert-success">{mainUploadData}</p>}
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <div className="form-group ">
                <label>Main Banner Images</label>
                <Field
                  name="mainbannerimages"
                  component={renderDropzoneInput}
                />
              </div>
              <div className="float-right">
                <button type="button"
                  className="btn btn-primary btn-raised mx-3"
                  disabled={pristine || submitting} onClick={reset}>
                  Clear Images
                </button>
                <button className="btn btn-success btn-raised  "
                  type="submit" disabled={pristine || submitting}>
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
    );
  }
}

LandingPageForm = connect(  state => ({
    error:state.main.error,
    mainUploadData:state.main.mainUploadData,
}),{landingPageValues})(LandingPageForm);

export default reduxForm({form: 'LandingPage'})(LandingPageForm);
