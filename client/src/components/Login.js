import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";
import { connect } from "react-redux";
import { SIGNIN } from "../actions/authActions";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
      type: "soldier",
      error: ""
    };
  }

  handleOnChange = (e, { name, value }) => {
    if (name === "soldier" || name === "commander") {
      this.setState({ type: value });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleOnSubmit = e => {
    const { id, password, type } = this.state;
    e.preventDefault();
    axios
      .post("/auth/login", { id, password, type })
      .then(({ data }) => {
        localStorage.setItem("token", data);
        const user = jwtDecode(data);
        this.props.signin({ ...user, type });
        this.props.history.push("/");
      })
      .catch(({ response: { data } }) => {
        this.setState({ error: data });
      });
  };

  render() {
    const { id, password, type } = this.state;
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log-in to your account
          </Header>
          <Form onSubmit={this.handleOnSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="ID"
                name="id"
                value={id}
                onChange={this.handleOnChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                name="password"
                type="password"
                value={password}
                onChange={this.handleOnChange}
              />
              <Form.Group inline>
                <label>Type</label>
                <Form.Radio
                  label="Soldier"
                  value="soldier"
                  checked={type === "soldier"}
                  name="soldier"
                  onChange={this.handleOnChange}
                />
                <Form.Radio
                  label="Commadner"
                  value="commander"
                  checked={type === "commander"}
                  name="commander"
                  onChange={this.handleOnChange}
                />
              </Form.Group>
              <Button type="submit" color="teal" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
          {this.state.error && <Message error>{this.state.error}</Message>}
          <Message>
            New to us? <Link to="/register">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
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
    signin: data => dispatch(SIGNIN(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
