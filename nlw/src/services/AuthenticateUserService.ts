import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import {compare} from "bcryptjs";
import { sign } from "jsonwebtoken";


interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService{

  async execute({email, password}) {

    const userRepositories = getCustomRepository(UsersRepositories);

    const user = await userRepositories.findOne({
      email
    });

    if(!user){
      throw new Error("Email/Password incorrect");
    }


    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
      throw new Error("Email/Password incorrect");
    }
  
    const token = sign(
      {
        email: user.email
      }, 
      "12211c5360b985a0c0ca7ff532b713ca",
      {
        subject: user.id,
        expiresIn: "1d"
      }
    );

    return token;
    
  }
}

export { AuthenticateUserService };