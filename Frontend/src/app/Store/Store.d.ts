import { LoginUser } from '../Types/Auth';
import { GroupPostsResponse, UserGroup, UserPost } from '../Types/User';

interface StoreType {
  theme: boolean;
  group: UserGroup[];
  posts: UserPost[];
  user: LoginUser;
  groupPost: GroupPostsResponse[]
}

export default StoreType;
