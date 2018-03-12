import React from 'react';

class SortBy extends React.Component {
  onChangeOption = (e) => {
      this.props.handleSortBy(e.target.value);
  }

  render(){
    return (
      <div className="form-group">
        <select className="form-control" id="sel1"
        placeholder="-- Sort By -- "
        onChange={this.onChangeOption}
        defaultValue="sortby"
        >
          <option value="sortby" disabled >-- Sort By --</option>
          <option value="brand" >Brand</option>
          <option value="likes">Likes</option>
          <option value="views">Views</option>
        </select>
      </div>
    );
  }

}

export default SortBy;
