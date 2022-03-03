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
import { register } from "../actions/UserAction.js";

const Registersceen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  let location = useLocation();
  let navigate = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not Match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <FormContainer>
      <h1>REGISTER</h1>
      {message && (
        <Message variant="danger">
          <h3>{message}</h3>
        </Message>
      )}
      {error && (
        <Message variant="danger">
          <h3>{error}</h3>
        </Message>
      )}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <FormGroup controlId="name">
          <FormLabel>Name </FormLabel>
          <FormControl
            type="name"
            value={name}
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
            onBlur={(e) => {
              setName(
                e.target.value[0].toUpperCase() +
                  e.target.value.slice(1).toLowerCase()
              );
            }}
            on
            autoComplete="off"
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="email" className="py-3">
          <FormLabel>Email address</FormLabel>
          <FormControl
            type="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password </FormLabel>
          <FormControl
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="confirmPassword" className="py-3">
          <FormLabel>confirmPassword </FormLabel>
          <FormControl
            type="password"
            value={confirmPassword}
            placeholder="Enter confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button type="submit" className="btn btn-dark">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have An Account?
          <Link
            to={redirect !== "/" ? `/login?redirect=${redirect}` : "/login"}
          >
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Registersceen;
