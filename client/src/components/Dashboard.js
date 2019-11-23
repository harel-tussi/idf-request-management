import React, { PureComponent } from "react";
import {
  Icon,
  Label,
  Table,
  Container,
  Header,
  Button,
  Modal,
  Input
} from "semantic-ui-react";
import axios from "axios";
import Request from "./Request";
import { connect } from "react-redux";
class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      modalVisible: false,
      chosenRequest: "",
      commanderNote: ""
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

  handleChooseRequest = _id => {
    this.setState({ modalVisible: true, chosenRequest: _id });
  };

  handleCloseModal = () => {
    this.setState({ modalVisible: false });
  };

  handleApproveOrDecline = result => {
    if (this.state.commanderNote) {
      axios
        .put("/request/approveordecline", {
          _id: this.state.chosenRequest,
          result,
          commanderNote: this.state.commanderNote
        })
        .then(() => {
          const filteredRequests = this.state.requests.filter(
            request => request._id !== this.state.chosenRequest
          );
          this.setState({
            modalVisible: false,
            chosenRequest: "",
            requests: filteredRequests
          });
        })
        .catch(() => {
          this.setState({ error: "Oops something went wrong :(" });
        });
    } else {
      alert("You must fill the field!");
    }
  };

  render() {
    const { type } = this.props.user;
    return (
      <div>
        <Modal
          open={this.state.modalVisible}
          onClose={this.handleCloseModal}
          basic
          size="small"
        >
          <Header icon="question" content="Approve Or Decline" />
          <Modal.Content>
            <p>
              Would you like to Approve or Decline this request ? Enter Your
              comment below
            </p>
            <Input
              name="commanderNote"
              value={this.state.commanderNote}
              onChange={e => this.setState({ commanderNote: e.target.value })}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={() => this.handleApproveOrDecline(3)}
              basic
              color="red"
              inverted
            >
              <Icon name="remove" /> No
            </Button>
            <Button
              onClick={() => this.handleApproveOrDecline(2)}
              color="green"
              inverted
            >
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
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
                {type === "soldier" && (
                  <Table.HeaderCell>Commander Note</Table.HeaderCell>
                )}
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
                      <Request
                        key={_id}
                        request={{
                          _id,
                          content,
                          startDate,
                          endDate,
                          status,
                          submissionDate,
                          commanderNote,
                          handleChooseRequest: this.handleChooseRequest,
                          type: this.props.user.type
                        }}
                      />
                    );
                  }
                )}
            </Table.Body>
          </Table>
        </Container>
      </div>
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
