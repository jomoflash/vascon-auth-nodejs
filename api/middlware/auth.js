const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({err: 'Unauthorized Access'});

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) return res.status(403).json(err);
        req.user = user;
        next();
    });
    
}

const generateAuthToken = (user) => {
    const payload = {id: user.id};
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
    return token;
}


module.exports = {
    authenticateToken,
    generateAuthToken
}