import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, FormLabel, FormGroup, FormControl } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import FormContainer from "../Components/FormContainer";
import { saveShippingAddress } from "../actions/CartAction";
import CheckoutStep from "./Checkoutstep";
import ReactFlagsSelect from "react-flags-select";

const Shippingscreen = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalcode, setPostalCode] = useState(shippingAddress.postalcode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalcode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutStep step1 step2 />
      <h1>SHIPPING</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="address">
          <FormLabel>Address </FormLabel>
          <FormControl
            type="address"
            value={address}
            placeholder="Enter address"
            onChange={(e) => setAddress(e.target.value)}
            autoComplete="off"
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="city" className="py-2">
          <FormLabel>City </FormLabel>
          <FormControl
            type="city"
            value={city}
            placeholder="Enter city"
            onChange={(e) => setCity(e.target.value)}
            autoComplete="off"
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="postalcode">
          <FormLabel>Postalcode </FormLabel>
          <FormControl
            type="number"
            value={postalcode}
            placeholder="Enter postalcode"
            onChange={(e) => setPostalCode(e.target.value)}
            autoComplete="off"
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="country" className="py-2">
          <FormLabel>Country </FormLabel>

          <ReactFlagsSelect
            selected={country}
            onSelect={(code) => setCountry(code)}
            searchable="true"
          />
        </FormGroup>

        <Button type="submit" className="btn btn-dark">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shippingscreen;
