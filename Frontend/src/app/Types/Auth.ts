interface ILogin {
  email: string;
  password: string;
}
interface ISignup {
  userName: string;
  email: string;
  password: string;
}
class Signup implements ISignup {
  email: string;
  password: string;userName: string;
  constructor(email:string,  password:string , userName:string) {
    this.email = email;
    this.password = password;
    this.userName = userName;
  }
}

class Login implements ILogin {
  email: string;password: string;
  constructor(email :string,  password:string) {
    this.email = email;
    this.password = password;
  }
}

export type{ILogin , ISignup }
export { Signup, Login };
