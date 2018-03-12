import React from 'react';
import {Link} from 'react-router-dom';
import logInForm from './logInForm';
import {connect} from 'react-redux';
import {userSignUpRequest} from '../actions/AuthActions';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class SignupForm extends React.Component{

  constructor(props){
    super(props);
    this.state={
      firstname:'',
      lastname:'',
      email:'',
      password:'',
      confirmpassword:'',
      phonenumber:'',
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
    let errors={};
    if(this.state.firstname === '' || !(this.state.firstname.match(/^([A-Za-z]{3,20})+$/)) )
    {
          errors.firstname = "Please enter valid First Name";
    }
    if(this.state.lastname === '' || !(this.state.lastname.match(/^([A-Za-z]{3,20})+$/)) )
    {
          errors.lastname = "Please enter valid Last Name";
    }
    if(this.state.email === '' || !(this.state.email.match(/^([A-Za-z0-9]+)@([A-Za-z]+\.)+([A-Za-z]{2,})$/)) )
    {
          errors.email = "Please enter valid Email Address";
    }
    if(this.state.password === '' || this.state.password.length<6)
    {
          errors.password = "Please enter valid Password with atleast 6 characters";
    }
    if(!(this.state.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)) )
    {
          errors.password = "Please enter valid Password with atleast one special character and number";
    }
    // if(!(this.state.password.match(/^(?=.*[0-9])$/)))
    // {
    //       errors.password = "Please enter valid Password with atleast one number";
    // }
    if(this.state.confirmpassword === '' || !(this.state.confirmpassword === this.state.password) )
    {
          errors.confirmpassword = "Please enter the matching password";
    }
    if(this.state.phonenumber === '' || !(this.state.phonenumber.match(/^([7-9])+([0-9]{9})$/)) || !(this.state.phonenumber.length==10) )
    {
          errors.phonenumber = "Please enter valid Phone Number";
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
    this.props.userSignUpRequest(this.state).then(
      res =>(res.data.email)?(this.setState({
          isLoading:false,
          reqFormStatus:false,
          errors:res.data
        })):(this.setState({
          isLoading:false,
          reqFormStatus:true
          }))
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
            <div className=" col-sm-6 col-md-6 col-lg-5 ">
              <div className="text-center">
                <img src="img/fitnesslogo.png" className="my-3 img-circle " alt="torzo gym" width="120px" height="100px" />
              </div>
              <form role="form" onSubmit={this.onSubmit}>
                {/*   loading */}
                <div className={classnames({loading:this.state.isLoading})}>
                </div>

                {/*  success message */}
                {this.state.reqFormStatus ? (<p className="alert alert-success">You have successfully registered!!</p>) : <p></p>}

                <div className="row ">
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="input-group nameInputIcon">
                      <div className="input-group-addon ">
                      <i className="fa fa-user" aria-hidden="true"></i>
                      </div>
                      <input type="text" name="firstname" className="form-control"
                      placeholder="First Name"
                      onChange={this.onChange}
                      value={this.state.firstname}
                       />
                    </div>
                    <span className="text-danger">{this.state.errors.firstname}</span>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="input-group">
                      <div className="input-group-addon inputBg">
                      <i className="fa fa-user" aria-hidden="true"></i>
                      </div>
                      <input type="text" name="lastname" className="form-control"
                      placeholder="Last Name"
                      onChange={this.onChange}
                      value={this.state.lastname}
                       />
                    </div>
                    <p className="text-danger">{this.state.errors.lastname}</p>
                  </div>
                </div>

                <div className="container-fluid noPadding my-2">
                  <div className="input-group ">
                      <div className="input-group-addon ">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                      </div>
                      <input type="email" name="email" className="form-control"
                      placeholder="Email Address"
                      onChange={this.onChange}
                      value={this.state.Email}
                      />
                  </div>
                  <span className="text-danger">{this.state.errors.email}</span>
                </div>

                <div className="container-fluid noPadding my-2">
                  <div className="input-group ">
                      <div className="input-group-addon ">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                      </div>
                      <input type="password" name="password" className="form-control"
                      placeholder="Password"
                      onChange={this.onChange}
                      value={this.state.password}
                       />
                  </div>
                  <span className="text-danger">{this.state.errors.password}</span>
                </div>

                <div className="container-fluid noPadding my-2">
                  <div className="input-group">
                      <div className="input-group-addon ">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                      </div>
                    <input type="password" name="confirmpassword" className="form-control"
                    placeholder="Confirm Password"
                    onChange={this.onChange}
                    value={this.state.confirmpassword}
                     />
                  </div>
                   <span className="text-danger">{this.state.errors.confirmpassword}</span>
                </div>

                <div className="row my-2">
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="input-group nameInputIcon">
                      <div className="input-group-addon ">
                      <i className="fa fa-phone" aria-hidden="true"></i>
                      </div>
                      <input type="number" name="phonenumber" className="form-control"
                      placeholder="Phone Number"
                      onChange={this.onChange}
                      value={this.state.phonenumber}
                       />
                    </div>
                      <span className="text-danger">{this.state.errors.phonenumber}</span>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <select className="form-control "
                      name="role"
                      onChange={this.onChange}
                      value={this.state.role}
                     >
                      <option value="null">Choose your role</option>
                      <option value="SuperUser">SuperUser</option>
                      <option value="Admin">Admin</option>
                    </select>
                      <p className="text-danger">{this.state.errors.role}</p>
                  </div>
                </div>

                <div className="row mx-0 ">
                  <div className="col-sm-12 col-md-12 col-lg-12 noPadding my-2">
                  <button type="submit" className="btn signInBtn btn-block">Register</button>
                  </div>
                  <p className="text-primary">To Login?
                    <Link to="/" className="text-white"> Click Here</Link>
                  </p>
                </div>
              </form>
            </div>
         </div>
      </div>
    );
  }
}
  SignupForm.propTypes={
    userSignUpRequest:PropTypes.func.isRequired
  }
  export default connect(null,{userSignUpRequest})(SignupForm);
