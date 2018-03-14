import React from "react";
import Trending from './Trending';
import MostPopular from './MostPopular';
import Suggested from './Suggested';
import MainBanner from './MainBanner';
import InfiniteData from './InfiniteData';
import classnames from 'classnames';

export default class LandingPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isModalShown:false
    }
    this.handleLoad=this.handleLoad.bind(this);
  }

  componentDidMount(){
    window.addEventListener('load', this.handleLoad);
  }

  // handle tour modal
  handleLoad(){
    this.setState({
      isModalShown:!this.state.isModalShown
    });
  }

  render()
  {
    return (
            <div className="container-fluid hitsMainPanel">
              <MainBanner />
              <div className="col-sm-12 col-md-12 col-lg-6 mx-auto">
                <ul className="nav nav-pills row mx-0 text-center pb-4" role="tablist">
                  <li className="nav-item col-sm-4 col-md-4 col-lg-4">
                    <a className="nav-link active text-uppercase" data-toggle="tab" href="#trending" role="tab">trending</a>
                  </li>
                  <li className="nav-item col-sm-4 col-md-4 col-lg-4">
                    <a className="nav-link text-uppercase" data-toggle="tab" href="#mostpopular" role="tab">most popular</a>
                  </li>
                  <li className="nav-item col-sm-4 col-md-4 col-lg-4">
                    <a className="nav-link text-uppercase" data-toggle="tab" href="#suggested" role="tab">suggested</a>
                  </li>
                </ul>
              </div>
              <div className="container-fluid lrPadding">
                <div className="tab-content">
                    <div className="tab-pane active" id="trending" role="tabpanel">
                      <Trending />
                    </div>
                    <div className="tab-pane" id="mostpopular" role="tabpanel">
                      <MostPopular />
                    </div>
                    <div className="tab-pane" id="suggested" role="tabpanel">
                      <Suggested />
                    </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-12 px-0">
                <div className="bg-white py-2 mb-3 rounded border">
                  <InfiniteData />
                </div>
              </div>
              <div id="tourModalID" className='container tourModal'>
              <div className={classnames('modal',this.state.isModalShown ? 'displayTour' : 'hideTour')} tabIndex="-1" role="dialog">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title text-uppercase text-center mx-auto">take a tour</h5>
                        <button type="button" className="close ml-0"
                        onClick={this.handleLoad}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="row mx-0">
                          <div className="col-sm-4 col-md-4 col-lg-4  text-center">
                            <img src="/img/gift.gif" alt="tour" width="100px" height="100px" />
                            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla, reiciendis praesentium consequuntur porro ab voluptatum voluptatem soluta sunt unde culpa, autem amet, possimus accusantium! Quisquam corporis molestiae cupiditate recusandae!</p>
                          </div>
                          <div className="col-sm-4 col-md-4 col-lg-4  text-center">
                            <img src="/img/gift.gif" alt="tour" width="100px" height="100px" />
                            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla, reiciendis praesentium consequuntur porro ab voluptatum voluptatem soluta sunt unde culpa, autem amet, possimus accusantium! Quisquam corporis molestiae cupiditate recusandae!</p>
                          </div>
                          <div className="col-sm-4 col-md-4 col-lg-4  text-center">
                            <img src="/img/gift.gif" alt="tour" width="100px" height="100px" />
                            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla, reiciendis praesentium consequuntur porro ab voluptatum voluptatem soluta sunt unde culpa, autem amet, possimus accusantium! Quisquam corporis molestiae cupiditate recusandae!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
              </div>
            </div>
      );
  }
}
