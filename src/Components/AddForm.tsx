import React, { Component } from "react";
import { Button, Form, Container } from "react-bootstrap";

export default class AddForm extends Component {
  render() {
    return (
      <Container>
        <Form id="insertForm" method="post">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First name"
              name="FirstName"
              style={{ marginBottom: "20px" }}
            />
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name"
              name="lastName"
              style={{ marginBottom: "20px" }}
            />
          </Form.Group>

          <Form.Group
            controlId="formBasicPassword"
            style={{ marginBottom: "20px" }}
          >
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" name="email" />
          </Form.Group>
          <Form.Group
            controlId="formBasicPassword"
            style={{ marginBottom: "20px" }}
          >
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Company name"
              name="company"
            />
          </Form.Group>
          <Form.Group
            controlId="formBasicPassword"
            style={{ marginBottom: "20px" }}
          >
            <Form.Label>Employee no.</Form.Label>
            <Form.Control
              type="employee "
              placeholder="Employee no."
              name="employee"
            />
          </Form.Group>
          {/* <Form.Group controlId="formBasicChecbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
          <Button variant="primary">Submit</Button>
        </Form>
      </Container>
    );
  }
}
