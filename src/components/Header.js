import React from "react";
import { NavLink ,Link } from 'react-router-dom';
import classnames from 'classnames';

class Header extends React.Component{
  constructor(props){
    super(props);
    this.toggleClass=this.toggleClass.bind(this);
    this.state = {
           active: false,
       };
  }

  toggleClass(e){
    if(!this.state.active){
      this.setState({active: true});
    }else{
    this.setState({active: false});
    }
  }

  render()
  {
    return (
        <div className="container-fluid noPadding ">
            <nav className="navbar navbar-expand-lg mainNavbar ">
              <Link className="navbar-brand" to="/">
              <img src="/img/showkase.png" alt="ShowKase3D" width="150px" height="80px" />
              </Link>
              <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className={classnames('collapse navbar-collapse',this.state.active ? 'hide': null )}
               id="navbarSupportedContent">
               <ul className="navbar-nav mr-auto w-100 justify-content-end">
                  <li className="nav-item ">
                     <NavLink
                     to="/"
                     exact
                     className="nav-link"
                     activeClassName="selected"
                     activeStyle={{ color: "#fff" }}
                     onClick={this.toggleClass}
                     ><span className="mainMenuLinks"> Home</span>
                     </NavLink>
                  </li>
                  <li className="nav-item  dropdown">
                    <span className="mainMenuLinks brandsMenu dropdown-toggle" data-toggle="dropdown"> brands
                    <i className="fa fa-chevron-down ml-1" aria-hidden="true"></i></span>
                    <ul className="row dropdown-menu">
                      <li className="col-sm-6 col-md-6 col-lg-6">

                      <NavLink
                      to="/SmartView/furniture"
                      exact
                      className="dropdownLink"
                      activeClassName="selected"
                      activeStyle={{ color: "#fff" }}
                      onClick={this.toggleClass}
                      >Furniture
                      </NavLink>

                      <NavLink to="/SmartView/products" className="dropdownLink"
                      activeClassName="selected"
                      activeStyle={{ color: "#fff" }}
                      onClick={this.toggleClass}
                      >
                      Products</NavLink>

                      <NavLink to="/SmartView/real_estate" className="dropdownLink"
                      activeClassName="selected"
                      activeStyle={{ color: "#fff" }}
                      onClick={this.toggleClass}
                      >
                      Real Estate</NavLink>

                      <NavLink to="/SmartView/interior_designs" className="dropdownLink"
                      activeClassName="selected"
                      activeStyle={{ color: "#fff" }}
                      onClick={this.toggleClass}
                      >
                      Interior Designs</NavLink>

                      </li>
                      <li className="col-sm-6 col-md-6 col-lg-6">

                      <NavLink to="/SmartView/health_care" className="dropdownLink"
                      activeClassName="selected"
                      activeStyle={{ color: "#fff" }}
                      onClick={this.toggleClass}
                      >
                      Health Care</NavLink>
                      <NavLink to="/SmartView/fitness_sports" className="dropdownLink"
                      activeClassName="selected"
                      activeStyle={{ color: "#fff" }}
                      onClick={this.toggleClass}
                      >
                      Fitness Sports</NavLink>
                      <NavLink to="/SmartView/wedding" className="dropdownLink"
                      activeClassName="selected"
                      activeStyle={{ color: "#fff" }}
                      onClick={this.toggleClass}
                      >
                      Wedding</NavLink>
                      <NavLink to="/SmartView/resto_pubs" className="dropdownLink"
                      activeClassName="selected"
                      activeStyle={{ color: "#fff" }}
                      onClick={this.toggleClass}
                      >
                      Resto Pubs</NavLink>
                      </li>
                    </ul>


                  </li>
                  <li className="nav-item ">
                     <NavLink
                     to="/bestoffers"
                     className="nav-link"
                     activeClassName="selected"
                     activeStyle={{ color: "#fff" }}
                     onClick={this.toggleClass}
                     ><span className="mainMenuLinks"> best offers</span>
                     </NavLink>
                  </li>
                  <li className="nav-item ">
                     <NavLink
                     to="/help"
                     className="nav-link"
                     activeClassName="selected"
                     activeStyle={{ color: "#fff" }}
                     onClick={this.toggleClass}
                     ><span className="mainMenuLinks"> help</span>
                     </NavLink>
                  </li>
                  <li className="nav-item ">
                     <NavLink
                     to="/getinvite"
                     className="nav-link"
                     activeClassName="selected"
                     onClick={this.toggleClass}
                     style={{ background: "#f87959",color: "#fff", ":hover": { background: "#888",color:"#fff" } }}
                     ><span className="mainMenuLinks"> get invite</span>
                     </NavLink>
                  </li>
               </ul>
              </div>
            </nav>

        </div>
    );
  }
}
export default Header;
