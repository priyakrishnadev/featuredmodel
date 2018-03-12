var initialState={
  data:[],
  inviteData:[],
  subscribeData:[],
  isLoading:false,
  isLoaded:false,
  error:[]
}
const contactReducer = (state=initialState,action={}) =>{
switch (action.type) {
         case 'SENDING': return {
           ...state,
          isLoading:true
         };
         case 'SUCCESS': return {
           ...state,
           data: action.data,
          isLoading:false,
          isLoaded:true,
          error:''
         };
         case 'ERROR':
         return {
           ...state,
           isLoading:false,
           error:action.data,
           data:[]
         };
         case 'INVITE_SUCCESS': return {
           ...state,
           inviteData: action.data,
          isLoading:false,
          isLoaded:true,
          error:''
         };
         case 'INVITE_ERROR':
         return {
           ...state,
           isLoading:false,
           error:action.data,
           inviteData:[]
         };
         case 'SUBSCRIBE_SUCCESS': return {
           ...state,
           subscribeData: action.data,
          isLoading:false,
          isLoaded:true,
          error:''
         };
         case 'SUBSCRIBE_ERROR':
         return {
           ...state,
           isLoading:false,
           error:action.data,
           subscribeData:[]
         };
        default:
          return state;
      }
}

export default contactReducer
