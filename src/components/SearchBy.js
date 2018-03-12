import React from 'react';

class SearchBy extends React.Component {
  searchHandle = (e) => {
      this.props.handleSearch(e.target.value);
  }

  render(){
    return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">
        <i className="fa fa-search" aria-hidden="true"></i>
        </span>
      </div>
      <input type="text"
      className="form-control"
      placeholder="Search by brand"
      onChange={this.searchHandle}
      value={this.props.searchValue}
       />
    </div>
    );
  }

}

export default SearchBy;
