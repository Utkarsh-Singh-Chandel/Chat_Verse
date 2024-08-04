import jwt from 'jsonwebtoken'

const generateToken=(userID,res)=>{
    const token=jwt.sign({userID},process.env.JWT_SECRET,{
        expiresIn:'15d',

    })
    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,
        maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    }) 
}
export default generateToken;
