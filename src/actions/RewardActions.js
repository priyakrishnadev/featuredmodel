import axios from 'axios';

export const fetchReward=(category,product)=>{
  return dispatch=>{
       axios.get('http://127.0.0.1:8000/rewards/categories/'+ category +"/products/" + product)
      .then(res=>{if(res.data.length > 0){
        dispatch(rewardsFetchSuccess(res.data))
      }else{dispatch({
        type:'REWARDS_FETCH_NOTFOUND',
        data:[]
      })}})
      .catch((error)=> {
         if (error.response) {
           dispatch(rewardsFetchFailed(error.response.data.error))
         }
       })
  }
}

export const rewardsFetchSuccess=(data)=>{
  return {
    type: 'REWARDS_FETCH_SUCCESS',
    data
  };
}

export const rewardsFetchFailed=(error)=>{
  return {
    type: 'REWARDS_FETCH_FAILED',
    error
  };
}

export const rewardUser=(email,phone,category,product,rewardWon)=>{
  var values={
    email:email,
    phone:phone,
    category:category,
    product:product,
    rewardWon:rewardWon
  }
  return dispatch=>{
    axios.post('http://127.0.0.1:8000/rewards/claim',values)
    .then((res)=>dispatch(claimUploadSuccess(res.data.success)))
    .catch((err)=>dispatch(claimUploadFailed(err.response.data)))
  }
}
export const claimUploadSuccess=(data)=>{
  return {
    type: 'CLAIMS_UPLOAD_SUCCESS',
    data
  };
}

export const claimUploadFailed=(error)=>{
  return {
    type: 'CLAIMS_UPLOAD_FAILED',
    error
  };
}
