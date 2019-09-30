import firebase, {
  auth,
  firestore,
  uploadProfilePicture,
  createUserProfileDocument
} from './firebase';
import FirebaseContext from '../contexts/FirebaseContext';

export {
  FirebaseContext,
  auth,
  firestore,
  uploadProfilePicture,
  createUserProfileDocument
};

export default firebase;
