import axios from 'axios';

export default function setAuthorization(token){
  if(token){
     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // axios.defaults.headers.common['Authorization'] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC90b3J6b2d5bS91c2Vycy9hdXRoIiwiaWF0IjoxNTA5MDE3MDQ3LCJleHAiOjE1MDkwMjA2NDcsIm5iZiI6MTUwOTAxNzA0NywianRpIjoiNFlkQm96OWxBdzFFZTVncSJ9.wab7yoLVIUT8juu7ofKE-3lJfeQtNA5hVUo56_9Bk3E`;
  }else{
    delete axios.defaults.headers.common['Authorization'];
  }
}
