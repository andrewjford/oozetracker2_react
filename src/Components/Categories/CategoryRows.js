import React from 'react';
import { Typography, withStyles, TextField } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import BackendCallout from '../../services/BackendCallout';

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

class CategoryRows extends React.Component {
  constructor(props) {
    super(props);
    const categories = this.props.categories.map((category) => {
      return {
        ...category,
        editing: false
      }
    });

    this.state = {
      displayCategoryInput: false,
      inlineEditValue: null,
      categories,
    };
  }


  handleEditClick = (event) => {
    const categoryKey = event.currentTarget.parentElement.parentElement.dataset.key;
    let inlineEditValue;
    const newCategoriesList = this.state.categories.map((category) => {
      if (category.id === parseInt(categoryKey)) {
        inlineEditValue = category.name;
        return {
          ...category,
          editing: true,
        } 
      } else {
        return category;
      }
    });

    this.setState({
      inlineEditValue,
      categories: newCategoriesList
    });
  }

  handleInlineEdit = (event) => {
    this.setState({
      inlineEditValue: event.target.value
    });
  }

  handleInlineEditOnBlur = (event) => {
    const categoryKey = event.target.parentElement.parentElement.parentElement.parentElement.dataset.key
    const categoryToUpdate = this.state.categories.find(category => category.id === parseInt(categoryKey));
    if (categoryToUpdate.name === this.state.inlineEditValue) {
      this.updateCategory(categoryKey);
      return;
    }
    categoryToUpdate.name = this.state.inlineEditValue;
    BackendCallout.putToApi(`/api/v1/categories/${categoryToUpdate.id}`, categoryToUpdate)
      .then((responseCategory) => {
        this.updateCategory(categoryKey, responseCategory);
      });
  }

  updateCategory = (categoryKey, responseCategory = null) => {
    const newCategoriesList = this.state.categories.map((category) => {
      if (category.id === parseInt(categoryKey) && responseCategory) {
        return {
          ...responseCategory,
          editing: false,
        } 
      } else if (category.id === parseInt(categoryKey)) {
        return {
          ...category,
          editing: false
        }
      } else {
        return category;
      }
    });

    this.setState({
      categories: newCategoriesList
    });
  }

  handleDeleteClick = (event) => {
    const categoryKey = event.currentTarget.parentElement.parentElement.dataset.key;
    debugger
    BackendCallout.delete(`/api/v1/categories/${categoryKey}`)
      .then((response) => {
        const newCategories = this.state.categories.filter((category) => {
          return category.id !== parseInt(categoryKey);
        });
        this.setState({categories: newCategories});
      });
  }

  render() {
    const categories = this.state.categories.map((category) => {
      if (category.editing) {
        return (
          <TableRow key={category.id} data-key={category.id}>
            <TableCell className={this.props.classes.name}>
              <TextField type="text" value={this.state.inlineEditValue} onChange={this.handleInlineEdit}
                        autoFocus={true} onBlur={this.handleInlineEditOnBlur}/>
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
      } else {
        return (
          <TableRow key={category.id} data-key={category.id}>
            <TableCell className={this.props.classes.name}>{category.name}</TableCell>
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
    });

    return (
      <TableBody>
        {categories}
      </TableBody>
    )
  }
}
export default withStyles(styles)(CategoryRows);