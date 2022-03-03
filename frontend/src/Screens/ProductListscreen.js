import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { Col, Row, Table } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import {
  createProducts,
  deleteProducts,
  listProducts,
} from "../actions/ProductAction";
import { PRODUCT_CREATE_RESET } from "../constant/productConstants";

const ProductListscreen = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const productlist = useSelector((state) => state.productlist);
  const { loading, error, products } = productlist;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createProduct,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/product/${createProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    createProduct,
    successDelete,
    successCreate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProducts(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProducts());
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <Button className="btn btn-dark my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && (
        <Message variant="danger">
          <h3>{errorDelete}</h3>
        </Message>
      )}
      {loadingCreate && <Loader />}
      {errorCreate && (
        <Message variant="danger">
          <h3>{errorCreate}</h3>
        </Message>
      )}
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
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
            </tr>
          </thead>
          <tbody>
            {products.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order._id}</td>
                <td>{order.name}</td>
                <td>{order.price}</td>
                <td>{order.category}</td>
                <td>{order.brand}</td>

                <td>
                  <LinkContainer to={`/admin/product/${order._id}/edit`}>
                    <button className="btn btn-info btn-sm">
                      <i className="fas fa-edit"></i>
                    </button>
                  </LinkContainer>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    // variant="danger"
                    onClick={() => deleteHandler(order._id)}
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

export default ProductListscreen;
