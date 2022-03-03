import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  FormLabel,
  FormGroup,
  FormControl,
  Table,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Button from "@restart/ui/esm/Button";

import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { getUserDetails, updateUserProfile } from "../actions/UserAction";
import { listMyOrder } from "../actions/OrderAction";

const Profilescreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  let navigate = useNavigate();

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loadingError, error: errorOrders, orders } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (user === {} || !user || !user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrder());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, dispatch, navigate, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not Match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h1>PROFILE</h1>
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
        {success && <Message variant="success">Profile Update</Message>}
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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>MY ORDER</h2>{" "}
        {loadingError ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">
            <h3>{errorOrders}</h3>
          </Message>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>SR</th>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDeliverd ? (
                      order.deliverdAt
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <button className="btn btn-dark btn-sm">Details</button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default Profilescreen;
