import React from "react";
import { Form } from "react-bootstrap";

export default function index({ mode, toggleSearchMode, editMode }) {
  return (
    <Form>
      <Form.Check
        type="switch"
        id="custom-switch"
        label={!mode ? "Switch SearchMode" : "Switch CreateMode"}
        style={{ fontWeight: "bold" }}
        onChange={toggleSearchMode}
        disabled={editMode}
        checked={!mode ? false : true}
      />
    </Form>
  );
}
