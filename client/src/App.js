import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/auth/PrivateRoute";
import AuthRoute from "./components/auth/AuthRoute";
import Header from "./components/Header";
import { VERIFY_TOKEN } from "./actions/authActions";
import { connect } from "react-redux";
import AddRequest from "./components/AddRequest";

class App extends Component {
  componentDidMount() {
    if (this.props.loading) {
      this.props.verifyToken(localStorage.getItem("token"));
    }
  }

  render() {
    return (
      <Router>
        {this.props.user && <Header />}
        <Switch>
          <AuthRoute path="/login" component={Login} />
          <AuthRoute path="/register" component={Register} />
          <PrivateRoute path="/" exact component={Dashboard} />
          <PrivateRoute path="/addrequest" exact component={AddRequest} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    ...ownProps
  };
};

const mapDispatchToProps = dispatch => {
  return {
    verifyToken: token => dispatch(VERIFY_TOKEN(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
