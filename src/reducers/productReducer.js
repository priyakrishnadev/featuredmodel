var initialState={
  error:false,
  searchText:null,
  sortValue:null,
  isLoading:false,
  isLoaded:false,
  rewardsUploadSuccess:null,
  rewardsUploadError:null,
  rewardsFetchSuccess:false,
  rewardsFetchError:null,
  rewardsData:[],
  rewardsNotFound:null,
  uploadClaimSuccess:"",
  uploadClaimError:"",
  productNotification:"",
  bestoffers:[],
  searchOffer:null,
  sortOfferValue:null,
  offerNotFound:"",
}
const productReducer = (state=initialState,action={}) =>{
    switch (action.type) {
             case 'LOAD_PRODUCT':
             const {product,name}=action.data
             return {
               ...state,
               product,
               categoryTitle:name,
               error:false
             };

             case 'LOAD_PRODUCT_INFO':
             action.data.forEach(function(val){val.voteStatus=false;})
             return{
               ...state,
               productsInfo:action.data,
               error:false
             }

             case 'EDIT_PRODUCT_INFO':
             return{
               ...state,
               productsInfo:action.data
             }

             case 'LOAD_PRODUCT_SUGGESTIONS':
             return{
               ...state,
               suggestions:action.data
             }

             case 'TOGGLE_PRODUCT_VOTE':
                let productlikes=state.productsInfo.map(vote =>(vote.id === action.id)
               ? {...vote, voteStatus: !vote.voteStatus,modellikes:action.data}
               : vote)
               return {
                 ...state,
                 productsInfo:productlikes
               };

             case 'VIEWS_COUNT':
                let viewcount=state.productsInfo.map(view =>(view.id === action.id)
               ? {...view, modelviews:action.data}
               : view)
               return {
                 ...state,
                 productsInfo:viewcount
               };

             case 'SET_RATING':return {
               ...state,
               rating:true
             }

            case 'NOT_FOUND':return {
              ...state,
              error:action.data
            }

            case 'FETCHING':return {
              ...state,
              isLoading:true
            }

            case 'FETCHED':return {
              ...state,
              isLoading:false,
              isLoaded:true
            }

            case 'SEARCH':
            return {
              ...state,
              searchText:action.value,
              error:false
            };

            case 'SORT_BY':
            const {sortValue} = action;
            return {
              ...state,
              sortValue,
              error:false
            };

            case 'PRODUCT_FETCHED_FAILED':
            const {error}=action
            return {
              ...state,
              error
            };

            case 'REWARDS_UPLOAD_SUBMIT':
            return {
              ...state,
              rewardsUploadSuccess:action.data,
              rewardsUploadError:""
            };

            case 'REWARDS_UPLOAD_FAILED':
            return {
              ...state,
              rewardsUploadError:action.error,
              rewardsUploadSuccess:""
            };

            case 'REWARDS_FETCH_SUCCESS':if(action.data.length === 0){
              return {...state,
              rewardsNotFound:true,
              rewardsFetchSuccess:true,
              rewardsFetchError:""}
            }else{
              return {
                ...state,
                rewardsData:action.data,
                rewardsFetchSuccess:true,
                rewardsFetchError:"",
                rewardsNotFound:false
              };
            }

            case 'REWARDS_FETCH_FAILED':
            return {
              ...state,
              rewardsFetchError:action.error,
              rewardsFetchSuccess:false,
              rewardsNotFound:false
            };

            case 'REWARDS_FETCH_NOTFOUND':
            return {
              ...state,
              rewardsFetchError:"",
              rewardsFetchSuccess:true,
              rewardsNotFound:true
            };

            case 'CLAIMS_UPLOAD_SUCCESS':
            return {
              ...state,
              uploadClaimSuccess:action.data,
              uploadClaimError:""
            };

            case 'CLAIMS_UPLOAD_FAILED':
            return {
              ...state,
              uploadClaimError:action.error,
              uploadClaimSuccess:""
            };

            case 'PRODUCT_UPLOAD_PROCESSING':
            return {
              ...state,
              productNotification:"Processing...Please wait"
            };

            case 'PRODUCT_UPLOADED_SUCCESSFULLY':
            return {
              ...state,
              productNotification:"Successfully Uploaded"
            };

            case 'PRODUCT_UPLOADED_FAILED':
            return {
              ...state,
              productNotification: action.data || "Upload Failed"
            };

            case 'LOAD_BESTOFFERS':
            return {
              ...state,
              bestoffers:action.data,
              offerNotFound:""
            };

            case 'SEARCH_FOR_OFFER':
            return {
              ...state,
              searchOffer:action.value,
              error:false
            };

            case 'SORT_BY_OFFER':
            const {sortOfferValue} = action;
            return {
              ...state,
              sortOfferValue,
              error:false
            };

            case 'BESTOFFERS_NOTFOUND':
            return {
              ...state,
              offerNotFound:action.data
            };
      default:
        return state;
    }
}

export default productReducer
