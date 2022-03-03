import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Homescreen from "./Screens/Homescreen";
import Productscreen from "./Screens/Productscreen";
import Cartscreen from "./Screens/Cartscreen";
import Loginscreen from "./Screens/Loginscreen";
import Registersceen from "./Screens/Registersceen";
import Profilescreen from "./Screens/Profilescreen";
import Shippingscreen from "./Screens/Shippingscreen";
import Paymentscreen from "./Screens/Paymentscreen";
import PlaceOrderscreen from "./Screens/PlaceOrderscreen";
import Orderscreen from "./Screens/Orderscreen";
import UserListscreen from "./Screens/UserListscreen";
import UserEditscreen from "./Screens/UserEditscreen";
import ProductListscreen from "./Screens/ProductListscreen";
import ProductEditscreen from "./Screens/ProductEditscreen";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="order/:id" element={<Orderscreen />} />
              <Route path="shipping" element={<Shippingscreen />} />
              <Route path="payment" element={<Paymentscreen />} />
              <Route path="placeorder" element={<PlaceOrderscreen />} />
              <Route path="login" element={<Loginscreen />} />
              <Route path="register" element={<Registersceen />} />
              <Route path="profile" element={<Profilescreen />} />
              <Route path="product/:id" element={<Productscreen />} />
              <Route path="cart" element={<Cartscreen />}>
                <Route path=":id" element={<Cartscreen />} />
              </Route>
              <Route
                path="/admin/userlist"
                element={<UserListscreen />}
                exact
              />
              <Route
                path="/admin/userlist/:id/edit"
                element={<UserEditscreen />}
              />
              <Route
                path="/admin/product/:id/edit"
                element={<ProductEditscreen />}
              />
              <Route
                path="/admin/productlist"
                element={<ProductListscreen />}
              />
              <Route path="/" element={<Homescreen />} exact />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
