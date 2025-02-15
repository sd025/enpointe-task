export const tokenStore = {}; 

export const authMiddleware = {
  verifyToken: (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token || !tokenStore[token]) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = tokenStore[token];
    next();
  }
};
