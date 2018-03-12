import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import SignupForm from './SignupForm';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {logInFormRequest} from '../actions/AuthActions';

 class logInForm extends React.Component{

     constructor(props){
       super(props);
       this.state={
         email:'',
         password:'',
         role:'',
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
       if(this.state.password === '' || this.state.password.length<6)
       {
             errors.password = "Please enter valid Password";
       }
       if(this.state.role === '' || this.state.role === "null" )
       {
             errors.role = "Please select your role";
       }
       this.setState({
         errors,
         isLoading:true
       });
       const isValid = Object.keys(errors).length === 0;
       if(isValid){
       this.props.logInFormRequest(this.state).then(
         res =>history.push('/admindashboard')
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
              <img src="img/fitnesslogo.png" className="my-3 img-circle" alt="torzo gym" width="120px" height="100px" />
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
                <div className="form-group  ">
                  <input type="password" name="password" className="form-control"
                   placeholder="Password"
                   onChange={this.onChange}
                   value={this.state.password}
                   />
                   <span className="text-danger">{this.state.errors.password}</span>
                </div>

                  <select className="form-control"
                  name="role"
                  onChange={this.onChange}
                  value={this.state.role}
                  >
                   <option value="null">Choose your role</option>
                    <option value="SuperUser">SuperUser</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <p className="text-danger">{this.state.errors.role}</p>

                {/*  <div className=" col-sm-12 col-md-12 col-lg-12 noPadding text-left">
                    <div className="form-check text-primary ">
                      <label className="form-check-label">
                        <input className="form-check-input " name="remember"
                         type="checkbox" value="1"
                         onChange={this.onChange}
                         value={this.state.remember}
                          />
                        Remember me
                      </label>
                    </div>
                  </div>*/}

                <div className="row mx-0 mb-3">
                  <div className="col-sm-12 col-md-12 col-lg-12 noPadding">
                  <button type="submit" className="btn signInBtn btn-block">Login</button>
                  </div>
                </div>
              </form>
              <div className="container-fluid noPadding">
                <div className="row mx-0 ">
                    <div className=" col-sm-6 col-md-6 col-lg-6 noPadding text-left">
                      <p className="text-primary">Forgot Password?
                        <Link to="/ForgotPassword" className="text-white"> Click Here</Link>
                      </p>
                    </div>

                    {/*<div className=" col-sm-6 col-md-6 col-lg-6 noPadding text-right">
                      <p className="registerText">
                          <Link to="/SignupForm" className="text-white">REGISTER</Link>
                      </p>
                    </div>*/}
                  </div>
                </div>
            </div>
          </div>
        </div>
    );
  }
}

logInForm.propTypes={
  logInFormRequest:PropTypes.func.isRequired
}

export default withRouter(connect(null,{logInFormRequest})(logInForm));
