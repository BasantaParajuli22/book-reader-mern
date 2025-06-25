// @ts-check
import jsonwebtoken from "jsonwebtoken";

const jwtSecretKey =process.env.JWT_SECRET_KEY;

/**
 * authenticateToken Middleware
 * 
 * Why this middleware is NOT declared async:
 *  - Express middleware functions run synchronously from Express's perspective.
 *  - Inside this middleware, we perform an asynchronous operation (`jsonwebtoken.verify`) using a callback.
 *  - Because we use a callback, the middleware function itself does NOT return a Promise.
 *  - Express does not await Promises in middleware by default.
 *  - Therefore, we cannot mark the middleware as async and must call `next()` manually inside the callback.
 * 
 * How the flow works:
 * 1. Middleware is called synchronously when a request hits a route using it.
 * 2. We extract the JWT token from the `Authorization` header.
 * 3. If no token is found, we send back a 401 Unauthorized response immediately.
 * 4. We call `jsonwebtoken.verify()` which works asynchronously with a callback.
 * 5. Inside the callback:
 *    - If verification fails, send back a 403 Forbidden response.
 *    - If successful, attach the decoded token payload (`user`) to `req.user`.
 *    - Call `next()` to pass control to the next middleware or route handler.
 * 
 * Why we DON'T throw errors here:
 *  - Throwing inside middleware without an error handler will crash the server.
 *  - Instead, we send HTTP error responses or call next with an error to handle gracefully.
 */
export default function authenticateToken( req, res, next){

    //HTTP headers in Node.js are case-insensitive but Express stores them lowercase so:
    const authHeader = req.headers['authorization']; 
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
       return res.status(401).json({ message: 'JWT token is required' });
    }
    //You must call next() inside the JWT verify callback, not after it
    //because verify() is async
    jsonwebtoken.verify(token, jwtSecretKey, (err, user)  =>{
        if(err){
          return res.status(403).json({ message: 'Could not verify JWT token' });
        }
        // Attach decoded user info to request object
        req.user = user;
        // Call next middleware or route handler
        next();
    })
}