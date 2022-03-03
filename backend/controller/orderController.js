import asynchandler from "express-async-handler";
import order from "../models/orderModel.js";

// create new order
// post request /api/orders

const addOrdersItems = asynchandler(async (req, res) => {
  const {
    orderItems,
    shippingaddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw Error("No Oreder Item");
  } else {
    const orders = new order({
      orderItems,
      user: req.user._id,
      shippingaddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await orders.save();
    res.status(201).json(createOrder);
  }
});

// get request /api/orders/:id

const getOrderById = asynchandler(async (req, res) => {
  const orders = await order
    .findById(req.params.id)
    .populate("user", "name email");

  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw Error(" Oreder Not Found");
  }
});

// put request /api/orders/:id
const updateOrderToPaid = asynchandler(async (req, res) => {
  const orders = await order.findById(req.params.id);

  if (orders) {
    orders.isPaid = true;
    orders.paidAt = Date.now();
    orders.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body,
      update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await orders.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw Error(" Oreder Not Found");
  }
});

// get login user order
// get request /api/orders/myOrders

const getMyOrders = asynchandler(async (req, res) => {
  const orders = await order.find({ user: req.user._id });
  res.json(orders);
});

export { addOrdersItems, getOrderById, updateOrderToPaid, getMyOrders };
