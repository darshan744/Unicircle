interface ProfileResponse {
  url?: string;
}
interface GroupCreationResponse {
  id: string;
  name: string;
  groupProfileImage: string | null;
}
interface GroupUserAndAdmin {
  name: string;
  userName: string;
}
interface BasePost {
  title: string,
  description: string,
  images: string[]
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPost extends BasePost {
  group: {
    id: string;
    name: string;
    groupProfileImage: string | null;
  };
  id: string;
}

export interface UserGroup {
  id: string;
  groupProfileImage: string;
  admins: GroupUserAndAdmin[];
  name: string;
  Users: GroupUserAndAdmin[];
}

export interface PostCreationResponse {
  title: string;
  description: string;
  id: string;
  userId: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  groupsId: string;
}

export interface UserPostResponse {
  posts: UserPost[];
}
export interface GroupPostsResponse extends BasePost {
  id: string;
  userId: string;
  groupsId: string;
  User: {
    userName: string;
    profileImage: string | null
  };
}
