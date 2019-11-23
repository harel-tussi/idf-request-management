import React from "react";
import { connect } from "react-redux";
import { Loader } from "semantic-ui-react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute({ loading, user, component: Component, ...rest }) {
  if (loading) return <Loader active inline="centered" />;
  if (user) return <Redirect to="/" />;
  return <Route component={Component} {...rest} />;
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    ...ownProps
  };
};

export default connect(mapStateToProps)(AuthRoute);
