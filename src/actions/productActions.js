import axios from 'axios';
import ip from 'ip';
 import FormData from 'form-data';
 import history from '../components/history'
export const handleProductValues=(values)=>{
  var formData = new FormData();
  var featuresImagesarray=[];
  var productBlogImage;
  var featureImageLength=values.values.featureimages1.length;
     for (var i = 0; i < featureImageLength; i++) {
       formData.append('featureimages[]', values.values.featureimages1[i]);
     }
     console.log(values.values.featurevideos);
     var videoCount=values.values.featurevideos.length;
     for (var i = 0; i < videoCount ; i++) {
       formData.append('featurevideos[]', values.values.featurevideos[i].video);
     }
     formData.append('modelfile', values.values.modelfile[0]);
     formData.append('modelname', values.values.modelname);
     formData.append('featured_client', values.values.featured_client);
     formData.append('modelGenre', values.values.modelGenre);
     formData.append('modelsubtitle', values.values.modelsubtitle);
     formData.append('modelviews', values.values.modelviews);
     formData.append('modellikes', values.values.modellikes);

     formData.append('modelScaleParam1', values.values.modelScaleParam1);
     formData.append('modelScaleParam2', values.values.modelScaleParam2);
     formData.append('modelScaleParam3', values.values.modelScaleParam3);
     formData.append('modelLightParam1', values.values.modelLightParam1);
     formData.append('modelLightParam2', values.values.modelLightParam2);
     formData.append('modelLightParam3', values.values.modelLightParam3);

     formData.append('modelCameraFar', values.values.modelCameraFar);
     formData.append('modelCameraFor', values.values.modelCameraFor);
     formData.append('modelCameraNear', values.values.modelCameraNear);
     formData.append('modelLightColor', values.values.modelLightColor);
     formData.append('modelBackgroundColor', values.values.modelBackgroundColor);

     formData.append('featureImageLength', featureImageLength);
     formData.append('videoCount', videoCount);
     formData.append('averagerating', values.values.averagerating);
     formData.append('suggestionslot', values.values.suggestionslot);
     formData.append('thumbnailimage1', values.values.thumbnailimage1[0]);
     formData.append('blogimage1', values.values.blogimage1[0]);
     formData.append('modeldescription', values.values.modeldescription);
     formData.append('featuretabtitleone', values.values.featuretabtitleone);
     formData.append('featuretabtitletwo', values.values.featuretabtitletwo);
     formData.append('featuretabtitlethree', values.values.featuretabtitlethree);
     formData.append('featuretabtitleonedescription', values.values.featuretabtitleonedescription);
     formData.append('featuretabtitletwodescription', values.values.featuretabtitletwodescription);
     formData.append('featuretabtitlethreedescription', values.values.featuretabtitlethreedescription);
     formData.append('blogdetails', values.values.blogdetails);
  return dispatch=>{
      dispatch({type:'PRODUCT_UPLOAD_PROCESSING'})
      // setTimeout(function(){
        return axios.post('http://127.0.0.1:8000/addProduct',formData,
        { headers: {'Content-Type': 'multipart/form-data'}}
        // {
        //     onUploadProgress: progressEvent => {
        //       console.log(Math.round(progressEvent.loaded/progressEvent.total*100)+ "%" );
        //     }
        //   }
        )
        .then(res=>dispatch({type:'PRODUCT_UPLOADED_SUCCESSFULLY'}))
        .catch(error=>dispatch({type:'PRODUCT_UPLOADED_FAILED',data:error.response.data.errors}))
      // }, 20000);
    }
}

export const EditProductValues=(values)=>{
  const {values:{selectCategory,selectProduct}} = values;
  const productData={selectCategory,selectProduct}
  return dispatch=>{
    return axios.post('http://127.0.0.1:8000/editProduct',productData)
    .then(res=>dispatch({type:'EDIT_PRODUCT_INFO',data:res.data}))
    .catch(err=>dispatch({type:'FAIL_PRODUCT_INFO'}))
  }
}

export const categoryLoad = () => {
  return dispatch=>{
    return axios.get('http://127.0.0.1:8000/getCategory')
    .then(res=>dispatch({
      type:'LOAD_CATEGORY',
      data:res.data
      }))
  }
}

export const productLoad = (category) => {
  return dispatch=>{
    dispatch(productfetching())
    return axios.get('http://127.0.0.1:8000/getProduct/' + category)
    .then(res=>dispatch({
      type:'LOAD_PRODUCT',
      data:res.data
    }),
    dispatch(productfetched())
    )
    .catch((error)=> {
        if (error.response) {
          dispatch(productFetchFailed(error.response.data))
        }
    })
  }
}

export const getProductInfo = (category,product) => {
  return dispatch=>{
    dispatch(productfetching())
    return axios.get('http://127.0.0.1:8000/getModel/' + category + '/' + product)
   //  .then(res=>{return axios.post('http://127.0.0.1:8000/product/views',{
   //   params: {
   //     category: category,
   //     product: product
   //   }}
   // )})

    .then(res=>dispatch({
      type:'LOAD_PRODUCT_INFO',
      data:res.data.data
    }),dispatch(productfetched())

    )
    // .catch(err=>history.push('/test'))
  }
}

export const getSuggestions = (category,product) => {
  return dispatch=>{
    dispatch({
      type:'PRODUCT_FETCHING'
    })
    return axios.get('http://127.0.0.1:8000/' + category + '/' + product + '/suggestion')
    .then(res=>dispatch({
      type:'LOAD_PRODUCT_SUGGESTIONS',
      data:res.data
    }),
    dispatch({
      type:'PRODUCT_FETCHED'
    })
    )
  }
}

export const getCategoryInfo = (category) => {
  return dispatch=>{
    dispatch(fetching())
      return axios.get('http://127.0.0.1:8000/getProduct/' + category)
      .then(res=>dispatch({type:'LOAD_PRODUCT',data:res.data}),
            dispatch(fetched())
      ).catch(function(err)
        {
            if(err) {
                dispatch(notFound(err.response.data))
              }
        });
  }
}

export const downVotePollModel = (id,voteStatus,like) => {
  const values={id,voteStatus,like}
  return dispatch=>{
   return axios.post('http://127.0.0.1:8000/product/unlike',values)
   .then(res=>{return axios.get('http://127.0.0.1:8000/product/hits/' + id)})
    .then(res=>dispatch(productvote(id,res.data.likes)))
  }
}

export const upVotePollModel = (id,voteStatus,like) => {
  const values={id,voteStatus,like}
  return dispatch=>{
   return axios.post('http://127.0.0.1:8000/product/like',values)
    .then(res=>{return axios.get('http://127.0.0.1:8000/product/hits/' + id)})
    .then(res=>dispatch(productvote(id,res.data.likes)))
 }
}

export const productvote = (id,data) => {
  return{
    type:"TOGGLE_PRODUCT_VOTE",
    id,
    data
  };
}

export const modelviewhits=(product)=>{
  const values={product}
  return dispatch=>{
   return axios.post('http://127.0.0.1:8000/product/views',values)
    .then(res=>dispatch({
      type:'VIEWS_COUNT',
      data:res.data
    }))
  }
}

export const modelrating=(value,product)=>{
  const ip_address=ip.address();
  const values={value,product,ip_address}
  return dispatch=>{
   return axios.post('http://127.0.0.1:8000/product/rating',values)
   .then(res=>dispatch(setrating()))
  }
}

export const setrating=()=>{
  return {
    type:'SET_RATING'
  };
}

export const notFound=(data)=>{
  return {
    type:'NOT_FOUND',
    data
  }
}

export const fetching=()=>{
  return {
    type:'FETCHING'
  }
}

export const fetched=()=>{
  return {
    type:'FETCHED'
  }
}

export const productfetching=()=>{
  return {
    type:'PRODUCT_FETCHING'
  }
}

export const productfetched=()=>{
  return {
    type:'PRODUCT_FETCHED'
  }
}

export const productFetchFailed=(error)=>{
  return {
    type:'PRODUCT_FETCHED_FAILED',
    error
  }
}

// search filter for categoryLoad
export const search=(value)=>{
  return {
    type: 'SEARCH',
    value
  };
}

// sort by for products/category
export const sortBy=(value)=>{
  return {
    type: 'SORT_BY',
    sortValue:value
  };
}

// search filter for categoryLoad
export const searchforOffer=(value)=>{
  return {
    type: 'SEARCH_FOR_OFFER',
    value
  };
}

// sort by for products/category
export const sortByOffer=(value)=>{
  return {
    type: 'SORT_BY_OFFER',
    sortOfferValue:value
  };
}

// Rewards submit
export const rewardsSubmit=(values)=>{
  let rewardsImages=[];
  let rewardsImagesLength=values.rewardImage.length;
  if(rewardsImagesLength !== 0){
    for (let i = 0; i < rewardsImagesLength; i++) {
      getBase64(values.rewardImage[i]);
    }
    function getBase64(file) {
      var reader = new FileReader();
      reader.onload = function () {
        rewardsImages.push(reader.result);
      };
      reader.readAsDataURL(file);
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
    values.rewardImage=rewardsImages;
    console.log(values);
  }
  return dispatch=>{
      setTimeout(function(){
        axios.post('http://127.0.0.1:8000/rewards',values)
        .then(res=>dispatch(rewardsPostSuccess(res.data.success)))
        .catch((error)=> {
           if (error.response) {
             dispatch(rewardsPostFailed(error.response.data.error))
           }
         })
       }, 5000);
    }
  }

export const rewardsPostSuccess=(data)=>{
  return {
    type: 'REWARDS_UPLOAD_SUBMIT',
    data
  };
}

export const rewardsPostFailed=(error)=>{
  return {
    type: 'REWARDS_UPLOAD_FAILED',
    error
  };
}

// best offers
export const getBestOffers=()=>{
  return dispatch=>{
    dispatch({type:'FETCHING'})
    setTimeout(function(){
      return axios.get('http://127.0.0.1:8000/product/bestoffers')
      .then(res=>dispatch({type:'LOAD_BESTOFFERS',data:res.data}),
      dispatch({type:'FETCHED'}))
      .catch(function(err){
            if(err) {
                dispatch({type:'BESTOFFERS_NOTFOUND',data:err.response.data})
              }
        });

    },5000);

  }
}
