import React from "react";
import { Icon, Label, Table, Button } from "semantic-ui-react";
import moment from "moment";

export default function Request({
  request: {
    _id,
    content,
    startDate,
    endDate,
    type,
    status,
    handleChooseRequest,
    submissionDate,
    commanderNote
  }
}) {
  return (
    <Table.Row>
      <Table.Cell>
        <Label ribbon>{content}</Label>
      </Table.Cell>
      <Table.Cell>{moment(startDate).format("DD/MM/YYYY")}</Table.Cell>
      <Table.Cell>{moment(endDate).format("DD/MM/YYYY")}</Table.Cell>
      <Table.Cell>
        {type === "soldier" ? (
          status === 1 ? (
            <Icon name="question" />
          ) : status === 2 ? (
            <Icon name="checkmark" />
          ) : (
            <Icon name="x" />
          )
        ) : (
          <Button onClick={() => handleChooseRequest(_id)}>
            Approve or Decline
          </Button>
        )}
      </Table.Cell>
      <Table.Cell>{moment(submissionDate).format("DD/MM/YYYY")}</Table.Cell>
      {type === "soldier" && <Table.Cell>{commanderNote}</Table.Cell>}
    </Table.Row>
  );
}
