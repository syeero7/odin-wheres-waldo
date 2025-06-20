export const corsOptions = {
  methods: ["GET", "POST"],
  origin: (origin, callback) => {
    console.log("Request Origin:", origin);
    const { NODE_ENV, ALLOWED_ORIGIN } = process.env;

    if (!origin && (NODE_ENV === "development" || NODE_ENV === "test")) {
      console.warn(
        "Allowing requests without an origin in development or testing environments"
      );

      callback(null, true);
      return;
    }

    if (ALLOWED_ORIGIN === origin) {
      callback(null, true);
      return;
    }

    console.warn(`Blocked request from origin: ${origin}`);
    callback(new Error("Not allowed by CORS"));
  },
};
