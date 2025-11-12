module.exports = (roles = []) => {
  return (req, res, next) => {
    if (!roles.length) return next();

    const userRole = req.user?.role;
    if (!roles.includes(userRole)) {
      return res.status(403).json({ success: false, error: 'Permiso denegado' });
    }
    next();
  };
};
