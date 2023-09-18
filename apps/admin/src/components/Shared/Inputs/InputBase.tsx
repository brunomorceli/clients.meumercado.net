import { Form } from "rsuite";
import React from "react";

export function InputBase(props: any) {
  const { name, label, accepter, style, message, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-3`} style={style || { width: "100%" }}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
      <Form.HelpText>{message}</Form.HelpText>
      <Form.ErrorMessage show={Boolean(props.error)}>
        {props.error}
      </Form.ErrorMessage>
    </Form.Group>
  );
}
