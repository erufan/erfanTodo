interface UserCredentials {
  email: string;
  username?: string;
  password: string;
}

export interface UserCredentialErrors extends Partial<UserCredentials> {
  unknown?: string;
}

export default UserCredentials;
