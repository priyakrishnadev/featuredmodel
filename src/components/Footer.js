import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { subscribe } from '../actions/contactActions';
import {connect} from 'react-redux';

class Footer extends React.Component
{
  constructor(props){
    super(props);
    this.handleSubscribe= this.handleSubscribe.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.state={
      email:"",
      errors:{}
    }
  }

  handleSubscribe(e){
    if(!!this.state.errors[e.target.name]){
      let errors=Object.assign({},this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]:e.target.value,
        errors
      });
    }else {
      this.setState({
        [e.target.name]:e.target.value
      });
    }
  }

  handleSubmit(e){
    e.preventDefault();
    let errors={};
    if(this.state.email === '' || !(this.state.email.match(/^([A-Za-z0-9]+)@([A-Za-z]+\.)+([A-Za-z]{2,})$/)) ){
          errors.email = "Please enter valid Email Address";
    }
    this.setState({errors});
    const isValid = Object.keys(errors).length === 0;
    if(isValid){
      this.props.subscribe(this.state)
    }
  }

  render(){
    return (
            <footer className="mainfooter " role="contentinfo">
              <div className="footer-middle">
              <div className="container-fluid px-0">
                <div className="row">
                  <div className="col-md-3 col-sm-6">
                    <div className="footer-pad">
                      <img src="/img/logo.png" width="100%" height="100px" alt="advity" />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="footer-pad">
                      <ul className="list-unstyled">
                        <li>
                          <Link to="/brands">
                            <span className="footerMenuLinks"> brands</span>
                          </Link>
                        </li>
                        <li>
                        <Link to="/bestoffers">
                          <span className="footerMenuLinks"> bestoffers</span>
                        </Link>
                        </li>
                        <li className="nav-item ">
                          <Link to="/getinvite">
                            <span className="footerMenuLinks"> getinvite</span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link to="/help">
                            <span className="footerMenuLinks"> help</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="footer-pad">
                    {/*  <ul className="list-unstyled">
                        <li><a href="#technology">TECHNOLOGY</a></li>
                        <li><a href="#clients">CLIENTS</a></li>
                        <li><a href="#blog">BLOG</a></li>
                        <li><a href="#contact">CONTACT US</a></li>
                      </ul>*/}
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="footer-pad">
                      <h5>SUBSCRIBE</h5>
                      <p className="text-uppercase">GET THE UPDATE OF OUR EVENTS</p>
                      <ul className="list-unstyled">
                        <li>
                          <form id="newsletter_form" onSubmit={this.handleSubmit}>
                          {this.props.isLoading && <div className="spinner"></div>}
                            {/*<p id="successNewsletter" className="text-success alert-dismissable">
                              <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                              Successfully Subscribed !!
                            </p>*/}
                            <p className="text-danger text-center mb-0">{this.props.error}</p>
                            <p className="text-success text-center mb-0">{this.props.data.success}</p>
                            {this.state.reqFormStatus ? (<p className="alert alert-success">Thanks for subscribing!!</p>) : <p></p>}
                            <div className="input-group">
                               <input type="email"
                               id="emailField"
                               name="email"
                               className="form-control"
                               onChange={this.handleSubscribe}
                               value={this.state.email}
                                />
                               <span className="input-group-btn">
                                    <button className="btn btn-outline-info themeColor" type="submit">GO!</button>
                               </span>
                            </div>
                          </form>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <div className="footer-bottom">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <p className="text-center">&copy; Copyright 2018 - Advity Infomedia.  All rights reserved.</p>
                    </div>
                    {/*<div className="col-lg-6  mt-2">
                      <span className="float-right">
                        <a href="https://www.facebook.com/advity" target="_blank">
                          <img src="img/facebook1.png" alt="fb" width="32px" height="32px" />
                        </a>
                        <a href="https://www.youtube.com/channel/UCJDlu2K9Tff8EWC48uvcpdg" target="_blank">
                          <img src="img/youtubee.png" alt="youtube" width="32px" height="32px" />
                        </a>
                      </span>
                    </div>*/}
                  </div>
                </div>
              </div>
            </footer>
        );
    }
}

const mapStateToProps = (state) => {
  const {isLoading,isLoaded,error,subscribeData} = state.contacts
  return {
    isLoading,
    isLoaded,
    error,
    data:subscribeData
  }
}

export default connect(mapStateToProps,{subscribe})(Footer)
