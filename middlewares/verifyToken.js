const jwt = require('jsonwebtoken');

  // verify the token whether it is valid or not
const verifyToken = async (req, res, next) => {
    const {authorization} = req.body;
    
    try {
        const token = authorization.split(' ')[1];
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.decoded = decoded;
        next();
    }
    catch {
      // when we will give inside next('somthing')
      // express will consider it as an error
      // this error will goes to our custom error handler
       next('authorization error')
    }
}

module.exports = verifyToken;

// , (err, res) => {
//   if(err) {
//     return 'token expired'
//   }
//   return res;
// });
// if(decoded == 'token expired'){
//   return next('token has been expired')
// }