import React, { Component } from "react";
import { Icon, Label, Table, Container, Header } from "semantic-ui-react";
import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: []
    };
  }

  componentDidMount() {
    axios
      .get(`/request/${this.props.user.id}/${this.props.user.type}`)
      .then(({ data }) => {
        this.setState({ requests: data });
      })
      .catch(({ response: { data } }) => {
        this.setState({ error: data });
      });
  }

  render() {
    return (
      <Container>
        <Header as="h1">Your Requests</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Reason</Table.HeaderCell>
              <Table.HeaderCell>Start Date</Table.HeaderCell>
              <Table.HeaderCell>End Date</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Submission Date</Table.HeaderCell>
              <Table.HeaderCell>Commander Note</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.requests &&
              this.state.requests.map(
                ({
                  _id,
                  content,
                  startDate,
                  endDate,
                  status,
                  submissionDate,
                  commanderNote
                }) => {
                  return (
                    <Table.Row key={_id}>
                      <Table.Cell>
                        <Label ribbon>{content}</Label>
                      </Table.Cell>
                      <Table.Cell>
                        {moment(startDate).format("DD/MM/YYYY")}
                      </Table.Cell>
                      <Table.Cell>
                        {moment(endDate).format("DD/MM/YYYY")}
                      </Table.Cell>
                      <Table.Cell>
                        {status === 1 ? (
                          <Icon name="question" />
                        ) : status === 2 ? (
                          <Icon name="checkmark" />
                        ) : (
                          <Icon name="x" />
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        {moment(submissionDate).format("DD/MM/YYYY")}
                      </Table.Cell>
                      <Table.Cell>{commanderNote}</Table.Cell>
                    </Table.Row>
                  );
                }
              )}
          </Table.Body>
        </Table>
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

export default connect(mapStateToProps)(Dashboard);
