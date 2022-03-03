import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  FormLabel,
  FormGroup,
  FormControl,
} from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import FormContainer from "../Components/FormContainer";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { login } from "../actions/UserAction.js";

const Loginscreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let location = useLocation();
  let navigate = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>SIGN IN</h1>
      {error && (
        <Message variant="danger">
          <h3>{error}</h3>
        </Message>
      )}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="email">
          <FormLabel>Email address</FormLabel>
          <FormControl
            type="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="password" className="py-3">
          <FormLabel>Password address</FormLabel>
          <FormControl
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button type="submit" className="btn btn-dark">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?
          <Link
            to={
              redirect !== "/" ? `/register?redirect=${redirect}` : "/register"
            }
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Loginscreen;
