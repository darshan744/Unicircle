import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Login, SignUp } from "../Types/Auth";
import { loginSchema, signUpSchema } from "../Validators/Auth.validator";
import { createUser, doesUserExist, findUser } from "../Repository/Auth.repo";
import envs from "../Environments";
const login = async (req: Request, res: Response) => {
    const user: Login = req.body.user;
    const isUserValid = loginSchema.safeParse(user);
    if (isUserValid.error) {
        const errorMessage = isUserValid.error.issues.map((issue) => issue.message);
        res.status(422).json({ message: "Invalid Body", error: errorMessage });
        return;
    }
    try {
        const userData = findUser(user.email);
        if (!userData) {
            res.send(404).json({ message: "User Not found" });
            return;
        }
        const token = jwt.sign(user, envs.secretKey);
        res.send(200).json({ message: "Login Successfull", data: { user, token } });
    } catch (error) {
        res.send(500).json({ message: "Server error" });
    }
};

const signup = async (req: Request, res: Response) => {
    const signUpUser: SignUp = req.body.user;

    const isSignUpBodyValid = signUpSchema.safeParse(signUpUser);
    if (isSignUpBodyValid.error) {
        // retrieve the error messages
        const errorMessage = isSignUpBodyValid.error.issues.map(
            (issue) => issue.message
        );

        res.status(400).json({ message: "Invalid Body", error: errorMessage });
        return;
    }

    const userExist = await doesUserExist(signUpUser.email);

    if (userExist) {
        res.send(409).json({ message: "User already Exist" });
        return;
    }

    try {
        const user = await createUser(signUpUser);
        res.json({ message: "Sign-in Successfully", data: user });
    } catch (error: any) {
        res.send(500).json({ message: error.message });
        return;
    }
};

export { login, signup };
