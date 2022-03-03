import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormLabel, FormGroup, FormControl } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import FormContainer from "../Components/FormContainer";
import Loader from "../Components/Loader";
import { useParams } from "react-router-dom";
import Message from "../Components/Message";
import { getUserDetails, updateUser } from "../actions/UserAction.js";
import { USER_UPDATE_RESET } from "../constant/UserConstant";

const UserEditscreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  let navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, users } = userDetails;
  console.log("users: ", users);

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate(`/admin/userlist`);
    } else {
      if (!users.name || users._id !== params.id) {
        dispatch(getUserDetails(params.id));
      } else {
        setName(users.name);
        setEmail(users.email);
        setIsAdmin(users.isAdmin);
      }
    }
  }, [dispatch, navigate, params.id, users, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: params.id, name, email, isAdmin }));
  };
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-dark my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>EDIT USER</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && (
          <Message variant="danger">
            <h3>{errorUpdate}</h3>
          </Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            <h3>{error}</h3>
          </Message>
        ) : (
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
            <FormGroup controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </FormGroup>

            <Button type="submit" className="btn btn-dark my-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};
export default UserEditscreen;
