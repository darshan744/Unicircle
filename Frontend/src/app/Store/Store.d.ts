import { UserGroup, UserPost } from "../Types/User";

interface StoreType {
  theme : boolean;
  group : UserGroup[]
  posts : UserPost[]
}

export default StoreType;
