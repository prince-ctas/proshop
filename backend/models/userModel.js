import Mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = Mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      maxLength: [20, "name must be 20 or less"],
      minLength: [10, "name must be 10 or more"],
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const user = Mongoose.model("userdata", userSchema);

export default user;
