//@ts-check
import jsonwebtoken from "jsonwebtoken";
import 'dotenv/config'

const jwtSecretKey =process.env.JWT_SECRET_KEY;

export async function generateToken(id, email, role) {
    
    const token = jsonwebtoken.sign(
        {id: id, email: email, role: role}, //id email and role -> payload as object
        jwtSecretKey,           //secretOrPrivateKey
        {expiresIn: '30h'},     //options?: SignOptions -> expiresIn
    ) 
    return token;
}