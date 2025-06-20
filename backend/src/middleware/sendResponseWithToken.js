import jwt from "jsonwebtoken";

const signToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET, (error, token) => {
      if (error) return reject(error);

      resolve(token);
    });
  });
};

export const sendResponseWithToken = async (
  res,
  next,
  payload = {},
  data = {}
) => {
  try {
    const token = await signToken(payload);
    res.json({ token, ...data });
  } catch (error) {
    next(error);
  }
};
