import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload{
  sub: string;
}

export function ensureAuthenticated(
  request: Request, 
  response: Response, 
  next: NextFunction){

    const authToken = request.headers.authorization

    if(!authToken){
      return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try{
      
      const { sub } = verify(
        token, 
        "12211c5360b985a0c0ca7ff532b713ca"
      ) as IPayload;
      
      request.user_id = sub;
      
      return next();
    
    }catch(err){
      
      return response.status(401).end();
    
    }

}