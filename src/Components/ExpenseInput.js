import React from 'react';

export default class ExpenseInput extends React.Component {

  constructor(props) {
    super(props);
    let theDate = new Date();
    theDate = `${theDate.getFullYear()}-${theDate.getMonth()+1}-${theDate.getDate()}`
    this.state = {
      description: '',
      amount: 0,
      date: theDate,
      category: this.props.expenseCategories[0]
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  // categories = this.props.expenseCategories.map((category) => {
  //   return (
  //     <Picker.Item label={category} value={category} key={category}/>
  //   )
  // });

  handleSubmit() {
    this.props.createExpense(this.state);
  }

  handleAmountChange(text) {
    this.setState({amount: text});
  }

  handleDescriptionChange = (event) => {
    this.setState({description: event.target.value});
  }

  handleCategoryChange(newCategory) {
    this.setState({category: newCategory});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Description
          <input type="text" value={this.state.description} onChange={this.handleDescriptionChange}/>
        </label>


        {/* <TextInput
          style={{height: 40, width: 100, backgroundColor: "white"}}
          keyboardType="numeric"
          onChangeText={this.handleAmountChange}
          placeholder="Amount"
        />

        <Picker selectedValue={this.state.category}
          style={{height: 40, width: '100%'}}
          onValueChange={this.handleCategoryChange}>
          {this.categories}
        </Picker> */}

        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    )
  }
}
