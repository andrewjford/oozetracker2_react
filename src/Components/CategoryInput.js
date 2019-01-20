import React from 'react';

export default class CategoryInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createCategory(this.state);
  }

  handleNameChange = (event) => {this.setState({name: event.target.value})}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
        </label>

        <button>Submit</button>
      </form>
    )
  }
}
