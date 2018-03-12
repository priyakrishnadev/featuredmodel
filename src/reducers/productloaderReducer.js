var initialState={
  isLoading:0,
  isLoaded:0
}
const productloaderReducer = (state=initialState,action={}) =>{
    switch (action.type) {
        case 'PRODUCT_FETCHING':return {
          ...state,
          isLoading: state.isLoading + 1,
        }

        case 'PRODUCT_FETCHED':return {
          ...state,
          isLoading: state.isLoading - 1
        }

        default:
        return state;
    }
}

export default productloaderReducer
