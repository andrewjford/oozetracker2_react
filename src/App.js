import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { MuiThemeProvider } from '@material-ui/core/styles';
import Theme from './Theme';

import NavBar from './Components/NavBar';
import NewExpense from './Components/NewExpense';
import SummaryDisplay from './Components/SummaryDisplay';
import EditCategories from './Components/EditCategories';
import BackendCallout from './Components/BackendCallout';
import ExpenseDetail from './Components/ExpenseDetail';

class App extends Component {

  state = {
    mode: 'summary',
    expenses: [],
    expenseCategories: [],
    expenseCategoriesMap: {},
    loading: true
  };

  componentDidMount() {
    BackendCallout.getFromApi('/api/v1/categories')
      .then(categories => {
        const expenseCategoriesMap = categories.rows.reduce((accum,category) => {
          if(!accum[category.id]) {
            accum[category.id] = category.name;
          }
          return accum;
        },{});
        this.setState({
          expenseCategories: categories.rows,
          expenseCategoriesMap
        });
      })
      .then(
        BackendCallout.getFromApi('/api/v1/expenses')
          .then(data => {
            this.setState({expenses: data.rows, loading: false});
          })
          .catch(error => console.log(error))
      )
      .catch(error => console.log(error));
    document.title = "Ooze Tracker";
  }

  mainContainer = () => {
    switch (this.state.mode) {
      case 'summary':
        return <SummaryDisplay state={this.state}/>;
      case 'edit_categories':
        return <EditCategories state={this.state}/>;
      default:
        return null;
    }
  }

  expensesRoute = ({match}) => {
    return (
      <div>
        <Route exact path={match.path} component={this.mainContainer} />
        <Route path={`${match.path}/:id`} render={(props) => {
          if (props.match.params.id === 'new') {
            return <NewExpense expenseCategories={this.state.expenseCategories} addNewExpense={this.addNewExpense}
            createExpense={this.createExpense}/>
          } else {
            return <ExpenseDetail recordId={props.match.params.id}/> 
          }
        }}/>
      </div>
    )
  }

  navigationMenu = () => {
    return (
      <NavBar/>
    );
  }

  redirect = () => {
    const {redirect} = this.state;
    if (!!redirect) {
      return (<Redirect to={redirect}/>)
    }
  }

  addNewExpense = (newExpense) => {
    this.setState(() => {
      return {
        expenses: [...this.state.expenses, newExpense],
        redirect: '/'
      }
    });
  }

  handleEditCategoriesClick = (event) => {
    this.setState((state) => {
      return {mode: 'edit_categories'};
    })
  }

  handleSummaryClick = (event) => {
    this.setState((state) => {return {mode: 'summary'}});
  }

  main = () => {
    if (this.state.loading) {
      return <div>{this.navigationMenu()}</div>
    } else {
      return (
        <div>
          {this.navigationMenu()}
          <Route exact path='/' component={this.mainContainer}/>
          <Route path='/categories' render={(props) => <EditCategories {...props} state={this.state} />}/>
          <Route path='/expenses' component={this.expensesRoute}/>
          {this.redirect()}
        </div>
      );
    }
  }

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={Theme}>
          {this.main()}
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}
export default App;
