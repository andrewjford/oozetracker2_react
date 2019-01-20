import React from 'react';
import CategoryInput from './CategoryInput';
import BackendCallout from './BackendCallout';

export default class EditCategories extends React.Component {

  constructor(props) {
    super(props);
    this.state = {displayCategoryInput: false};
  }

  handleAddCategory = (event) => {
    this.setState((state) => { return {displayCategoryInput: true}});
  }

  createCategory = (newCategory) => {
    BackendCallout.postToApi('/api/v1/categories', newCategory)
      .then((response) => {
        debugger;        
      });
  }

  categoryInput = () => {
    if (this.state.displayCategoryInput) {
      return <CategoryInput createCategory={this.createCategory} />;
    } else {
      return <button onClick={this.handleAddCategory}>Add Category</button>;
    }
  }

  render() {
    const categories = this.props.state.expenseCategories.map((category, index) => {
      return <li key={index}>
        {category.id} - {category.name}
      </li>
    });

    return (
      <div>
        <ul>{categories}</ul>
        {this.categoryInput()}
      </div>
    );
  }
}