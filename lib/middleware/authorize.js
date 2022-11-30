module.exports = async (req, res, next) => {
  try {
    if (!res.user || req.user.email !== 'admin')
      throw new Error('you cant view this!');
    next();
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
