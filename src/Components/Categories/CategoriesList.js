import React from 'react';
import { withStyles } from '@material-ui/core';
import { TextField, Typography, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

import CategoryInput from './CategoryInput';
import BackendCallout from '../BackendCallout';

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
  editButton: {
    textAlign: "right",
  }
});

class CategoriesList extends React.Component {

  constructor(props) {
    super(props);
    const categories = this.props.state.expenseCategories.map((category) => {
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

  handleAddCategory = (event) => {
    this.setState((state) => { return {displayCategoryInput: true}});
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
      this.updateCategories(categoryKey);
      return;
    }
    categoryToUpdate.name = this.state.inlineEditValue;
    BackendCallout.putToApi(`/api/v1/categories/${categoryToUpdate.id}`, categoryToUpdate)
      .then((responseCategory) => {
        this.updateCategories(categoryKey, responseCategory);
      });
  }

  updateCategories = (categoryKey, responseCategory = null) => {
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

  createCategory = (newCategory) => {
    BackendCallout.postToApi('/api/v1/categories', newCategory)
      .then((response) => {
        debugger
      });
  }

  categoryInput = () => {
    if (this.state.displayCategoryInput) {
      return <CategoryInput createCategory={this.createCategory} />;
    } else {
      return (
        <Button onClick={this.handleAddCategory} variant="contained" color="secondary">
          Add Category
        </Button>
      );
    }
  }

  render() {
    const categories = this.state.categories.map((category) => {
      if (category.editing) {
        return (
          <TableRow key={category.id} data-key={category.id}>
            <TableCell>
              <TextField type="text" value={this.state.inlineEditValue} onChange={this.handleInlineEdit}
                        autoFocus="true" onBlur={this.handleInlineEditOnBlur}/>
            </TableCell>
            <TableCell className={this.props.classes.editButton}>
              <Fab size="small" aria-label="Edit" className={this.props.classes.fab} onClick={this.handleEditClick}>
                <EditIcon/>
              </Fab>
            </TableCell>
          </TableRow>
        );
      } else {
        return (
          <TableRow key={category.id} data-key={category.id}>
            <TableCell>{category.name}</TableCell>
            <TableCell className={this.props.classes.editButton}>
              <Fab size="small" aria-label="Edit" className={this.props.classes.fab} onClick={this.handleEditClick}>
                <EditIcon/>
              </Fab>
            </TableCell>
          </TableRow>
        );
      }
    });

    return (
      <div>
        <div className={this.props.classes.summary}>
        <Paper className={this.props.classes.paper}>
          <div className={this.props.classes.mainHeader}>
            <Typography className={this.props.classes.headerItem} variant="h5" component="h3">
              Categories
            </Typography>
          </div>

          <Table>
            <TableBody>
              {categories}
            </TableBody>
          </Table>
          <div className={this.props.classes.footer}>
            {this.categoryInput()}
          </div>

        </Paper>
      </div>
      </div>
    );
  }
}
export default withStyles(styles)(CategoriesList);