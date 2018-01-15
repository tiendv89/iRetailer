import firebase from 'react-native-firebase';

export const GOOGLE_PROVIDER = 'google';

export function getCredentialByProvider(provider, user) {
  switch (provider) {
    case GOOGLE_PROVIDER:
      return firebase.auth.GoogleAuthProvider.credential(
        user.idToken,
        user.accessToken
      );
    default:
      throw new Error('Provider must be specified');
  }
}
