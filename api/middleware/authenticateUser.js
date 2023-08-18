import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid token" });
  }
};

