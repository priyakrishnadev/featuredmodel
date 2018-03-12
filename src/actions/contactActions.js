import axios from 'axios';
import {reset} from 'redux-form';

export const handleContactValues=(values)=>{
  return dispatch=>{
    dispatch(processingContact())
    return axios.post('http://127.0.0.1:8000/contact',values)
    .then(res=>{
      dispatch(successContact(res.data))
      dispatch(reset('ContactForm'))
    })
    .catch(err=>{dispatch(errorsContact(err.response.data))});
  }
}
export const sendInvite=(values)=>{
  return dispatch=>{
    dispatch(processingContact())
    return axios.post('http://127.0.0.1:8000/invite',values)
    .then(res=>dispatch({type:'INVITE_SUCCESS',data:res.data}))
    .catch(err=>dispatch({type:'INVITE_ERROR',data:err.response.data}));
  }
}

export const subscribe=(values)=>{
  return dispatch=>{
    dispatch(processingContact())
    return axios.post('http://127.0.0.1:8000/subscribe',values)
    .then(res=>dispatch({type:'SUBSCRIBE_SUCCESS',data:res.data}))
    .catch(err=>dispatch({type:'SUBSCRIBE_ERROR',data:err.response.data}));
  }
}


export const processingContact = () =>{
  return {
    type:"SENDING"
  }
}

export const successContact = (data) =>{
  return {
    type:"SUCCESS",
    data
  }
}

export const errorsContact = (data) =>{
  return {
    type:"ERROR",
    data
  }
}
