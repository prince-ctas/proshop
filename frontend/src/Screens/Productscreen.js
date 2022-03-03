import React, { useState, useEffect } from "react";
import Rating from "../Components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Magnifier from "react-magnifier";
import { Row, Col, ListGroup, Card, FormSelect } from "react-bootstrap";
import { listProductsDetails } from "../actions/ProductAction";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const Productscreen = () => {
  const [qty, setQty] = useState(1);
  let params = useParams();
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const productdetails = useSelector((state) => state.productdetails);
  const { loading, error, product } = productdetails;

  useEffect(() => {
    dispatch(listProductsDetails(params.id));
  }, [dispatch, params.id]);

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        GO BACK TO HOME
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>
          <h3>{error}</h3>
        </Message>
      ) : (
        <Row>
          <Col md={6}>
            <Magnifier
              src={product.image}
              width={500}
              fluid="true"
              mgShape="circle"
              mgShowOverflow={false}
            />
            {/* <Image src={product.image} alt={product.name} fluid /> */}
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price:${product.price}</ListGroup.Item>
              <ListGroup.Item>Description:{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <span>${product.price}</span>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In a stock" : "Out of stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty:</Col>
                      <Col>
                        <FormSelect
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormSelect>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item className="d-grid gap-2">
                  <button
                    onClick={addToCartHandler}
                    className="btn btn-dark"
                    type="submit"
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Productscreen;
