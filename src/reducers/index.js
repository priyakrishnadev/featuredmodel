import { combineReducers } from 'redux'
import auth from './auth'
import productComments from './productComments'
import categoryReducer from './categoryReducer'
import productReducer from './productReducer'
import contactReducer from './contactReducer'
import mainReducer from './mainReducer'
import productloaderReducer from './productloaderReducer'
import { reducer as reduxFormReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth,
  comments: productComments,
  category: categoryReducer,
  products: productReducer,
  contacts: contactReducer,
  main: mainReducer,
  productloader: productloaderReducer,
  form: reduxFormReducer
});

export default rootReducer
