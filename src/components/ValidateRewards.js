const ValidateRewards = values => {
  const errors = {}
    if (!values.offerDescription) {
      errors.offerDescription = 'Required'
    }
    if (!values.rewardName) {
      errors.rewardName = 'Required'
    }
    if (!values.totalRewardCount) {
      errors.totalRewardCount = 'Required'
    }
    if(!values.rewardImage){
      errors.rewardImage="Please select a image !!"
    }
    if(!values.selectCategory || !values.hasOwnProperty('selectCategory') || values.selectCategory===0){
      errors.categoryError="Required"
    }
    if(!values.selectProduct || !values.hasOwnProperty('selectProduct')|| values.selectProduct===0){
      errors.productError="Please select the product"
    }
    console.log(errors);
    return errors
  }

export default ValidateRewards
