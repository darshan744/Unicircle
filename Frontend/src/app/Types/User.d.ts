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

export interface UserPost {
  title: string;
  description: string;
  group: {
    id: string;
    name: string;
    groupProfileImage: string | null;
  };
  id: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
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
