interface ProfileResponse {
  url?: string;
}
interface GroupCreationResponse {
  id: string;
  name: string;
  groupProfileImage: string | null;
}

export interface UserGroup {
  groupProfileImage: string;
  admins: GroupUserAndAdmin[];
  name: string;
  Users: GroupUserAndAdmin[];
}

interface GroupUserAndAdmin {
  name: string;
  userName: string;
}


