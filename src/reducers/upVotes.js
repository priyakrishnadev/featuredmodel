import ADD_VOTE from '../actions/commentActions';

const upVotes = (state=[],action={}) =>{
  switch (action.type) {

      case 'ADD_VOTE':return [
        ...state,{
          id: action.id,
          postId:action.postId,
          voteStatus:true
        }]

      case 'REMOVE_VOTE':return state.map(vote =>
        (vote.id === action.id) && (vote.voteStatus == true)
        ? {...vote, voteStatus: !vote.voteStatus}
        : vote)

      case 'CHECK_VOTE_STATUS':
      // action.payload.map(commentData =>(state.map(vote=>
      //     (vote.id === commentData.id && vote.voteStatus == true)?
      //     console.log("present"):console.log("not present")
      //   )))
      action.payload.map(commentData =>
        { if(state.length > 0){
            state.map(vote=>(vote.id === commentData.id && vote.voteStatus == true)?
              console.log("present") :
              console.log("not present")
            )
        }else{
          return state
        }
      })
      default:return state;
    }
  }

export default upVotes
