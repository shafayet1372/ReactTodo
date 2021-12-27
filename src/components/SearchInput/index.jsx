import React from "react";
import { Form } from "react-bootstrap";
import { useRef, useEffect, useState } from "react";
export default function Index({ searchHandle, value }) {
  const ref = useRef();
  useEffect(() => {
    ref.current.focus();
  });
  return (
    <div>
      <Form>
        <Form.Control
          ref={ref}
          type="text"
          placeholder="search Here"
          value={value}
          onChange={searchHandle}
        />
      </Form>
    </div>
  );
}
