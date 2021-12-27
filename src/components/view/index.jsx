import React from "react";
import { Card, ProgressBar, Form } from "react-bootstrap";
import { MdDoneAll, MdRemoveDone } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { MdNotificationImportant } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
export default function index({
  data,
  toggleCompleted,
  deleteHandle,
  selectToggle,
  importantToggle,
  toggleEdit,
}) {
  return (
    <Card
      text="white"
      style={{
        width: "14rem",
        margin: "5px auto",
        padding: "0px",
        backgroundColor: "white",
        boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
      }}
    >
      <Card.Header className="text-end d-flex justify-content-between">
        <div className="div">
          <Form.Check
            type="switch"
            id="custom-switch"
            onChange={() => selectToggle(data.id)}
            checked={data.isSelected}
          />
        </div>
        <div>
          <i
            style={
              data.isImportant
                ? { fontSize: "20px", color: "orange", cursor: "pointer" }
                : { fontSize: "20px", color: "green", cursor: "pointer" }
            }
          >
            <MdNotificationImportant onClick={() => importantToggle(data.id)} />
          </i>
          <i
            style={{
              fontSize: "20px",
              color: "tomato",
              cursor: "pointer",
              marginLeft: "4px",
            }}
            onClick={() => toggleEdit(data)}
          >
            <AiFillEdit />
          </i>
          <i
            style={{
              fontSize: "20px",
              color: "red",
              cursor: "pointer",
              marginLeft: "4px",
            }}
            onClick={() => deleteHandle(data.id)}
          >
            <AiFillDelete />
          </i>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <strong style={{ color: "black" }}>{data.title.toUpperCase()}</strong>
        </Card.Title>

        <small>
          <ProgressBar variant="success" now={data.isCompleted ? 100 : 0} />{" "}
          {!data.isCompleted ? (
            <i style={{ fontSize: "20px", color: "green", cursor: "pointer" }}>
              <MdDoneAll onClick={() => toggleCompleted(data.id)} />
            </i>
          ) : (
            <i style={{ fontSize: "20px", color: "green", cursor: "pointer" }}>
              <MdRemoveDone onClick={() => toggleCompleted(data.id)} />
            </i>
          )}
        </small>
      </Card.Body>
    </Card>
  );
}
