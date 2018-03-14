import React from 'react'

class FileInput extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { input: { onChange } } = this.props;
     onChange(e.target.files[0])
  }

  render() {
    return (<input
      type="file"
      className='form-control'
      onChange={this.onChange}
    />);
  }
}

export default FileInput
