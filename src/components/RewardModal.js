import React from 'react';
import {fetchReward} from '../actions/RewardActions';
import {getWonReward} from '../selectors';
import {connect} from 'react-redux';
import RewardModalFooter from './RewardModalFooter';

class RewardModal extends React.Component{

  constructor(props){
    super(props);
    this.closeModal=this.closeModal.bind(this);
    this.getReward=this.getReward.bind(this);
    this.state={
      toggle:true
    }
  }

  closeModal(e){
    this.setState({
      toggle:false
    });
  }

  getReward(category,product){
      this.props.fetchReward(category,product);
  }

  render(){
    var modalStyle={
      display:"block",
      zIndex: 99999
    }
    var modalHideStyle={
      display:"none",
      zIndex: -100
    }

    const {page,pageId,rewards,rewardsNotFound} = this.props

    return (
      <div className="container rewardModal">
        <div
        className='modal fade show'
        id="myModal" style={this.state.toggle === true ? modalStyle : modalHideStyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title mx-auto">Rewards</h4>
                    <button type="button"
                    className="close"
                    onClick={this.closeModal}
                    >
                    &times;
                    </button>
                  </div>

                  {rewards.length > 0 ?
                    rewards.map((reward,index) =>
                    <div key={index}>
                        <div className="modal-body  mx-auto c-pointer" >
                          <p className="text-success lead">Congratulations, you have won <b>{reward.reward_name}</b>.
                          <span className="badge badge-success">{reward.offerdescription}</span></p>
                          <img src={`${reward.reward_image}`} alt="reward" width="300px" height="200px" className="mx-auto"/>
                        </div>
                        <RewardModalFooter
                        rewardWon={reward.reward_name}
                        category={page}
                        product={pageId}
                         />
                    </div>
                    )
                  : ( rewardsNotFound == null ?
                      <div className="modal-body  mx-auto c-pointer"
                        onClick={()=>{this.getReward(page,pageId)}}>
                        <p className="text-info text-center ">
                         Click here to unbox your reward !!
                        </p>
                        <img src="/img/gift.gif" alt="rewardBox"
                        width="300px"
                        height="200px"
                        />
                      </div>
                      :(rewardsNotFound == true &&
                        <div className="modal-body  mx-auto c-pointer"><p className="text-primary lead">Sorry, Better luck next time!!</p></div>
                      )
                    )
                  }

                </div>
            </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  const {rewardsNotFound} = state.products
  return {
    rewards:getWonReward(state),
    rewardsNotFound
  };
}

export default connect(mapStateToProps,{fetchReward})(RewardModal);
