import { LoginUser } from '../Types/Auth';
import { UserGroup, UserPost } from '../Types/User';

interface StoreType {
  theme: boolean;
  group: UserGroup[];
  posts: UserPost[];
  user: LoginUser;
}

export default StoreType;
