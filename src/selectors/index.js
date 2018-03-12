import { createSelector } from 'reselect'

export const getMainBannerImages = (state) => state.main.bannerImages
export const getWonReward = (state) => state.products.rewardsData
const getListOfCategory = (state) => state.products.product
const getSearchText = (state) => state.products.searchText
const getSortValue = (state) => state.products.sortValue

export const getVisibleCategory = createSelector(
  [ getListOfCategory, getSearchText, getSortValue ],
  (ListOfCategory, searchText, sortValue) =>{
    if((searchText !== undefined) && (searchText !== null) && (searchText !== "")){
      return ListOfCategory.filter((val) => val.modelname.toLowerCase().includes(searchText.toLowerCase())).sort((a, b) => {
      if (sortValue === 'likes') {
        return b.modellikes - a.modellikes;
      }
      if (sortValue === 'views') {
        return b.modelviews - a.modelviews;
      }
      if (sortValue === 'brand') {
        return a.modelname > b.modelname ? 1 : a.modelname < b.modelname ? -1 : 0;
      }
    });
  }
  if(sortValue){
    return [...ListOfCategory.sort((a, b) => {
    if (sortValue === 'likes') {
      return b.modellikes - a.modellikes;
    }
    if (sortValue === 'views') {
      return b.modelviews - a.modelviews;
    }
    if (sortValue === 'brand') {
      return a.modelname > b.modelname ? 1 : a.modelname < b.modelname ? -1 : 0;
    }
  })]

  }
}
)
const getListOfOffers = (state) => state.products.bestoffers
const getOfferText = (state) => state.products.searchOffer
const getOfferValue = (state) => state.products.sortOfferValue
export const getVisibleOffers = createSelector(
  [ getListOfOffers, getOfferText, getOfferValue ],
  (ListOfOffers, searchOffer, sortOfferValue) =>{
    if((searchOffer !== undefined) && (searchOffer !== null) && (searchOffer !== "")){
      return ListOfOffers.filter((val) => val.modelname.toLowerCase().includes(searchOffer.toLowerCase())).sort((a, b) => {
      if (sortOfferValue === 'likes') {
        return b.modellikes - a.modellikes;
      }
      if (sortOfferValue === 'views') {
        return b.modelviews - a.modelviews;
      }
      if (sortOfferValue === 'brand') {
        return a.modelname > b.modelname ? 1 : a.modelname < b.modelname ? -1 : 0;
      }
    });
  }
  if(sortOfferValue){
    return [...ListOfOffers.sort((a, b) => {
    if (sortOfferValue === 'likes') {
      return b.modellikes - a.modellikes;
    }
    if (sortOfferValue === 'views') {
      return b.modelviews - a.modelviews;
    }
    if (sortOfferValue === 'brand') {
      return a.modelname > b.modelname ? 1 : a.modelname < b.modelname ? -1 : 0;
    }
  })]

  }
}
)
