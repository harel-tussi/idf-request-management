import React from "react";
import { connect } from "react-redux";
import { Loader } from "semantic-ui-react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ loading, user, component: Component, ...rest }) {
  if (loading) return <Loader active inline="centered" />;
  if (user) return <Route component={Component} {...rest} />;
  return <Redirect to="/login" />;
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    ...ownProps
  };
};

export default connect(mapStateToProps)(PrivateRoute);
