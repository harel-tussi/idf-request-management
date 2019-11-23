import React from "react";
import { connect } from "react-redux";
import { Loader, Dimmer } from "semantic-ui-react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ loading, user, component: Component, path, ...rest }) {
  if (loading)
    return (
      <Dimmer active inverted>
        <Loader size="large">Loading</Loader>
      </Dimmer>
    );
  if (user) {
    if (path === "/addrequest")
      return user.type === "soldier" ? (
        <Route path={path} component={Component} {...rest} />
      ) : (
        <Redirect to="/" />
      );
    else {
      return <Route path={path} component={Component} {...rest} />;
    }
  }
  return <Redirect to="/login" />;
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    ...ownProps
  };
};

export default connect(mapStateToProps)(PrivateRoute);
