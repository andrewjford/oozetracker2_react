import React from 'react';
import { TextField, Button, withStyles } from '@material-ui/core';

const styles = theme => ({
  item: {
    verticalAlign: "inherit",
  },
});

class CategoryInput extends React.Component {
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
        <TextField type="text" value={this.state.name} onChange={this.handleNameChange}
                   label="Category Name" className={this.props.classes.item} autoFocus={true}/>
        <Button onClick={this.handleSubmit} variant="text" color="primary"
                className={this.props.classes.item}>
          Submit
        </Button>
      </form>
    )
  }
}
export default withStyles(styles)(CategoryInput);