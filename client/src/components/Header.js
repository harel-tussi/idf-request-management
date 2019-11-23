import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Dropdown, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { SIGNOUT } from "../actions/authActions";
import { withRouter } from "react-router-dom";
function Header(props) {
  const [activeItem, setActiveItem] = useState("home");

  const handleSignOut = () => {
    localStorage.removeItem("token");
    props.signout();
    props.history.push("/login");
  };

  return (
    <Menu size="large">
      <Menu.Item>
        <NavLink to="/">Home</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/addrequest">Add Request</NavLink>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Button primary onClick={() => handleSignOut()}>
            Sign Out
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    ...ownProps
  };
};

const maDispatchToProps = dispatch => ({
  signout: () => dispatch(SIGNOUT())
});

export default withRouter(connect(mapStateToProps, maDispatchToProps)(Header));
