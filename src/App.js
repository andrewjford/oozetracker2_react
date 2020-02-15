import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { MuiThemeProvider } from "@material-ui/core/styles";
import Theme from "./Theme";
import { withStyles } from "@material-ui/core";

import TopNavBar from "./components/Nav/TopNavBar";
import SummaryDisplay from "./components/SummaryDisplay";
import CategoriesList from "./components/Categories/CategoriesList";
import Login from "./components/Account/Login";
import Register from "./components/Account/Register";
import UnverifiedEmail from "./components/Account/UnverifiedEmail";
import MyAccount from "./components/Account/MyAccount";
import BottomNavBar from "./components/Nav/BottomNavBar";
import LoadingPage from "./components/LoadingPage";

import {
  login,
  logout,
  setTokenFromLocalStorage,
  register
} from "./actions/accountActions";
import {
  fetchRecentExpenses,
  getMonthByCategory
} from "./actions/expenseActions";
import { fetchCategories } from "./actions/categoriesActions";
import ProfilePage from "./components/Account/ProfilePage";
import { ExpensesRoute } from "./routes/ExpensesRoute";
import { MonthlyRoute } from "./routes/MonthlyRoute";

function PrivateRoute({
  render,
  component: Component,
  isLoggedIn,
  noBaseData,
  getBaseData,
  ...rest
}) {
  if (!isLoggedIn) {
    return <Redirect to={"/login"} />;
  }

  if (noBaseData) {
    return (
      <Route
        render={props => (
          <LoadingPage
            getFunction={getBaseData}
            actualComponent={<Redirect to={"/"} />}
          />
        )}
      />
    );
  }

  if (render) {
    return <Route {...rest} render={render} />;
  } else {
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
}

class App extends Component {
  state = {};

  getBaseData = () => {
    return this.props.fetchRecentExpenses().then(() => {
      return this.props.fetchCategories();
    });
  };

  getExpense = expenseId => {
    const expense = this.props.expenses[expenseId];
    if (expense) {
      return expense;
    } else {
      return {
        id: expenseId
      };
    }
  };

  render() {
    const isLoggedIn = !!this.props.account.token;
    const noBaseData =
      !this.props.expensesFetched || !this.props.categoriesFetched;

    return (
      <BrowserRouter>
        <MuiThemeProvider theme={Theme}>
          <section className={this.props.classes.page}>
            <TopNavBar
              isLoggedIn={this.props.account.token}
              logout={this.props.logout}
            />
            <section className={this.props.classes.section}>
              <Switch>
                <Route
                  path="/login"
                  render={() => (
                    <Login
                      login={this.props.login}
                      isLoggedIn={this.props.account.token}
                    />
                  )}
                />
                <Route
                  path="/register"
                  render={() => <Register register={this.props.register} />}
                />
                <Route path="/pleaseverify" component={UnverifiedEmail} />
                <Route path="/myaccount" component={MyAccount} />
                <PrivateRoute
                  exact
                  path="/"
                  isLoggedIn={isLoggedIn}
                  getBaseData={this.getBaseData}
                  noBaseData={noBaseData}
                  render={() => <SummaryDisplay />}
                />
                <PrivateRoute
                  path="/categories"
                  isLoggedIn={isLoggedIn}
                  getBaseData={this.getBaseData}
                  noBaseData={noBaseData}
                  render={() => <CategoriesList />}
                />
                <PrivateRoute
                  path="/expenses"
                  isLoggedIn={isLoggedIn}
                  getBaseData={this.getBaseData}
                  noBaseData={noBaseData}
                  component={props => (
                    <ExpensesRoute
                      getExpense={this.getExpense}
                      categories={this.props.categories}
                      categoriesMap={this.props.categoriesMap}
                      match={props.match}
                    />
                  )}
                />
                <PrivateRoute
                  path="/monthly"
                  isLoggedIn={isLoggedIn}
                  getBaseData={this.getBaseData}
                  noBaseData={noBaseData}
                  render={props => (
                    <MonthlyRoute
                      match={props.match}
                      getMonthByCategory={this.props.getMonthByCategory}
                      expensesByMonth={this.props.expensesByMonth}
                      categoriesMap={this.props.categoriesMap}
                    />
                  )}
                />
                <PrivateRoute
                  path="/profile"
                  isLoggedIn={isLoggedIn}
                  getBaseData={this.getBaseData}
                  noBaseData={noBaseData}
                  render={() => (
                    <ProfilePage
                      isLoggedIn={isLoggedIn}
                      logout={this.props.logout}
                    />
                  )}
                />
                <Route render={() => <Redirect to={"/"} />} />
              </Switch>
            </section>
            <BottomNavBar
              isLoggedIn={this.props.account.token}
              logout={this.props.logout}
            />
          </section>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    expenses: state.expenses.expenses,
    expensesFetched: state.expenses.dataFetched,
    expensesByMonth: state.expenses.byMonth,
    categories: state.categories.categories,
    categoriesMap: state.categories.categoriesMap,
    categoriesFetched: state.categories.dataFetched,
    account: state.account
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login,
      logout,
      setTokenFromLocalStorage,
      register,
      fetchRecentExpenses,
      fetchCategories,
      getMonthByCategory
    },
    dispatch
  );
};

const styles = theme => ({
  page: {
    height: "100vh"
  },
  section: {
    marginTop: "1rem",
    display: "grid",
    gridTemplateColumns: "5% 15% 30% 30% 15% 5%"
  },
  expenses: {
    gridColumn: "1 / -1"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
