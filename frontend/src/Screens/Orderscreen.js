import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import { useParams } from "react-router-dom";
import { Col, ListGroup, Row, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { getOrderDetails } from "../actions/OrderAction";

const Orderscreen = () => {
  const dispatch = useDispatch();
  let params = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  if (!loading) {
    const adddecimal = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    //   price calculation
    order.itemsPrice = adddecimal(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    dispatch(getOrderDetails(params.id));
  }, [dispatch, params.id]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error} </Message>
  ) : (
    <>
      <h1>Order- {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>SHIPPING</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingaddress.address} , {order.shippingaddress.city} ,
                {order.shippingaddress.postalcode} ,{" "}
                {order.shippingaddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered On {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">
                  Not DeliveredPaid {order.deliveredAt}
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>PAYMENT</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid On {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid {order.paidAt}</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>ORDER ITEMS</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your Cart Is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item) => (
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

                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Charge</Col>

                  <Col>{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>

                  <Col>{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>

                  <Col>{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <PayPalButton />
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Orderscreen;
