import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

export default function index({
  resetHandle,
  bulkSelectHandle,
  bulkRemoveHandle,
  selectedMode,
}) {
  return (
    <DropdownButton variant="warning" title="Action">
      <Dropdown.Item onClick={resetHandle}>Reset</Dropdown.Item>

      <Dropdown.Item onClick={bulkSelectHandle}>
        {selectedMode ? "Bulk Unslect" : "Bulk Select"}
      </Dropdown.Item>
      <Dropdown.Item onClick={bulkRemoveHandle}>Bulk remove</Dropdown.Item>
    </DropdownButton>
  );
}
