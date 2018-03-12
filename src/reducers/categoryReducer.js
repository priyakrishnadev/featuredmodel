
  const categoryReducer = (state=[],action={}) =>{
  switch (action.type) {
           case 'LOAD_CATEGORY': 
           return {
             ...state,
             category: action.data
           };
    default:
      return state;
  }
}

export default categoryReducer
