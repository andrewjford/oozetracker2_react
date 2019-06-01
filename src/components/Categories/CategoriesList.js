import React from 'react';
import { withStyles, TableBody } from '@material-ui/core';
import { Typography, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CategoryInput from './CategoryInput';
import CategoryRow from './CategoryRow';
import Loading from '../Loading';

import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../actions/categoriesActions';

const styles = theme => ({
  mainHeader: {
    height: "2rem",
    padding: "1rem",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
  paper: {
    gridColumnStart: 3,
    gridColumnEnd: 5
  },
  headerItem: {
    verticalAlign: "middle",
    display: "inline",
  },
  footer: {
    margin: "1rem",
  },
  loadingSpinner: {
    gridColumnStart: 3,
    gridColumnEnd: 5,
    height: "20rem",
  }
});

class CategoriesList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayCategoryInput: false,
      dataFetched: false,
    };
  }

  handleAddCategory = (event) => {
    this.setState((state) => { return {displayCategoryInput: true}});
  }
  
  createCategory = (newCategory) => {
    this.props.createCategory(newCategory);
    this.setState({
      displayCategoryInput: false,
    });
  }
  
  updateCategory = (category) => {
    this.props.updateCategory(category);
  }

  deleteCategory = (category) => {
    this.props.deleteCategory(category);
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
    const categories = this.props.categories.categories.map((category) => {
      return (
        <CategoryRow key={category.id} category={category} 
                      updateCategory={this.updateCategory}
                      deleteCategory={this.deleteCategory}/>
      );
    });

    if (this.props.categories.categories.length === 0 && !this.state.dataFetched) {
      this.props.getBaseData()
        .then(() => {
          this.setState({dataFetched: true})
        });
      return (
        <div className={this.props.classes.loadingSpinner}>
          <Loading/>
        </div>
      );
    }

    return (
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CategoriesList));