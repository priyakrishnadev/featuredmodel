import React from "react";
import {connect} from 'react-redux';
import {sendInvite} from '../actions/contactActions';

class Getinvite extends React.Component{

    constructor(props){
      super(props);
      this.state={
        companyname:'',
        category:'',
        email:'',
        website:'',
        message:'',
        phonenumber:'',
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
      if(this.state.companyname === '' || !(this.state.companyname.match(/^([A-Za-z ]{3,20})+$/)) ){
            errors.companyname = "Please enter valid Company Name";
      }
      if(this.state.email === '' || !(this.state.email.match(/^([A-Za-z0-9]+)@([A-Za-z]+\.)+([A-Za-z]{2,})$/)) ){
            errors.email = "Please enter valid Email Address";
      }
      if(this.state.phonenumber === '' || !(this.state.phonenumber.match(/^([7-9])+([0-9]{9})$/)) || !(this.state.phonenumber.length===10) ){
            errors.phonenumber = "Please enter valid Phone Number";
      }
      if(this.state.category === '' || this.state.category === "null" ){
            errors.category = "Please select your category";
      }
      if(this.state.website === ''){
            errors.website = "Please enter valid website";
      }
      if(this.state.message === '' || this.state.message === "null" ){
            errors.message = "Please enter your message/enquiry";
      }
      this.setState({
        errors,
        isLoading:true
      });
      const isValid = Object.keys(errors).length === 0;
      if(isValid){
      this.props.sendInvite(this.state).then(
        // res =>(res.data.email)?(this.setState({
        //     isLoading:false,
        //     reqFormStatus:false,
        //     errors:res.data
        //   })):(this.setState({
        //     isLoading:false,
        //     reqFormStatus:true
        //     }))
        );
      }else{
        this.setState({
          isLoading:false
        });
       }
    }


  render(){
    return (
            <div className="row mx-0">
                <div className="col-sm-6 col-md-6 col-lg-6 px-0">
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6 px-0">
                   {this.props.isLoading && <div className="spinner"></div>}
                   <form id="invite_form" onSubmit={this.onSubmit}>
                      <div className="bg-white rounded py-3 my-3 boxShadowLeft">
                         <p className="lead font-weight-bold text-center">ShowKase your product/service with a brand new 3D platform.</p>
                          {/*  success message */}
                          <p className="text-danger text-center mb-0">{this.props.error}</p>
                          <p className="text-success text-center mb-0">{this.props.data.success}</p>
                          {this.state.reqFormStatus ? (<p className="alert alert-success">Thanks for sending your details!! {"We'll"} get back to shortly. </p>) : <p></p>}
                         <div className="row mx-0">
                           <div className="col-sm-6 col-md-6 col-lg-6 ">
                               <div className="form-group">
                               <label htmlFor="companyName">Company Name</label><br />
                               <span className="text-danger">{this.state.errors.companyname}</span>
                                 <input type="text"
                                 id="companyName"
                                 name="companyname"
                                 className="form-control"
                                 onChange={this.onChange}
                                 value={this.state.companyname}
                                 />
                               </div>
                           </div>
                           <div className="col-sm-6 col-md-6 col-lg-6 ">
                               <div className="form-group">
                               <label htmlFor="category">Category</label><br />
                               <span className="text-danger">{this.state.errors.category}</span>
                                 <select className="custom-select"
                                 name="category"
                                 id="inlineFormCustomSelectPref"
                                 onChange={this.onChange}
                                 value={this.state.category}
                                 >
                                   <option selected disabled>Choose the category</option>
                                   <option value="Furniture">Furniture</option>
                                   <option value="Products">Products</option>
                                   <option value="Real Estate">Real Estate</option>
                                   <option value="Interior Designs">Interior Designs</option>
                                   <option value="Resto Cafes">Resto Cafes</option>
                                   <option value="Resto Pubs">Resto Pubs</option>
                                   <option value="Auto Mobiles">Auto Mobiles</option>
                                   <option value="Health Care">Health Care</option>
                                   <option value="Fitness Sports">Fitness Sports</option>
                                   <option value="People">People</option>
                                   <option value="Resorts">Resorts</option>
                                   <option value="Wedding">Wedding</option>
                                   <option value="Pets">Pets</option>
                                 </select>
                               </div>
                           </div>
                         </div>
                         <div className="row mx-0">
                           <div className="col-sm-6 col-md-6 col-lg-6">
                               <div className="form-group">
                                 <label htmlFor="emailField">Email Id</label><br />
                                 <span className="text-danger">{this.state.errors.email}</span>
                                 <input type="email"
                                 id="emailField"
                                 name="email"
                                 className="form-control"
                                 onChange={this.onChange}
                                 value={this.state.email}
                                  />
                               </div>
                           </div>
                           <div className="col-sm-6 col-md-6 col-lg-6">
                               <div className="form-group">
                                 <label htmlFor="PhoneField">Phone</label><br />
                                 <span className="text-danger">{this.state.errors.phonenumber}</span>
                                 <input type="number"
                                 name="phonenumber"
                                 id="PhoneField"
                                 className="form-control"
                                 onChange={this.onChange}
                                 value={this.state.phonenumber}
                                 />
                               </div>
                           </div>
                         </div>
                         <div className="row mx-0">
                           <div className="col-sm-6 col-md-6 col-lg-6">
                             <div className="form-group">
                               <label htmlFor="websiteField">Website</label><br />
                               <span className="text-danger">{this.state.errors.website}</span>
                               <input type="text"
                               name="website"
                               id="websiteField"
                               placeholder="http://www.mywebsite.com/"
                               className="form-control"
                               onChange={this.onChange}
                               value={this.state.website}
                                />
                               <p className="mb-0 text-info">Please copy & paste your website url</p>
                             </div>
                           </div>
                           <div className="col-sm-6 col-md-6 col-lg-6">
                             <div className="form-group">
                               <label htmlFor="messageField">Message</label><br />
                               <span className="text-danger">{this.state.errors.message}</span>
                               <textarea type="text"
                                name="message"
                                id="messageField"
                                className="form-control"
                                onChange={this.onChange}
                                value={this.state.message}
                                ></textarea>
                             </div>
                           </div>
                         </div>
                         <div className="col-sm-12 col-md-12 col-lg-12 ">
                           <button
                           className="btn btn-primary btn-raised btn-block btn-lg btnRegister">
                              Register for free invite
                           </button>
                         </div>
                       </div>
                   </form>
                 </div>
                <div className="row mx-0 bgTheme py-3">
                  <div className="col-sm-3 col-md-3 col-lg-3 ">
                      <div className="productInviteBlock">
                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                      </div>
                  </div>
                  <div className="col-sm-3 col-md-3 col-lg-3 ">
                      <div className="productInviteBlock">
                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                      </div>
                  </div>
                  <div className="col-sm-3 col-md-3 col-lg-3 ">
                      <div className="productInviteBlock">
                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                      </div>
                  </div>
                  <div className="col-sm-3 col-md-3 col-lg-3 ">
                      <div className="productInviteBlock">
                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                      </div>
                  </div>
                </div>
            </div>
          );
    }
}

function mapStateToProps(state){
  const {isLoading,isLoaded,error,inviteData} = state.contacts
  return {
    isLoading,
    isLoaded,
    error,
    data:inviteData
  }
}

export default connect(mapStateToProps,{sendInvite})(Getinvite);
