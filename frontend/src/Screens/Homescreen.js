import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../Components/Product";
import { listProducts } from "../actions/ProductAction";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const Homescreen = () => {
  const dispatch = useDispatch();

  const productlist = useSelector((state) => state.productlist);
  const { loading, error, products } = productlist;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>LATEST PRODUCTS</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>
          <h3>{error}</h3>
        </Message>
      ) : (
        <Row>
          {products.map((product, id) => (
            <Col key={id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Homescreen;
