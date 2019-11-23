import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Select
} from "semantic-ui-react";
import { connect } from "react-redux";
import { SIGNIN } from "../actions/authActions";
import { Link } from "react-router-dom";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
      error: "",
      firstName: "",
      lastName: "",
      personalCommander: "",
      options: []
    };
  }

  componentDidMount() {
    axios
      .get("/commander/getallcommanders")
      .then(({ data }) => {
        const mappedData = data.map(({ id, firstName, lastName }) => {
          return { key: id, value: id, text: firstName + " " + lastName };
        });
        this.setState({ options: mappedData });
      })
      .catch(err => {
        this.setState({ error: "Could not fetch commanders list" });
      });
  }

  handleOnChange = (e, { name, value }) => {
    if (name === "soldier" || name === "commander") {
      this.setState({ type: value });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleOnSubmit = e => {
    const { id, password, firstName, lastName, personalCommander } = this.state;
    e.preventDefault();
    const user = { id, password, firstName, lastName, personalCommander };
    axios
      .post("/soldier/addsoldier", {
        id,
        password,
        firstName,
        lastName,
        personalCommander
      })
      .then(({ data }) => {
        localStorage.setItem("token", data);
        this.props.signin(user);
        this.props.history.push("/");
      })
      .catch(({ response: { data } }) => {
        this.setState({ error: data });
      });
  };

  render() {
    const {
      id,
      password,
      firstName,
      lastName,
      options,
      personalCommander
    } = this.state;
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Soldier! Create New Account
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
              <Form.Input
                fluid
                placeholder="First Name"
                name="firstName"
                type="text"
                value={firstName}
                onChange={this.handleOnChange}
              />
              <Form.Input
                fluid
                placeholder="Last Name"
                name="lastName"
                type="text"
                value={lastName}
                onChange={this.handleOnChange}
              />
              <Form.Field>
                <Select
                  name="personalCommander"
                  onChange={this.handleOnChange}
                  placeholder="Choose your commander"
                  options={options}
                  value={personalCommander}
                />
              </Form.Field>
              <Button type="submit" color="teal" fluid size="large">
                Register
              </Button>
            </Segment>
          </Form>
          {this.state.error && <Message error>{this.state.error}</Message>}
          <Message>
            Already Have An Account? <Link to="/login">Login</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
