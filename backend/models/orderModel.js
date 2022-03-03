import Mongoose from "mongoose";

const orderSchema = Mongoose.Schema(
  {
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "userdata",
    },
    orderItems: [
      {
        name: { type: String, require: true },
        qty: { type: Number, require: true },
        image: { type: String, require: true },
        price: { type: Number, require: true },
        product: {
          type: Mongoose.Schema.Types.ObjectId,
          require: true,
          ref: "product",
        },
      },
    ],
    shippingaddress: {
      address: { type: String, require: true },
      city: { type: String, require: true },
      postalcode: { type: Number, require: true },
      country: { type: String, require: true },
    },
    paymentMethod: {
      type: String,
      require: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    category: {
      type: String,
      require: true,
    },
    taxPrice: {
      type: String,
      require: true,
      default: 0.0,
    },
    shippingPrice: {
      type: String,
      require: true,
      default: 0.0,
    },
    totalPrice: {
      type: String,
      require: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      require: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      require: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const order = Mongoose.model("orderdata", orderSchema);

export default order;
