import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
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
import { cookieOptions } from '../Util/HttpCookieOptions'
/**
 * @method POST
 * @route /api/auth/login
 * @description logs in the user and sets the token as cookie
 */
const login = async (req: Request, res: Response, next: NextFunction) => {
    const user: Login = req.body.user;
    const isUserValid = loginSchema.safeParse(user);
    if (isUserValid.error) {
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
    const token = jwt.sign({ id: userdata.id }, envs.secretKey, { expiresIn: "15s" });
    const refreshToken = jwt.sign({ id: userdata.id }, envs.refreshKey, { expiresIn: "2m" });
    /**
     * @note 
     * In frontend when using set cookie header
     * always use withCredential when sending a request even for login
     * then only the cookie will be set in the browser
     * then in middleware allow signup and login route to pass
     */
    res
        .status(200)
        // 15 minutes
        .cookie("token", token, cookieOptions(60 * 15))
        // 1 hr
        .cookie("refreshToken", refreshToken, cookieOptions(60 * 60))
        .json({
            message: "Login Successfull",
            data: { user: userdata, token },
        });
};

/**
 * @method POST
 * @route /api/auth/signup
 * @description Signsup a user
 */
const signup = async (req: Request, res: Response, next: NextFunction) => {
    const signUpUser: SignUp = req.body.user;
    const isSignUpBodyValid = signUpSchema.safeParse(signUpUser);
    if (isSignUpBodyValid.error) {
        // retrieve the error messages
        const errorMessage = isSignUpBodyValid.error.issues.map(
            (issue) => issue.message
        );
        return next(new Exception(HttpStatusCode.NOT_FOUND, "Invalid Body"));
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
/**
 * @method GET
 * @route /api/username 
 * @description Checks whether the user enteres user name is available or not 
 */
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

/**
 * @method GET
 * @router /api/auth/refresh-token
 * @description Used for refreshing the token
 */
const refreshToken = (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        next(new Exception(HttpStatusCode.UNAUTHORIZED, "Ref token not found"))
    }
    try {
        const refreshTokenDecoded = jwt.verify(refreshToken, envs.refreshKey);
        const newToken = jwt.sign(refreshTokenDecoded, envs.secretKey)
        // fifteen minutes
        res.status(200).cookie("token", newToken, cookieOptions(60 * 15)).json();
    } catch (error: any) {
        next(new Exception(HttpStatusCode.UNAUTHORIZED, error.message));
        return;
    }

}
export { login, signup, refreshToken, userNameAvailable };
