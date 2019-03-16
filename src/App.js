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
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Loading from './components/Loading';

import { login, setTokenFromLocalStorage } from './actions/accountActions';
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

class App extends Component {
  state = {};

  componentDidMount() {
    const tokenExpiryDate = localStorage.getItem('expiryDate');
    if (tokenExpiryDate && Date.now() < new Date(tokenExpiryDate)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.props.setTokenFromLocalStorage(token);
      }
    }
    document.title = "Ooze Tracker";
  }

  mainContainer = () => {
    return <SummaryDisplay expenses={this.props.expenses}/>;
  }

  expensesRoute = ({match}) => {
    return (
      <>
        <Route exact path={match.path} component={this.mainContainer} />
        <Route exact path={`${match.path}/:id/edit`} render={(props) => {
          return <ExpenseForm categories={this.props.categories} expense={this.getExpense(props.match.params.id)}/>
        }}/>
        <Route exact path={`${match.path}/:id`} render={(props) => {
          if (props.match.params.id === 'new') {
            return <ExpenseForm categories={this.props.categories} />
          } else {
            return (
              <ExpenseDetail expenseCategories={this.props.categories} updateExpenseState={this.updateExpenseState}
                             expense={this.getExpense(props.match.params.id)} redirectTo={this.redirectTo}/>
            );
          }
        }} />
      </>
    )
  }

  getBaseData = () => {
    this.props.fetchRecentExpenses();
    this.props.fetchCategories();
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

  updateExpenseState = (callback) => {
    this.setState((state) => {
      return {
        expenses: callback(state.expenses),
        redirect: '/'
      }
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

  handleSummaryClick = (event) => {
    this.setState((state) => {return {mode: 'summary'}});
  }

  main = () => {
    if (!this.props.account.token && !this.props.expenses) {
      return (
        <div>
          <NavBar isLoggedIn={this.props.account.token} />
          <section className={this.props.classes.section}>
            <Switch>
              <Route path='/login' render={() => <Login login={this.props.login}/>} />
              <Route path='/register' render={() => <Register register={this.props.register}/>} />
              <Route render={() => <Redirect to={'/login'}/>} />
            </Switch>
          </section>
        </div>
      );
    } else if (!this.props.expenses) {
      {this.getBaseData()}
      return <div>
        <NavBar isLoggedIn={this.props.account.token} />
        <Loading />
      </div>;
    } else {
      return (
        <div className={this.props.classes.root}>
          <NavBar isLoggedIn={this.props.account.token} />
          <section className={this.props.classes.section}>
            <Switch>
              <Route exact path='/' render={() => <SummaryDisplay expenses={this.props.expenses}/>} />
              <Route path='/categories' render={(props) => <CategoriesList {...props} />}/>
              <Route path='/expenses' component={this.expensesRoute}/>
              <Route path='/monthly' render={(props) => <MonthlyTotals/>}/>
              <Route render={() => <Redirect to={'/'}/>} />
            </Switch>
          </section>
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

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses.expenses,
    categories: state.categories.categories,
    account: state.account,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login,
    setTokenFromLocalStorage,
    fetchRecentExpenses,
    fetchCategories,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
