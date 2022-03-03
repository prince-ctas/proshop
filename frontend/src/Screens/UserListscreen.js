import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { deleteUser, listUser } from "../actions/UserAction";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const UserListscreen = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUser());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          <h3>{error}</h3>
        </Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>SR</th>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/admin/userlist/${user._id}/edit`}>
                    <button className="btn btn-info btn-sm">
                      <i className="fas fa-edit"></i>
                    </button>
                  </LinkContainer>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    // variant="danger"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListscreen;
