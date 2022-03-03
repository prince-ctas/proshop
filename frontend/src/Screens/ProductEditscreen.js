import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormLabel, FormGroup, FormControl } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import FormContainer from "../Components/FormContainer";
import Loader from "../Components/Loader";
import { useParams } from "react-router-dom";
import Message from "../Components/Message";
import { listProductsDetails, updateProducts } from "../actions/ProductAction";
import { PRODUCT_UPDATE_RESET } from "../constant/productConstants";

const ProductEditscreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  let navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();

  const productdetails = useSelector((state) => state.productdetails);
  const { loading, error, product } = productdetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== params.id) {
        dispatch(listProductsDetails(params.id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, navigate, params.id, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(`/api/upload`, formData, config);

      setImage(data);

      setUploading(false);
    } catch (error) {
      console.log("error");
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProducts({
        _id: params.id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };
  return (
    <>
      <Link to="/admin/productlist" className="btn btn-dark my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>EDIT PRODUCT</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && (
          <Message variant="danger">
            <h3>{errorUpdate}</h3>
          </Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            <h3>{error}</h3>
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="name">
              <FormLabel>Name </FormLabel>
              <FormControl
                type="name"
                value={name}
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
                onBlur={(e) => {
                  setName(
                    e.target.value[0].toUpperCase() +
                      e.target.value.slice(1).toLowerCase()
                  );
                }}
                on
                autoComplete="off"
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="price" className="py-3">
              <FormLabel>Price </FormLabel>
              <FormControl
                type="price"
                value={price}
                placeholder="Enter price"
                onChange={(e) => setPrice(e.target.value)}
                autoComplete="off"
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="image">
              <FormLabel>Image </FormLabel>
              <FormControl
                type="text"
                value={image}
                placeholder="Enter image"
                onChange={(e) => setImage(e.target.value)}
              ></FormControl>
              <FormControl
                type="file"
                required
                name="file"
                onChange={uploadFileHandler}
              ></FormControl>
              {uploading && <Loader />}
            </FormGroup>
            <FormGroup controlId="brand" className="py-3">
              <FormLabel>Brand </FormLabel>
              <FormControl
                type="brand"
                value={brand}
                placeholder="Enter brand"
                onChange={(e) => setBrand(e.target.value)}
                autoComplete="off"
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="category">
              <FormLabel>Category </FormLabel>
              <FormControl
                type="category"
                value={category}
                placeholder="Enter category"
                onChange={(e) => setCategory(e.target.value)}
                autoComplete="off"
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="countInStock" className="py-3">
              <FormLabel>countInStock </FormLabel>
              <FormControl
                type="countInStock"
                value={countInStock}
                placeholder="Enter countInStoke"
                onChange={(e) => setCountInStock(e.target.value)}
                autoComplete="off"
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="description">
              <FormLabel>Description </FormLabel>
              <FormControl
                type="description"
                value={description}
                placeholder="Enter description"
                onChange={(e) => setDescription(e.target.value)}
                autoComplete="off"
              ></FormControl>
            </FormGroup>

            <Button type="submit" className="btn btn-dark my-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};
export default ProductEditscreen;
