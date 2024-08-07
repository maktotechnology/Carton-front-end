// _utils.ts
import { User } from 'firebase/auth';
import { AuthModel } from './_models';

export async function transformUserToAuthModel(user: User): Promise<AuthModel> {
  const idToken = await user.getIdToken(); // Get the ID token
  return {
    api_token: idToken,
    refreshToken: user.refreshToken,
    uid: user.uid,
    email: user.email || '',
  };
}
