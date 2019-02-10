import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { MuiThemeProvider } from '@material-ui/core/styles';
import Theme from './Theme';

import NavBar from './Components/NavBar';
import ExpenseForm from './Components/ExpenseForm';
import SummaryDisplay from './Components/SummaryDisplay';
import EditCategories from './Components/EditCategories';
import BackendCallout from './Components/BackendCallout';
import ExpenseDetail from './Components/ExpenseDetail';
import MonthlyTotals from './Components/MonthlyTotals';

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
    return <SummaryDisplay state={this.state}/>;
  }

  expensesRoute = ({match}) => {
    return (
      <div>
        <Route exact path={match.path} component={this.mainContainer} />
        <Route path={`${match.path}/:id/edit`} render={(props) => {
          return <div>wuattat</div>
        }}/>
        <Route path={`${match.path}/:id`} render={(props) => {
          if (props.match.params.id === 'new') {
            return <ExpenseForm expenseCategories={this.state.expenseCategories}
              afterSubmit={this.addNewExpense}/>
          } else {
            return (
              <ExpenseDetail expenseCategories={this.state.expenseCategories} updateExpenseState={this.updateExpenseState}
                             recordId={props.match.params.id} redirectTo={this.redirectTo}/>
            );
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

  redirectTo = (url) => {
    this.setState({redirect: url});
  }

  addNewExpense = (newExpense) => {
    this.setState(() => {
      return {
        expenses: [...this.state.expenses, newExpense],
        redirect: '/'
      }
    });
  }

  updateExpenseState = (callback) => {
    this.setState((state) => {
      return {
        expenses: callback(state.expenses),
        redirect: '/'
      }
    });
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
          <Route path='/monthly' render={(props) => <MonthlyTotals categoriesMap={this.state.expenseCategoriesMap}/>}/>
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
