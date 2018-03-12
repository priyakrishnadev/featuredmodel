import React from 'react';

class DropDownSelect extends React.Component {

  render() {
    const { input, label } = this.props;
    console.log(this.props);
    return (
      <div>
        <select {...input}>
          <option value="">Select</option>
          {this.props.people.map((person,i)=>
            <option key={i} value={person}>{person.description}</option>
          )}
        </select>
      </div>
    );
  }
}
export default DropDownSelect;
