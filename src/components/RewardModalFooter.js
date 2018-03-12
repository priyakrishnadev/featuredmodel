import React,{Component} from "react";
import {connect} from "react-redux";
import {rewardUser} from "../actions/RewardActions";

class RewardModalFooter extends Component{
  constructor(props) {
   super(props);
   this.changeEmail = this.changeEmail.bind(this);
   this.changePhone = this.changePhone.bind(this);
   this.claimSubmit = this.claimSubmit.bind(this);
   this.state={
     errors:{
       emailError:"",
       phoneError:"",
       submitFail:"",
     },
     email:"",
     phone:"",
   }
 }

  changeEmail(e){
    let emailData=e.target.value
    if(!emailData || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailData)){
      this.setState(prevState => ({
        errors:{
          ...prevState.errors,
          emailError:'Please provide valid email address'
      }
    }))
  }else{
      this.setState(prevState => ({
        errors:{
          ...prevState.errors,
          emailError:'',
      },
      email:emailData
    }))
    }
  }

  changePhone(e){
    let phoneData=e.target.value
    if (!phoneData || !/^([7-9][0-9]{9})$/i.test(phoneData)) {
      this.setState(prevState => ({
        errors:{
          ...prevState.errors,
          phoneError:'Please provide valid phone number'
      }
    }))
  }else{
      this.setState(prevState => ({
        errors:{
          ...prevState.errors,
          phoneError:'',
      },
      phone:phoneData
    }))
    }
  }

  claimSubmit(e){
    e.preventDefault();
    if((this.state.errors.phoneError &&
      this.state.errors.emailError) ||
      (!this.state.phone &&
        !this.state.email)
    ){
      this.setState(prevState => ({
        errors:{
          ...prevState.errors,
          submitFail:'Please fill out your valid information to get reward!!'
        }
      }))
    }else{
      this.setState(prevState => ({
        errors:{
          ...prevState.errors,
          submitFail:''
        }
      }))
      this.props.rewardUser(this.state.email,
        this.state.phone,
        this.props.category,
        this.props.product,
        this.props.rewardWon
      )
    }
  }

  render(){
    const {errors:{phoneError,emailError,submitFail}} = this.state
    const {uploadClaimSuccess,uploadClaimError} = this.props
    return (
      <form onSubmit={this.claimSubmit}>
        <div className="modal-footer row mx-0">
          <div className="col-sm-12 col-md-12 col-lg-12">
              <span className="text-danger">
                {emailError} {phoneError}
                { uploadClaimError &&
                  uploadClaimError.map((error,index)=>
                    <span key={index}>{error}</span>
                  )
                }
              </span>
              <span className="text-warning"> {submitFail} </span>
              <span className="text-success">{uploadClaimSuccess}</span>
          </div>
          <div className="col-sm-5 col-md-5 col-lg-5">
            <div className="form-group">
              <input
              className="form-control"
              type="email"
              name="email"
              placeholder=" Your Email Id"
              onChange={this.changeEmail}
              />
            </div>
          </div>
          <div className="col-sm-5 col-md-5 col-lg-5">
            <div className="form-group">
              <input
              className="form-control"
              type="number"
              name="phone"
              placeholder="Phone Number"
              onChange={this.changePhone}
              />
            </div>
          </div>
          <div className="col-sm-2 col-md-2 col-lg-2">
            <div className="form-group">
              <button type="submit"
              className="btn btn-primary"
              >
              Claim
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
function mapStateToProps(state){
  const {uploadClaimSuccess,uploadClaimError}=state.products
  return {
    uploadClaimSuccess,
    uploadClaimError,
  }
}
export default connect(mapStateToProps,{rewardUser})(RewardModalFooter);
