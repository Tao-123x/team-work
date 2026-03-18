export function notFoundHandler(req, res) {
  res.status(404).json({
    message: "Route not found"
  });
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    next(error);
    return;
  }

  const status = error.status || 500;

  res.status(status).json({
    message: error.message || "Internal server error"
  });
}
