const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (email, res) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
        expiresIn: '5d'
    });

    res.cookie('jwt', token, {
        maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days in milliseconds
        httpOnly: true,
        sameSite: 'none', // Set SameSite attribute to 'none' for cross-origin requests
        secure: true // Set Secure flag to ensure cookie is only sent over HTTPS
    });
  
};

module.exports = {
    generateTokenAndSetCookie
};
