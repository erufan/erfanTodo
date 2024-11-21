interface UserCredentials {
  email: string;
  username: string;
  password: string;
}

export interface UserCredentialErrors extends UserCredentials {}

export default UserCredentials;
