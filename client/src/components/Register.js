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
      options: [],
      type: "soldier"
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
    const {
      id,
      password,
      firstName,
      lastName,
      personalCommander,
      type
    } = this.state;
    e.preventDefault();
    if (type === "soldier") {
      const user = {
        id,
        password,
        firstName,
        lastName,
        personalCommander,
        type: "soldier"
      };
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
    } else {
      const user = { id, password, firstName, lastName, type: "commander" };
      axios
        .post("/commander/addcommander", {
          id,
          password,
          firstName,
          lastName
        })
        .then(({ data }) => {
          localStorage.setItem("token", data);
          this.props.signin(user);
          this.props.history.push("/");
        })
        .catch(({ response: { data } }) => {
          this.setState({ error: data });
        });
    }
  };

  render() {
    const {
      id,
      password,
      firstName,
      lastName,
      options,
      personalCommander,
      type
    } = this.state;
    return (
      <Grid
        textAlign="center"
        style={{ height: "80vh" }}
        verticalAlign="middle"
        divided
        columns={2}
      >
        <Grid.Column style={{ maxWidth: "450px" }}>
          <Header as="h2" color="blue">
            Your Requests Manager
          </Header>
        </Grid.Column>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Create New Account
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
                required={true}
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
                required={true}
              />
              <Form.Input
                fluid
                placeholder="First Name"
                name="firstName"
                type="text"
                value={firstName}
                onChange={this.handleOnChange}
                required={true}
              />
              <Form.Input
                fluid
                placeholder="Last Name"
                name="lastName"
                type="text"
                value={lastName}
                onChange={this.handleOnChange}
                required={true}
              />
              <Form.Group inline>
                <label>Type</label>
                <Form.Radio
                  label="Soldier"
                  value="soldier"
                  checked={this.state.type === "soldier"}
                  name="soldier"
                  onChange={this.handleOnChange}
                />
                <Form.Radio
                  label="Commadner"
                  value="commander"
                  checked={this.state.type === "commander"}
                  name="commander"
                  onChange={this.handleOnChange}
                />
              </Form.Group>
              <Form.Field required={true}>
                {this.state.type === "soldier" && (
                  <Select
                    req
                    name="personalCommander"
                    onChange={this.handleOnChange}
                    placeholder="Choose your commander"
                    options={options}
                    value={personalCommander}
                  />
                )}
              </Form.Field>
              <Button type="submit" color="red" fluid size="large">
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
