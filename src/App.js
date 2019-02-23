import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
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

import { fetchRecentExpenses } from './actions/expenseActions';
import { fetchCategories } from './actions/categoriesActions';

const styles = theme => ({
  root: {
    height: "100%",
  },
});

class App extends Component {

  state = {
    mode: 'summary',
    expenses: [],
    expenseCategories: [],
    expenseCategoriesMap: {},
    loading: true
  };


  componentDidMount() {
    this.props.fetchRecentExpenses();
    this.props.fetchCategories();
    document.title = "Ooze Tracker";
  }

  mainContainer = () => {
    return <SummaryDisplay expenses={this.props.expenses}/>;
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
            return <ExpenseForm expenseCategories={this.props.categories} />
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
      // this.setState({redirect: null});
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

  handleSummaryClick = (event) => {
    this.setState((state) => {return {mode: 'summary'}});
  }

  main = () => {
    if (!this.props.expenses) {
      return <div>{this.navigationMenu()}</div>
    } else {
      return (
        <div className={this.props.classes.root}>
          {this.navigationMenu()}
          <Route exact path='/' render={() => <SummaryDisplay expenses={this.props.expenses}/>} />
          <Route path='/categories' render={(props) => <CategoriesList {...props} />}/>
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

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses.expenses,
    categories: state.categories.categories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchRecentExpenses,
    fetchCategories,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
