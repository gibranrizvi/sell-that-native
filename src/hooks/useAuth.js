import { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let unsubscribeFromUserSnapshot;
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userRef = firestore.doc(`users/${user.uid}`);

        unsubscribeFromUserSnapshot = userRef.onSnapshot(async snapshot => {
          await setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      } else {
        setCurrentUser(user);
      }
    });

    return () => {
      unsubscribe();
      unsubscribeFromUserSnapshot();
    };
  }, []);

  return currentUser;
};

export default useAuth;
