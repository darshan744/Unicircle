interface ILogin {
  email: string;
  password: string;
}
interface ISignup {
  name:string
  userName: string;
  email: string;
  password: string;
}

interface LoginUser {
  email: string;
  id: string;
  userName: string;
  name: string;
  profileImage: string | null;
}
interface LoginReponse {
  user : LoginUser,
  token : string,
}
interface UserNameCheck {
  userExist:boolean
}
export type { ILogin, ISignup, LoginReponse, UserNameCheck };
