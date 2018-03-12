import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {resetEmail} from '../actions/AuthActions';

class ResetPassword extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
      errors:{},
      isLoading:false,
      reqFormStatus:false
    }
    this.onSubmit=this.onSubmit.bind(this);
    this.onChange=this.onChange.bind(this);
  }

  onChange(e){
    if(!!this.state.errors[e.target.name]){
      let errors=Object.assign({},this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]:e.target.value,
        errors
      });
    }
    else {
      this.setState({
        [e.target.name]:e.target.value
      });
    }
  }

  onSubmit(e){
    e.preventDefault();
    const { history } = this.props;
    let errors={};
    if(this.state.email === '' || !(this.state.email.match(/^([A-Za-z0-9]+)@([A-Za-z]+\.)+([A-Za-z]{2,})$/)) )
    {
          errors.email = "Please enter valid Email Address";
    }
    this.setState({
      errors,
      isLoading:true
    });
    const isValid = Object.keys(errors).length === 0;
    if(isValid){
    this.props.resetEmail(this.state).then(
      res =>history.push('/')
   ).catch(
     err=>this.setState({isLoading:false,errors:err.response.data})
   );
    }else{
      this.setState({
        isLoading:false
      });
    }
  }

  render(){
    return (
        <div className="container-fluid bgSignUP">
          <div className="row h-100 justify-content-center align-items-center bgColor">
            <div className=" col-sm-6 col-md-6 col-lg-4 text-center">
              <img src="/app/public/img/fitnesslogo.png" className="my-3 img-circle" alt="torzo gym" width="120px" height="100px" />
              <form role="form" onSubmit={this.onSubmit}>
              {this.state.errors.error && <div className="alert alert-danger">{this.state.errors.error}</div>}

                {/*   loading */}
                <div className={classnames({loading:this.state.isLoading})}>
                </div>
                <div className="form-group">
                  <input type="email" name="email" className="form-control"
                  placeholder="Email Address"
                  onChange={this.onChange}
                  value={this.state.Email}
                  />
                  <span className="text-danger">{this.state.errors.email}</span>
                </div>
                <div className="row mx-0 my-3">
                  <div className="col-sm-12 col-md-12 col-lg-12 noPadding">
                  <button type="submit" className="btn btn-secondary btn-block">Send Password Reset Link</button>
                  </div>
                </div>
              </form>
              <div className="row mx-0 my-3">
                <p className="text-primary">To Login?
                  <Link to="/" className="text-white"> Click Here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

ResetPassword.propTypes={
  resetEmail:PropTypes.func.isRequired
}

export default withRouter(connect(null,{resetEmail})(ResetPassword));
