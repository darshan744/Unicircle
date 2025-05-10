interface ProfileResponse {
  url?: string;
}
interface GroupCreationResponse {
  id: string;
  name: string;
  groupProfileImage: string | null;
}

export interface UserGroup {
  id:string
  groupProfileImage: string;
  admins: GroupUserAndAdmin[];
  name: string;
  Users: GroupUserAndAdmin[];
}

interface GroupUserAndAdmin {
  name: string;
  userName: string;
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
