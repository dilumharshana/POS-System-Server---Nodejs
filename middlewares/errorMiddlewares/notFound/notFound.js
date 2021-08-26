const notFound = (req, res, next) => {
  const err = new Error(`unable to find ${req.originalUrl}`);
  res.status(404);
  next(err);
};

module.exports = notFound;
