import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import {SET_CURRENT_USER} from './ActionTypes';

export const userSignUpRequest = (userData) => {
   return dispatch=>{
    return axios.post('http://localhost:8000/torzogym/users',userData);
    // .then(response => console.log(response))
  }
}

export function setCurrentUser(user){
  return{
    type:SET_CURRENT_USER,
    user
  }
}

export const logInFormRequest = (userData) => {
   return dispatch=>{
     return axios.post('http://localhost:8000/torzogym/users/auth',userData)
     .then(res=>{
       const token=res.data.token;
       localStorage.setItem('token',token);
       setAuthorizationToken(token);
       dispatch(loginSucessful());
       dispatch(setCurrentUser(token));
     })
  }
}

// login success
export const loginSucessful = () => {
   return dispatch=>{
     return axios.get('http://localhost:8000/torzogym/user').then(res=>{
       const user=res.data.user;
       localStorage.setItem('user',JSON.stringify(user));
       dispatch(setCurrentUser(user));
     });
   }
}

// logout
export const logOut = () => {
   return dispatch=>{
     localStorage.removeItem('token');
     localStorage.removeItem('user');
     setAuthorizationToken(false);
     dispatch(setCurrentUser({}));
  }
}

// reset and forgot Password
export const resetEmail = (userEmail) =>{
  return dispatch=>{
    return axios.post('http://localhost:8000/password/email',userEmail);
  }
}
