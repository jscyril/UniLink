import jwt from "jsonwebtoken";
import Cookie from "universal-cookie";
import dotenv from "dotenv";


dotenv.config();

export default function Authjwt(req,res,next){
    const cookies = new Cookie();
    const token = cookies.get("authorization");
    if(token){
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, user) => {
            if (err) {
              return res.sendStatus(403);
            }
            req.user = user;
            next();
          });
    } else{
        res.sendStatus(401);
    }
}