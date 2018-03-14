import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validateContact from './validateContact'
import {connect} from 'react-redux';
import {handleContactValues} from '../actions/contactActions';

class ContactForm extends React.Component{

renderField({ input, label, type, meta: { touched, error } }){
    return (<div>
      <div className="form-group">
        <input {...input} type={type} placeholder={label}  className="form-control" />
        {touched && error && <span className="text-danger">{error}</span>}
      </div>
    </div>);
}

renderTextarea({ input, label, type, meta: { touched, error } }){
    return(
    <div>
      <div className="form-group">
        <textarea {...input} type={type} placeholder={label} rows="5" className="form-control"></textarea>
        {touched && error && <span className="text-danger">{error}</span>}
      </div>
    </div>
  );
}

constructor(props){
  super(props);
  this.submit=this.submit.bind(this);
}

submit(values){
this.props.handleContactValues(values);
}

render(){
  const { handleSubmit, pristine, reset, submitting} = this.props
    return (
            <div className="col-sm-12 col-md-12 col-lg-12 pt-3 pb-2 bg-white posRelative">
            {this.props.isLoading && <div className="spinner"></div>}
                <p className="text-danger text-center mb-0">{this.props.error}</p>
              <p className="text-success text-center mb-0">{this.props.data.success}</p>
              <h4 className="text-center ">Contact us</h4>
                <form className="form" onSubmit={handleSubmit(this.submit)}>
                  <div className="form-group">
                    <Field
                      name="name"
                      type="text"
                      component={this.renderField}
                      label="Name"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      name="email"
                      type="email"
                      component={this.renderField}
                      label="Email"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      name="phone"
                      type="text"
                      component={this.renderField}
                      label="Phone"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      name="message"
                      component={this.renderTextarea}
                      label="Message"
                    />
                  </div>
                  <div className="form-group pb-4 contactForm">
                    <div className="row mx-0">
                      <span className="col-sm-6 col-md-6 col-lg-6">
                      <button type="button" className="btn btn-primary btn-block text-white"
                      disabled={pristine || submitting} onClick={reset}
                      > Clear All
                      </button>
                      </span>
                      <span className="col-sm-6 col-md-6 col-lg-6">
                        <button type="submit" className="btn btn-info btn-block "
                          disabled={pristine || submitting}>
                          Submit
                        </button>
                      </span>
                    </div>
                  </div>
                </form>
            </div>
          );
      }
}

function mapStateToProps(state){
  const {isLoading,isLoaded,error,data} = state.contacts
  return {
    isLoading,
    isLoaded,
    error,
    data
  }
}

ContactForm = connect(mapStateToProps,{handleContactValues})(ContactForm);

export default reduxForm({form: 'ContactForm',validate:validateContact})(ContactForm);
