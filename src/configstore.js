import {createStore, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers';
import { loadState } from './localStorage';
// import { loadState,saveState } from './localStorage';
// import { loadproductState,saveproductState } from './productlocalStorage';
// import throttle from 'lodash/throttle';
// import setAuthorizationToken from './utils/setAuthorizationToken';
// import {setCurrentUser} from './actions/AuthActions';

const configstore = () =>{
   const persistedState = loadState();
  const logger = createLogger();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    // rootReducer,composeEnhancers(applyMiddleware(thunk, logger))
    // rootReducer,persistedState,composeEnhancers(applyMiddleware(thunk))
       rootReducer,persistedState,composeEnhancers(applyMiddleware(thunk, logger))
  );

  {/*store.subscribe(() => {
    As there is no user profile yet,it is necessary to persist comments and products state on localStorage
    When the user login system is added,please remove this state tree from localStorage as it supports only 5MB
    const state = store.getState();
    Object.keys(state).forEach( key => {
      saveState(key, state[key])
    })


    saveState({
      productComments:store.getState().productComments,
    });
  })*/}

  return store;
};

export default configstore;
