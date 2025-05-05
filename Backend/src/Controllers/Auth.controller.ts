import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Login, SignUp } from "../Types/Auth";
import { loginSchema, signUpSchema, } from "../Validators/Auth.validator";
import {
    createUser,
    doesUserExist,
    findUser,
    userNameCheck,
} from "../Repository/Users.repo";
import envs from "../Environments";
import { comparePassword } from "../Util/Password";
import { Exception } from "../Util/Exception";
import { HttpStatusCode } from "../Util/HttpStatusCode";


const login = async (req: Request, res: Response, next: NextFunction) => {
    const user: Login = req.body.user;
    const isUserValid = loginSchema.safeParse(user);
    if (isUserValid.error) {
        const errorMessage = isUserValid.error.issues.map((issue) => issue.message);
        return next(new Exception(HttpStatusCode.BAD_REQUEST, "Invalid Body"));
    }

    const userData = await findUser(user.email);
    if (!userData) {
        return next(new Exception(HttpStatusCode.NOT_FOUND, "User Not Found"));
    }
    const passValid = await comparePassword(userData.password, user.password);
    const { password, ...userdata } = userData;
    if (!passValid) {
        return next(new Exception(HttpStatusCode.CONFLICT, "Invaild Credentials"));
    }
    const token = jwt.sign(user, envs.secretKey, { expiresIn: "10s" });
    const refreshToken = jwt.sign(user, envs.refreshKey, { expiresIn: "20s" });
    res
        .status(200)
        .cookie("token", token, { httpOnly: true })
        .cookie("refreshToken", refreshToken, { httpOnly: true })
        .json({
            message: "Login Successfull",
            data: { user: userdata, token },
        });
};


const signup = async (req: Request, res: Response, next: NextFunction) => {
    const signUpUser: SignUp = req.body.user;
    const isSignUpBodyValid = signUpSchema.safeParse(signUpUser);
    if (isSignUpBodyValid.error) {
        // retrieve the error messages
        const errorMessage = isSignUpBodyValid.error.issues.map(
            (issue) => issue.message
        );
        return next(new Exception(HttpStatusCode.NOT_FOUND, "Invalid Body"));
        // res.status(400).json({ message: "Invalid Body", error: errorMessage });
        // return;
    }
    //if user is not found true
    // if user if found false
    const userExist = await doesUserExist(signUpUser.email);

    if (!userExist) {
        return next(new Exception(HttpStatusCode.CONFLICT, "User already Exist"));
    }

    const user = await createUser(signUpUser);
    res.json({ message: "Sign-in Successfull You can login now " });
    return;
};

const userNameAvailable = async (
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    const userName = req.query["userName"];
    const userExist = await userNameCheck(userName as string);
    const exist: boolean = userExist ? true : false;
    res.status(200).json({
        message: exist ? "UserName Taken" : "UserName Available",
        data: { userExist: userExist ? true : false },
    });
};
const refreshToken = (req: Request, res: Response) => { }
export { login, signup, refreshToken, userNameAvailable };
