import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ success: false, errMsg: 'unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRETE);

    req.user = {
      userId: payload.userId,
      firstName: payload.firstName,
      lastName: payload.lastName,
    };
    next();
  } catch (error) {
    res.status(401).json({ success: false, errMsg: 'Auth Failed' });
  }
};
