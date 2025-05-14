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
  id: string;
  title: string;
  description: string;
  userId: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  groupsId: string;
}


export interface UserGroup {
  id:string
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



