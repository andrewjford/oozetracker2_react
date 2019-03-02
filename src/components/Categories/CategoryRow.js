import React from 'react';
import { withStyles, TextField } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  mainHeader: {
    gridColumn: "1 / 5",
    height: "2rem",
    padding: "1rem",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
  summary: {
    marginTop: "1rem",
    display: "grid",
    gridTemplateColumns: "1rem 20% auto 20% 1rem"
  },
  paper: {
    gridColumnStart: 3,
    gridColumnEnd: 4
  },
  headerItem: {
    verticalAlign: "middle",
    display: "inline",
  },
  footer: {
    margin: "1rem",
  },
  rightAlignButton: {
    textAlign: "right",
    padding: "0",
  },
  name: {
    width: "85%",
  }
});

class CategoryRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inlineEditValue: null,
      editing: false,
    };
  }

  handleEditClick = (event) => {
    this.setState({
      ...this.state,
      inlineEditValue: this.props.category.name,
      editing: true,
    });
  }

  handleInlineEdit = (event) => {
    this.setState({
      inlineEditValue: event.target.value
    });
  }

  handleInlineEditOnBlur = (event) => {
    const updatedCategory = this.props.category;
    updatedCategory.name = this.state.inlineEditValue;
    this.props.updateCategory(updatedCategory);

    this.setState((state) => {
      return {
        ...this.state,
        editing: false,
      }
    })
  }

  handleDeleteClick = (event) => {
    this.props.deleteCategory(this.props.category);
  }

  categoryName = () => {
    if (this.state.editing) {
      return (
        <TextField type="text" value={this.state.inlineEditValue} onChange={this.handleInlineEdit}
                    autoFocus={true} onBlur={this.handleInlineEditOnBlur}/>
      );
    } else {
      return (
        this.props.category.name
      );
    }
  }

  render() {
    return (
      <TableRow key={this.props.category.id} data-key={this.props.category.id}>
        <TableCell className={this.props.classes.name}>
          {this.categoryName()}
        </TableCell>
        <TableCell className={this.props.classes.rightAlignButton}>
          <Fab size="small" aria-label="Edit" className={this.props.classes.fab} onClick={this.handleEditClick}>
            <EditIcon/>
          </Fab>
        </TableCell>
        <TableCell className={this.props.classes.rightAlignButton}>
          <Fab size="small" aria-label="Delete" className={this.props.classes.fab} onClick={this.handleDeleteClick}>
            <DeleteIcon/>
          </Fab>
        </TableCell>
        
      </TableRow>
    );
  }
}
export default withStyles(styles)(CategoryRow);