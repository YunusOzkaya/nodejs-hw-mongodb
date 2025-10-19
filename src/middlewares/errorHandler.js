module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  const message = status === 500 ? "Something went wrong" : err.message || "Error";
  const data = err.expose ? err.message : err.message || "Internal error";
  res.status(status).json({ status, message, data });
};
