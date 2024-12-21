<!-- ---------------- BCRYPT -------------------------- -->

bcrypt is a library used in software development for securely hashing and verifying passwords. 
Its main purpose is to enhance security by ensuring that user passwords are stored in a way that minimizes the risk of exposure, even if the database is compromised.


const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};


const newAdmin = new AdminModel({
            name,
            email,
            password: hashedPassword, // Store hashed password
});


bcrypt.hash        Hash a password                   Async        Hash (in callback)
bcrypt.hashSync    Hash a password                   Sync         Hash
bcrypt.compare     Compare plain password & hash     Async        Boolean (in callback)
bcrypt.compareSync Compare plain password & hash     Sync         Boolean
bcrypt.genSalt     Generate salt                     Async        Salt (in callback)
bcrypt.genSaltSync Generate salt                     Sync         Salt

When you pass the saltRounds as the second argument, bcrypt.hash() will automatically generate the salt for you and use it to hash the password.
saltRounds represents the number of rounds the hashing algorithm should run. A higher number of rounds will make the hashing process more secure but also slower.

<!-- 1>----------------bcrypt.hash ------------------ -->

bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
    if (err) throw err;
    console.log("Hashed password:", hash);
});


<!-- 2>---------------bcrypt.hashSync ---------------- -->

const hashedPassword = bcrypt.hashSync(plainTextPassword, saltRounds);
console.log("Hashed password:", hashedPassword);


<!-- 3>---------------bcrypt.compare ----------------- -->

bcrypt.compare(plainTextPassword, hash, (err, result) => {
    if (err) throw err;
    console.log("Do they match?", result);
});

or 

const isMatch=await bcrypt.compare(plainTextPassword, hash);
console.log("Do they match?", isMatch);
you can use await directly without using callback.


<!-- 4>---------------bcrypt.compareSync--------------- -->

const isMatch = bcrypt.compareSync(plainTextPassword, hash);
console.log("Do they match?", isMatch);


<!-- 5>---------------bcrypt.genSalt ------------------ -->

bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) throw err;
    console.log("Generated salt:", salt);
});


<!-- 6>---------------bcrypt.genSaltSync --------------  -->

const salt = bcrypt.genSaltSync(saltRounds);
console.log("Generated salt:", salt);


<!-- ------------------------------------------------------- JWT -------------------------------------------------- -->

A JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. It’s a way to securely transmit information as a JSON object that can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (HMAC) or a public/private key pair (RSA or ECDSA).


<!-- How JWT is used? -->
JWTs are commonly used for authentication. After a user logs in with their credentials (like email and password), the server generates a JWT and sends it back to the client. The client stores this JWT (usually in localStorage or sessionStorage on the frontend) and includes it in the header of subsequent requests to authenticate the user.

<!-- Common JWT Authentication Flow: -->
1> User logs in by providing their credentials (email and password).
2> Server verifies the credentials.
3> If the credentials are valid, the server generates a JWT and sends it back to the client.
4> Client stores the token (e.g., in localStorage or cookies).
5> Client includes the token in the header of subsequent requests to access protected routes
6> Server verifies the token before granting access to the requested resource.

<!-- HOW TO WORK WITH JWT -->

1> npm install jsonwebtoken

2>

import jwt from 'jsonwebtoken';

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists and if the password matches (e.g., using bcrypt)
    const user = await UserModel.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).send({ message: "Invalid credentials" });
    }

    // Create a JWT token with user ID as payload
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',  // Token expires in 1 hour
    });

    res.json({ success: true, message: "Login successful", token });
};

<!-- _________________________________________________________ JWT _________________________________________________________ -->

What is a Session?
A session is a way to store and manage data for a user across multiple requests during their interaction with a web application. It allows the server to "remember" the user as they navigate between pages or make multiple requests. Sessions are commonly used for managing user authentication, shopping carts, or preferences while the user is interacting with a website or application.

While it's possible to send and store the userID in localStorage for managing login status, using JWT is a more robust, secure, and scalable solution. JWT not only ensures the integrity and expiration of the token but also offers an automatic and more secure way to handle authentication across multiple services and domains. It reduces the risk of security vulnerabilities and provides flexibility in managing user sessions.   

The jwt.sign() method creates a JWT by embedding user information in its payload, signing it with a secret key, and including options like expiration time.
JWTs are used for authentication, and their payload is not encrypted but can be verified with the secret key.
Expiration times (expiresIn) are used to limit how long the token is valid for, enhancing security.

<!-- Creating and sending token -->

import jwt from 'jsonwebtoken';

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists and if the password matches (e.g., using bcrypt)
    const user = await UserModel.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).send({ message: "Invalid credentials" });
    }

    <!-- // Create a JWT token with user ID as payload  -->

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',  // Token expires in 1 hour
    });

    res.json({ success: true, message: "Login successful", token });
};


<!-- Verifying and decoding token -->

import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if token is provided
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Attach user ID to the request
        next(); // Continue to the next middleware or route
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

export default authMiddleware;

<!-- Notes -->

<!-- Flow Overview -->
Token Generation:

When a user logs in, generate a token and send it to the client.
Token Storage:

The client stores the token (e.g., in localStorage or sessionStorage).
Token Usage:

For every request to a protected route, the client includes the token in the Authorization header.
Token Verification:

On the server, verify the token using middleware before proceeding with the request.    

<!-- Benefits of Tokens -->
Stateless Authentication: No need to maintain server-side session state.
Secure: Tokens are cryptographically signed and tamper-proof.
Cross-Domain: Works well with APIs accessed across multiple domains or applications.



