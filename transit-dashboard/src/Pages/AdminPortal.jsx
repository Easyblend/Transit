import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AdminPortal = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <div className="mx-auto mt-5">
      <div className="text-center">
        {" "}
        <h1 className=" text-primary">Login as Admin</h1>
        <p>Log in if you have administration rights</p>
      </div>

      <Form className=" mt-5 mx-auto d-flex flex-column gap-4 col-10 col-sm-6">
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Email.."
            className="py-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="password..."
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-3"
          />
        </Form.Group>

        <Button type="submit">Log in</Button>
      </Form>
    </div>
  );
};

export default AdminPortal;
