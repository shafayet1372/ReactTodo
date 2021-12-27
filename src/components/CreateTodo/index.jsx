import React from "react";
import { Form, Button } from "react-bootstrap";
import { GoPlus } from "react-icons/go";
import { GrUpdate } from "react-icons/gr";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
export default function Index({
  getData,
  mode,
  isReset,
  editMode,
  placeholder,
  editedValue,
  updateHandle,
}) {
  const [title, setTitle] = useState("");

  const ref = useRef();
  useEffect(() => {
    ref.current.focus();
    if (isReset) {
      setTitle((p) => "");
    }
    if (editMode) {
      setTitle((p) => editedValue.title);
    } else {
      setTitle((p) => "");
    }
  }, [editedValue]);

  const submitHandle = (e) => {
    e.preventDefault();
    if (!editMode) {
      let data = {};
      data.id = uuidv4();
      data.title = title;
      data.isSelected = false;
      data.isCompleted = false;
      data.isImportant = false;
      getData(data);
      setTitle((p) => "");
    } else {
      updateHandle(editedValue.id, title);
    }
  };
  return (
    <Form className="d-flex">
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={title}
        onChange={(e) =>
          mode
            ? mode == "all" && setTitle((p) => e.target.value)
            : setTitle((p) => e.target.value)
        }
        ref={ref}
      />
      <Button
        disabled={editMode ? false : !title.length || mode != "all"}
        variant={!editMode ? "success" : "info"}
        type="create"
        style={{ marginLeft: "5px", color: "white" }}
        onClick={submitHandle}
      >
        {!editMode ? <GoPlus /> : <GrUpdate />}
      </Button>
    </Form>
  );
}
