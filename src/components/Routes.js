import React from 'react'
import {Route,Router,Switch} from 'react-router-dom';
import history from './history';
import NotFound from './NotFound';
import LandingPage from './LandingPage';
import {SmartView} from './SmartView';
import BlogContainer from '../containers/BlogContainer';
import BestOffers from './BestOffers';
import Getinvite from './Getinvite';
import Help from './Help';
import LandingPageForm from './LandingPageForm';
import RewardsContainer from '../containers/RewardsContainer';
import Header from './Header';
import Footer from './Footer';
import ProductInformation from './ProductInformation';

const Routes = () => (
    <Router history={history}>
      <div className="mainLayout">
        <Route component={Header}/>
        <div className="layoutStyle">
          <Switch className="headerMTop">
             <Route exact path="/"  component={LandingPage}/>
              {/*
              <Route path="/WebVR" component={WebVR}/>
              <Route path="/SmartView/:page?/:pageId?" component={productHOC(SmartView)}/>
              */}
              <Route exact path="/SmartView/:page"  component={SmartView}/>
              <Route exact path="/SmartView/:page/:pageId" component={SmartView}/>
              <Route exact path="/Blog/:page/:pageId" component={BlogContainer}/>
              <Route path="/ProductInformation" component={ProductInformation}/>
              <Route path="/LandingPageForm" component={LandingPageForm}/>
              <Route path="/Rewards" component={RewardsContainer}/>
              <Route path="/bestoffers" component={BestOffers}/>
              <Route path="/getinvite" component={Getinvite}/>
              <Route path="/help" component={Help}/>
              <Route path="*" component={NotFound} />
          </Switch>
          </div>
        <Footer />
      </div>
    </Router>
);

export default Routes;
