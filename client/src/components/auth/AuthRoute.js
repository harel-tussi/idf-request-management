import React from "react";
import { connect } from "react-redux";
import { Loader, Dimmer } from "semantic-ui-react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute({ loading, user, component: Component, ...rest }) {
  if (loading)
    return (
      <Dimmer active inverted>
        <Loader size="large">Loading</Loader>
      </Dimmer>
    );
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
