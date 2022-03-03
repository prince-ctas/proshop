import Jwt from "jsonwebtoken";

const generateToken = (id) => {
  return Jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30D",
  });
};

export default generateToken;
