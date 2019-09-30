import { useEffect, useState } from 'react';
import { auth, firestore, createUserProfileDocument } from '../firebase';

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        createUserProfileDocument(authUser);
        const userRef = firestore.doc(`users/${authUser.uid}`);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      } else {
        setCurrentUser(authUser);
      }
    });

    return () => unsubscribeFromAuth();
  }, []);

  return currentUser;
};

export default useAuth;
