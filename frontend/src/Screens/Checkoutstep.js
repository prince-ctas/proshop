import React from "react";
import { Nav, NavItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutStep = ({ step1, step2, step3, step4 }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Nav className="justify-content-center">
      {!userInfo && (
        <NavItem className="justify-content-center">
          {step1 ? (
            <LinkContainer
              style={{ color: "red", fontWeight: "bold" }}
              to="/login"
            >
              <Nav.Link>SIGN IN</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link style={{ color: "green", fontWeight: "bold" }} disabled>
              SIGN IN
            </Nav.Link>
          )}
        </NavItem>
      )}
      <NavItem>
        {step2 ? (
          <LinkContainer
            style={{ color: "green", fontWeight: "bold" }}
            to="/shipping"
          >
            <Nav.Link>SHIPPING</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link style={{ color: "red", fontWeight: "bold" }} disabled>
            SHIPPING
          </Nav.Link>
        )}
      </NavItem>
      <NavItem>
        {step3 ? (
          <LinkContainer
            style={{ color: "green", fontWeight: "bold" }}
            to="/payment"
          >
            <Nav.Link>PAYMENT</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link style={{ color: "red", fontWeight: "bold" }} disabled>
            PAYMENT
          </Nav.Link>
        )}
      </NavItem>
      <NavItem>
        {step4 ? (
          <LinkContainer
            style={{ color: "green", fontWeight: "bold" }}
            to="/placeorder"
          >
            <Nav.Link>PLACE ORDER</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link style={{ color: "red", fontWeight: "bold" }} disabled>
            PLACE ORDER
          </Nav.Link>
        )}
      </NavItem>
    </Nav>
  );
};

export default CheckoutStep;
