import React, { Component } from "react";
import { Button, Form, Container, Grid } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import axios from "axios";
class AddRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      startDate: new Date(),
      endDate: null
    };
  }

  handleDateChange = (date, name) => {
    this.setState({ [name]: date });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { content, startDate, endDate } = this.state;
    const { id: soldier, personalCommander: commander } = this.props.user;
    axios
      .post(
        "/request/addrequest",
        {
          content,
          startDate,
          endDate,
          soldier,
          commander
        },
        { headers: { authorization: this.props.token } }
      )
      .then(({ data }) => {
        this.props.history.push("/");
      })
      .catch(({ response: { data } }) => {
        this.setState({ error: data });
      });
  };

  render() {
    return (
      <Container textAlign="center" style={{ width: "350px" }}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Reason</label>
            <input
              required
              value={this.state.content}
              name="content"
              onChange={this.handleChange}
              placeholder="Reason"
            />
          </Form.Field>
          <Form.Field>
            <label>Start Date</label>
            <DatePicker
              required
              minDate={new Date()}
              selected={this.state.startDate}
              onChange={date => this.handleDateChange(date, "startDate")}
            />
          </Form.Field>
          <Form.Field>
            <label>End Date</label>
            <DatePicker
              required
              minDate={this.state.startDate}
              selected={this.state.endDate}
              onChange={date => this.handleDateChange(date, "endDate")}
            />
          </Form.Field>
          <Button type="submit">Add Request</Button>
        </Form>
        {this.state.error && <p>{this.state.error}</p>}
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    ...ownProps
  };
};

export default connect(mapStateToProps)(AddRequest);
