import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Login, SignUp } from "../Types/Auth";
import { loginSchema, signUpSchema } from "../Validators/Auth.validator";
import {
  createUser,
  doesUserExist,
  findUser,
  userNameCheck,
} from "../Repository/Auth.repo";
import envs from "../Environments";
import { comparePassword } from "../Util/Password";


const login = async (req: Request, res: Response) => {
    const user: Login = req.body.user;
    const isUserValid = loginSchema.safeParse(user);
    if (isUserValid.error) {
        const errorMessage = isUserValid.error.issues.map((issue) => issue.message);
        res.status(400).json({ message: "Invalid Body", error: errorMessage });
        return;
    }
    try {
        const userData = await findUser(user.email);
        if (!userData) {
            res.status(404).json({ message: "User Not found" });
            return;
        }
        const passValid = await comparePassword(
            userData.password,
            user.password
        );
        const {password , ...userdata} = userData;
        if (!passValid) {
          res.status(409).json({ message: "Invalid Credentials" }); 
          return;
        }
        const token = jwt.sign(user, envs.secretKey , {expiresIn : "10s"});
        const refreshToken = jwt.sign(user , envs.refreshKey , {expiresIn : "20s"});
        res
          .status(200)
          .cookie("token", token, { httpOnly: true })
          .cookie("refreshToken", refreshToken, { httpOnly: true })
          .json({
            message: "Login Successfull",
            data: { user: userdata, token },
          });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


const signup = async (req: Request, res: Response) => {
    const signUpUser: SignUp = req.body.user;
    // console.log(signUpUser)
    // res.send(signUpUser);
    const isSignUpBodyValid = signUpSchema.safeParse(signUpUser);
    if (isSignUpBodyValid.error) {
        // retrieve the error messages
        const errorMessage = isSignUpBodyValid.error.issues.map(
            (issue) => issue.message
        );

        res.status(400).json({ message: "Invalid Body", error: errorMessage });
        return;
    }
    try {
        //if user is not found true 
        // if user if found false
        const userExist = await doesUserExist(signUpUser.email);
        
        if (!userExist) {
            res.send(409).json({ message: "User already Exist" });
            return;
        }
        
        const user = await createUser(signUpUser);
        res.json({ message: "Sign-in Successfull You can login now "});
        return;
    } catch (error: any) {
        console.log(error.message)
        res.send(500).json({ message: error.message });
        return;
    }
};

const userNameAvailable = async(req: Request, res: Response) => {
    const userName = req.query['userName'];
    try {
        const userExist = await userNameCheck(userName as string)
        const exist: boolean = userExist ? true : false;
        res
          .status(200)
          .json({
            message:exist ?"UserName Taken":"UserName Available",
            data: { userExist: userExist ? true : false },
          });
    } catch (error:any) {
        res.status(500).json({message : error.message})
    }
};
const refreshToken = (req : Request , res : Response)=> {}
export { login, signup, refreshToken, userNameAvailable  };
