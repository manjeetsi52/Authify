export const errorMw = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  // Zod validation errors (safe)
  if (Array.isArray(err.issues)) {
    return res.status(400).json({
      status: "fail",
      errors: err.issues.map(e => e.message),
    });
  }

  // Operational errors (safe to show)
  if (err.isOperational) {
    return res.status(statusCode).json({
      status,
      message: err.message,
    });
  }

  //  Programming / unknown errors (DO NOT LEAK)
  console.error("INTERNAL ERROR:", err);

  return res.status(500).json({
    status: "error",
    message: "Something went wrong. Please try again later.",
  });
};
