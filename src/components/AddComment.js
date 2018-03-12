import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {commentPush} from '../actions/commentActions'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.message) {
    errors.message = 'Required !!'
  }else {
    var bad_words_array = [];
    bad_words_array=new Array('wtf', 'lol', 'terrorist', 'hell', 'terrorism', 'f**k', 'jihad', 'fuck', 'adsf', 'asdf', 'qwert');
    var compare_text=values.message;
    for(var i=0; i<bad_words_array.length; i++)
    {
      for(var j=0; j<(values.message.length); j++)
      {
        if(bad_words_array[i]===compare_text.substring(j,(j+bad_words_array[i].length)).toLowerCase())
        {
        errors.message = 'Your message contains inappropriate words.Please Clean it Up.'
        }
      }
    }
  }
  return errors
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <div>
      <input {...input} placeholder={label} type={type} className="form-control" />
      {touched &&
        ((error && <span className="text-danger">{error}</span>) )}
    </div>
  </div>
)

const renderTextAreaField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <div>
      <textarea {...input} rows="3" placeholder={label}
      className="form-control shareThought mt-1"></textarea>
      {touched &&
        ((error && <span className="text-danger">{error}</span>) )}
    </div>
  </div>
)

function callCommentPush(values, dispatch) {
 return dispatch(commentPush(values));
}

const AddComment = props => {
const { error,handleSubmit, pristine, submitting } = props;
  return (
      <div className="leaveComment p-2 pb-2">

        <form onSubmit={handleSubmit(callCommentPush)}>
            <Field
              name="email"
              component={renderField}
              type="email"
              label="Email Id"
              placeholder="Enter Email"
            />

            <Field name="message"
             component={renderTextAreaField}
             label="Share Your thought"
             type="text"
             />

            <Field name="modelname"
             type="text"
             component="input"
             hidden
             />

             <span className="text-danger">{error && <span>{error}</span>}</span>

            <div className="row mx-0" >
              <button type="submit" className="btn btn-sm btn-info btn-block mt-2" disabled={pristine || submitting}>Leave a comment</button>
            </div>
        </form>
      </div>
  );
};


export default connect( null, {onSubmit: callCommentPush})(reduxForm({form: "AddComment",validate,enableReinitialize: true})( AddComment ));
