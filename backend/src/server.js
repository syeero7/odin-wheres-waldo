import express from "express";
import cors from "cors";
import router from "./game-routes.js";

const server = express();

const { NODE_ENV, ALLOWED_ORIGIN, PORT } = process.env;

server.use(
  cors({
    methods: ["GET", "POST"],
    origin: (origin, cb) => {
      if (NODE_ENV === "development" || NODE_ENV === "test") {
        cb(null, true);
        return;
      }

      if (ALLOWED_ORIGIN === origin) {
        cb(null, true);
        return;
      }

      cb(new Error("Not allowed by CORS"));
    },
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/game", router);

server.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: error.message || "Server error" });
});

server.listen(PORT, () => {
  console.log(`🚀 http://localhost:${PORT}`);
});
