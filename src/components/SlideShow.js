import React, { Component, Children } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class SlideShow extends Component {
  constructor(props){
    super(props);
    this.leftSlide=this.leftSlide.bind(this);
    this.showNext=this.showNext.bind(this);
    this.state = {
      total: 0,
      current: 0,
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.showNext, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  showNext = () => {
    const { children } = this.props;
    const { total, current } = this.state;
    this.setState({
      total: Children.count(children),
      current: current + 1 === total? 0 : current + 1
    });
  };

  rightSlide = () => {
    const { total, current } = this.state;
    this.setState({
      current: current + 1 === total? 0 : current + 1
    });
  };

  leftSlide=()=>{
    const { total, current } = this.state;
    this.setState({
      current: current - 1 <= 0 ? 0 : current - 1
    });
  }

  render() {
    const { children } = this.props;
    const bullets = Array(this.state.total).fill("○");
    bullets[this.state.current] = "●";
    return (
      <div className="slideshow">
        <ReactCSSTransitionGroup
          className="group"
          transitionName="bannerSlideTransistion"
          transitionEnterTimeout={800}
          transitionLeaveTimeout={800}>
          {Children.toArray(children)[this.state.current]}
        </ReactCSSTransitionGroup>
        <div className="mainBannerNavigators">
          <span className="leftArrow" onClick={this.leftSlide}><i className="fa fa-angle-left" aria-hidden="true"></i></span>
          <span className="rightArrow" onClick={this.rightSlide}><i className="fa fa-angle-right" aria-hidden="true"></i></span>
        </div>
      </div>
    )
  }
}

export default SlideShow;
