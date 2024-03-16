const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (email, res) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
        expiresIn: '5d'
    });

    res.cookie('jwt', token, {
        maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days in milliseconds
        httpOnly: true, 
    });
  
};

module.exports = {
    generateTokenAndSetCookie
};
