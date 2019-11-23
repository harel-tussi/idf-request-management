import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Dropdown, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

function Header(props) {
  const [activeItem, setActiveItem] = useState("home");
  const handleItemClick = (e, { name }) => setActiveItem(name);

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
          <Button primary>Sign Out</Button>
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

export default connect(mapStateToProps)(Header);
