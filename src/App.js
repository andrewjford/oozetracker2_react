import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MuiThemeProvider } from '@material-ui/core/styles';
import Theme from './Theme';
import { withStyles } from '@material-ui/core';

import NavBar from './components/NavBar';
import ExpenseForm from './components/Expenses/ExpenseForm';
import SummaryDisplay from './components/SummaryDisplay';
import CategoriesList from './components/Categories/CategoriesList';
import ExpenseDetail from './components/Expenses/ExpenseDetail';
import MonthlyTotals from './components/MonthlyTotals';
import Login from './components/Account/Login';
import Register from './components/Account/Register';
import UnverifiedEmail from './components/Account/UnverifiedEmail';
import MyAccount from './components/Account/MyAccount';

import { login, logout, setTokenFromLocalStorage, register } from './actions/accountActions';
import { fetchRecentExpenses } from './actions/expenseActions';
import { fetchCategories } from './actions/categoriesActions';

const styles = theme => ({
  root: {
    height: "100%",
  },
  section: {
    marginTop: "1rem",
    display: "grid",
    gridTemplateColumns: "5% 15% 30% 30% 15% 5%"
  },
  expenses: {
    gridColumn: "1 / -1",
  }
});

function PrivateRoute({ render, component: Component, isLoggedIn, ...rest }) {
  if (!isLoggedIn) {
    return <Redirect to={'/login'} />
  } else if (render) {
    return (<Route {...rest} render={render} />);
  } else {
    return (<Route {...rest} render={props => (<Component {...props}/>)} />);
  }
}

class App extends Component {
  state = {};

  expensesRoute = ({match}) => {
    return (
      <>
        <Route exact path={match.path} render={() => (
          <SummaryDisplay getBaseData={this.getBaseData} />
        )} />
        <Route exact path={`${match.path}/:id/edit`} render={(props) => {
          return <ExpenseForm categories={this.props.categories} expense={this.getExpense(props.match.params.id)}/>
        }}/>
        <Route exact path={`${match.path}/:id`} render={(props) => {
          if (props.match.params.id === 'new') {
            return <ExpenseForm categories={this.props.categories} />
          } else {
            return (
              <ExpenseDetail categoriesMap={this.props.categoriesMap}
                expense={this.getExpense(props.match.params.id)} />
            );
          }
        }} />
      </>
    )
  }

  getBaseData = () => {
    return this.props.fetchRecentExpenses()
      .then(() => {
        return this.props.fetchCategories()
      });
  }

  getExpense = (expenseId) => {
    const expense = this.props.expenses.find((expense) => {
      return expense.id === expenseId;
    });
    if (expense) {
      return expense;
    } else {
      return {
        id: expenseId,
      }
    }
  }

  render() {
    const isLoggedIn = !!this.props.account.token;
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={Theme}>
          <NavBar isLoggedIn={this.props.account.token} logout={this.props.logout} />
          <section className={this.props.classes.section}>
            <Switch>
              <Route path='/login' render={() => <Login login={this.props.login} isLoggedIn={this.props.account.token} />} />
              <Route path='/register' render={() => <Register register={this.props.register}/>} />
              <Route path='/pleaseverify' component={UnverifiedEmail} />
              <Route path='/myaccount' component={MyAccount} />
              <PrivateRoute exact path='/' isLoggedIn={isLoggedIn} render={() => (
                <SummaryDisplay getBaseData={this.getBaseData} />)} />
              <PrivateRoute path='/categories' isLoggedIn={isLoggedIn} render={(props) => <CategoriesList {...props} getBaseData={this.getBaseData}/>}/>
              <PrivateRoute path='/expenses' isLoggedIn={isLoggedIn} component={this.expensesRoute}/>
              <PrivateRoute path='/monthly' isLoggedIn={isLoggedIn} render={(props) => <MonthlyTotals/>}/>
              <Route render={() => <Redirect to={'/'} />} />
            </Switch>
          </section>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses.expenses,
    categories: state.categories.categories,
    categoriesMap: state.categories.categoriesMap,
    account: state.account,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login,
    logout,
    setTokenFromLocalStorage,
    register,
    fetchRecentExpenses,
    fetchCategories,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
