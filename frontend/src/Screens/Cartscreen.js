import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, FormSelect } from "react-bootstrap";
import { addToCart, removefromCart } from "../actions/CartAction";
import Button from "@restart/ui/esm/Button";
import Message from "../Components/Message";

const Cartscreen = () => {
  let params = useParams();
  let navigate = useNavigate();
  let location = useLocation();
  const productId = params.id;
  const qty = location.search ? location.search.split("=")[1] : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFormCartHandler = (id) => {
    dispatch(removefromCart(id));
  };

  const checkouthandler = () => {
    navigate(`/login/?redirect=/shipping`);
  };
  return (
    <Row>
      <Col md={8}>
        <h1>CART</h1>
        {cartItems.length === 0 ? (
          <Message>
            <h4>
              Your cart is empty <Link to="/">Go Back</Link>
            </h4>
          </Message>
        ) : (
          <ListGroup variant="flush">
            <Row>
              <Col>
                <Link className="btn btn-dark my-3" to="/">
                  GO BACK TO HOME
                </Link>
              </Col>
            </Row>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid />
                  </Col>
                  <Col md={3}>
                    <Link
                      style={{ color: "black", textDecoration: "none" }}
                      to={`/product/${item.product}`}
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <FormSelect
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </FormSelect>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="submit"
                      variant="light"
                      style={{ border: "none", background: "transparent" }}
                      onClick={() => removeFormCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotals (
                {cartItems.reduce((acc, item) => acc + parseInt(item.qty), 0)})
                item
              </h2>
              $
              {cartItems
                .reduce(
                  (acc, item) =>
                    acc + parseInt(item.qty) * parseInt(item.price),
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item className="d-grid gap-2">
              <Button
                type="button"
                disabled={cartItems.length === 0}
                className="btn btn-dark  "
                onClick={checkouthandler}
              >
                Process check out
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default Cartscreen;
