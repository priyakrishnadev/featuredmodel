import React from 'react';

const ResourceNotFound = ({error}) => (
  <div className="row mx-0 appHeight">
    <div className="container-fluid">
      <div className="alert alert-danger my-4">
        {error}
       </div>
    </div>
  </div>

);

export default ResourceNotFound;
