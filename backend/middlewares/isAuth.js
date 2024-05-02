const jwt = require("jsonwebtoken");

const isAuthenticated  = async (req, res,next) => {
    //console.log(req.headers);

    const headerObj = req.headers;
    console.log(headerObj);

    //! Get the token from the header 
    const token = headerObj?.authorization?.split(" ")[1]
    console.log(token);

    //! Verify the token 
    const verifyToken = jwt.verify(token, "mykeytest", (err, decoded) => {
        console.log(decoded);
        if(err) {
            return false;
        } else {
            return decoded;
        }
    });

    if(verifyToken) {
        //! Save the user req obj
        req.user = verifyToken.id;
    } else {
        const err = new Error("Token expired, login again");
        next(err);
    }

    next();
}

module.exports = isAuthenticated;
