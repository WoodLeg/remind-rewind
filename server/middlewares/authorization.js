import jwt from 'jwt-simple';

module.exports.verifyJWT = function(req, res, next) {
    var token = req.headers.authorization;
    // Check if the token exists in the headers

    // eslint-disable-next-line no-underscore-dangle
    req._token = null;

    if (token) {
        var tokenArray = token.split(' ');
        // Check if the token is valid
        try {
            if (tokenArray.length !== 2 || tokenArray[0] !== 'Bearer ') {
                throw new Error('Malformatted access token');
            }

            var decoded = jwt.decode(tokenArray[1]);

            req._token = decoded;
            next();
        } catch (err) {
            next();
            // console.log(err);
            // res.status(401).json({
            //     message: 'Invalid access token'
            // });
        }
    } else {
        next();
        // res.status(401).json({
        //     message: 'Missing access token'
        // });
    }
};
