import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, ListGroup, Row, Image, Card } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import CheckoutStep from "./Checkoutstep";
import Message from "../Components/Message";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/OrderAction";

const PlaceOrderscreen = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, error, order } = orderCreate;

  const adddecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  //   price calculation
  cart.itemsprice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  cart.shippingprice = cart.itemsprice > 100 ? 0 : 100;
  cart.taxprice = adddecimal(Number((0.18 * cart.itemsprice).toFixed(2)));
  cart.totalprice = (
    Number(cart.itemsprice) +
    Number(cart.shippingprice) +
    Number(cart.taxprice)
  ).toFixed(2);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [success, navigate]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingaddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: "$" + cart.itemsprice,
        taxPrice: "$" + cart.taxprice,
        shippingPrice: "$" + cart.shippingprice,
        totalPrice: "$" + cart.totalprice,
      })
    );
  };

  return (
    <>
      <CheckoutStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>
                  <Link className="btn btn-dark my-3" to="/shipping">
                    GO BACK TO SHIPPING
                  </Link>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>SHIPPING</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address} , {cart.shippingAddress.city} ,{" "}
                {cart.shippingAddress.postalcode} ,
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>PAYMENT</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>order Item</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart Is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>

                        <Col>
                          <Link
                            style={{ color: "black", textDecoration: "none" }}
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>ORDER SUMMARY</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>

                  <Col>${cart.itemsprice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Charge</Col>

                  <Col>${cart.shippingprice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>

                  <Col>${cart.taxprice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>

                  <Col>${cart.totalprice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item className="d-grid gap-2">
                <Button
                  className="btn btn-dark"
                  type="submit"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderscreen;
