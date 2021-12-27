import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

export default function ({ filterByModeHandler }) {
  return (
    <DropdownButton variant="secondary" title="Filter">
      <Dropdown.Item onClick={() => filterByModeHandler("all")}>
        All
      </Dropdown.Item>
      <Dropdown.Item onClick={() => filterByModeHandler("completed")}>
        Completed
      </Dropdown.Item>
      <Dropdown.Item onClick={() => filterByModeHandler("running")}>
        Running
      </Dropdown.Item>
      <Dropdown.Item onClick={() => filterByModeHandler("important")}>
        Important
      </Dropdown.Item>
    </DropdownButton>
  );
}
