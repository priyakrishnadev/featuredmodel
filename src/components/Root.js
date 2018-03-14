import React from 'react';
import {Provider} from 'react-redux';
import Routes from './Routes';
const Root=({store})=>(
    <Provider store={store}>
      <div className="container-fluid noPadding ">
        <Routes />
      </div>
    </Provider>
);

export default Root;
