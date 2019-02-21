import React from 'react';
import { withStyles } from '@material-ui/core';
import { Typography, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CategoryInput from './CategoryInput';
import CategoryRows from './CategoryRows';
import BackendCallout from '../../services/BackendCallout';

import { fetchCategories } from '../../actions/categoriesActions';

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
});

class CategoriesList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayCategoryInput: false,
      inlineEditValue: null,
      categories: props.categories.categories,
    };
  }

  handleAddCategory = (event) => {
    this.setState((state) => { return {displayCategoryInput: true}});
  }

  createCategory = (newCategory) => {
    BackendCallout.postToApi('/api/v1/categories', newCategory)
      .then((response) => {
        
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
              <CategoryRows categories={this.state.categories}/>
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

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchCategories,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CategoriesList));