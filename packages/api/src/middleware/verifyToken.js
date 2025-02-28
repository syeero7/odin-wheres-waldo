import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);

  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.SECRET, (error, payload) => {
    if (error) return res.sendStatus(403);

    req.jwtPayload = payload;
    next();
  });
};
