// import FETCH_ALL_COMMENTS from '../actions/commentActions';
// import TOGGLE_VOTE from '../actions/commentActions';

  const productComments = (state=[],action={}) =>{
  switch (action.type) {
           case 'FETCH_ALL_COMMENTS':
           action.payload.forEach(function(val){val.voteStatus=false;})
           return {
             ...state,
             comments: action.payload
           };


           case 'TOGGLE_VOTE':
              let comments=state.comments.map(vote =>(vote.id === action.id)
             ? {...vote, voteStatus: !vote.voteStatus,likes:action.data}
             : vote)
             return {
               ...state,
               comments:comments
             };

    default:
      return state;
  }
}

export default productComments
