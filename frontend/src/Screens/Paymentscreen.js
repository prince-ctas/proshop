import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Col } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import FormContainer from "../Components/FormContainer";
import { savePaymentMethod } from "../actions/CartAction";
import CheckoutStep from "./Checkoutstep";

const Paymentscreen = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    navigate("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("Paypal or CreditCard");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutStep step1 step2 step3 />
      <h1 className="py-2">PAYMENT METHOD</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label className="py-2" as="legend">
            Select Method
          </Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="Paypal"
              name="paymentmethod"
              value="Paypal or CreditCard"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Stripe"
              id="stripe"
              name="paymentmethod"
              value="Stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="py-2"
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" className="btn btn-dark py-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Paymentscreen;
