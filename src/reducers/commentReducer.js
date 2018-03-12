import SET_LIKE from '../actions/commentActions';
// const initialState = {
//   enabled: false
// }
  const commentsWrapper = (state=[],action={}) =>{
  switch (action.type) {
           // case 'FETCH_ALL_COMMENTS': return {
           //   ...state,
           //   comments: action.payload
           // };
    default:
      return state;
  }
}

export default commentsWrapper
