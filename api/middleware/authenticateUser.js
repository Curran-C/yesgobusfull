import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const token = req.headers?.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ message: "Bearer token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).send({ status: 401, message: "Invalid token" });
  }
};
