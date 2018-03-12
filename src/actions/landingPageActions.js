import axios from 'axios';

export const trending=()=>{
  return dispatch=>{
    return axios.get('http://127.0.0.1:8000/product/trending')
    .then(res=>{dispatch(fetchtrendinghits(res.data))})
    .catch(err=>{
      if(err.response.status > 400){
        dispatch(fetchtrendinghitsfailed("Something went wrong !"))
      }else{
        dispatch(fetchtrendinghitsfailed(err.response.data))
      }
    })
  }
}

export const fetchtrendinghits = (data) =>{
  return {
    type:'FETCH_TRENDINGHITS',
    data
  }
}

export const fetchtrendinghitsfailed = (data) =>{
  return {
    type:'TRENDING_FAILED',
    err:data
  }
}

export const mostpopular=()=>{
  return dispatch=>{
    return axios.get('http://127.0.0.1:8000/product/mostpopular')
    .then(res=>{dispatch(fetchmostpopularhits(res.data))})
    .catch(err=>{
        if(err.response.status > 400){
          dispatch(fetchmostpopularfailed("Something went wrong !"))
        }else{
          dispatch(fetchmostpopularfailed(err.response.data))
        }
      })
    // .catch(err=>{dispatch(fetchmostpopularfailed(err.response.data))})
  }
}

export const fetchmostpopularhits = (data) =>{
  return {
    type:'FETCH_MOSTPOPULAR',
    data
  }
}

export const fetchmostpopularfailed = (data) =>{
  return {
    type:'MOSTPOPULAR_FETCH_FAILED',
    err:data
  }
}

export const suggested=()=>{
  return dispatch=>{
    return axios.get('http://127.0.0.1:8000/product/suggested')
    .then(res=>{dispatch(fetchsuggested(res.data))})
    .catch(err=>{
      if(err.response.status > 400){
        dispatch(fetchsuggestedfailed("Something went wrong !"))
      }else{
        dispatch(fetchsuggestedfailed(err.response.data))
      }
    })
  }
}

export const fetchsuggested = (data) =>{
  return {
    type:'FETCH_SUGGESTED',
    data
  }
}

export const fetchsuggestedfailed = (data) =>{
  return {
    type:'SUGGESTED_FETCH_FAILED',
    err:data
  }
}

export const landingPageValues=(values)=>{
  let featuresImagesarray=[];
  let featureImageLength=values.mainbannerimages.length;
  if(featureImageLength !== 0){
    for (let i = 0; i < featureImageLength; i++) {
      getBase64(values.mainbannerimages[i]);
    }

    function getBase64(file) {
      var reader = new FileReader();
      reader.onload = function () {
        featuresImagesarray.push(reader.result);
      };
      reader.readAsDataURL(file);
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
    values.mainbannerimages=featuresImagesarray;
    return dispatch=>{
        setTimeout(function(){
           axios.post('http://127.0.0.1:8000/mainData',values)
          .then(res=>{dispatch(mainpageuploadsuccess(res.data))})
          .catch(error=>{
            if (error.response.status > 400) {
            dispatch(mainpageuploadfailed("Something went wrong!!"))
          }else{
            dispatch(mainpageuploadfailed(error.response.data))
            }
          })
        }, 20000);
      }
  }
}

export const mainpageuploadsuccess = (data) =>{
  return {
    type:'MAINPAGE_UPLOAD_SUCCESS',
    mainUploadData:data
  }
}

export const mainpageuploadfailed = (error) =>{
  return {
    type:'MAINPAGE_UPLOAD_FAILED',
    error
  }
}

export const getBannerImages=()=>{
  return dispatch=>{
        return axios.get('http://127.0.0.1:8000/mainData')
        .then(res=>{dispatch(mainPageFetchSuccessFul(res.data))})
        .catch((error)=> {
            if (error.response.status > 400) {
            dispatch(mainPageFetchFailed("Something went wrong!!"))
          }else{
            dispatch(mainPageFetchFailed(error.response.data))
            }
        })
    }
}

export const mainPageFetchSuccessFul = (data) =>{
  return {
    type:'MAINPAGE_FETCH_SUCCESSFUL',
    mainbannerimages:data
  }
}

export const mainPageFetchFailed = (error) =>{
  return {
    type:'MAINPAGE_FETCH_FAILED',
    error
  }
}
