const initialState={
  mostPopular:[],
  trendingHits:[],
  suggestedInfo:[],
  error:false,
  mainUploadData:false,
  bannerImages:[],
  trendingError:null,
  mostpopularError:null,
  suggestionError:null
}
const mainReducer = (state=initialState,action={}) =>{
switch (action.type) {
           case 'FETCH_TRENDINGHITS':
           return {
             ...state,
             trendingHits: action.data,
             error:false
           };

           case 'TRENDING_FAILED':
           return {
             ...state,
             trendingError: action.err
           };

           case 'FETCH_MOSTPOPULAR':
            return {
             ...state,
             mostPopular: action.data,
             error:false
           };

           case 'MOSTPOPULAR_FETCH_FAILED':
           return {
             ...state,
             mostpopularError: action.err
           };

           case 'FETCH_SUGGESTED':
            return {
             ...state,
             suggestedInfo: action.data,
             error:false,
           };

           case 'SUGGESTED_FETCH_FAILED':
           return {
             ...state,
             suggestionError: action.err
           };

           case 'MAINPAGE_UPLOAD_SUCCESS':
           const {mainUploadData} = action;
           return {
                      ...state,
                      error:false,
                       mainUploadData
                  }

           case 'MAINPAGE_UPLOAD_FAILED':
           const {error} = action;
           return {
                      ...state,
                      mainUploadData:false,
                      error,
                  }

           case 'MAINPAGE_FETCH_SUCCESSFUL':
           const {mainbannerimages} = action;
           return {
                      ...state,
                      bannerImages:mainbannerimages,
                      error:false,
                  }

           case 'MAINPAGE_FETCH_FAILED':
           return {
                      ...state,
                      bannerImages:[],
                      error:action.error,
                  }

      default:
        return state;
    }
}
export default mainReducer
