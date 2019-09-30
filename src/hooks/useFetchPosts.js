import { useEffect, useState } from 'react';
import { auth, firestore, createUserProfileDocument } from '../firebase';

const useFetchPosts = user => {
  const [posts, setPosts] = useState(null);

  const postsRef = firestore.collection('posts');

  useEffect(() => {
    let unsubscribe = () => {};

    if (user) {
      const fetchPosts = () => {
        const unsubscribe = postsRef
          .orderBy('created_at', 'desc')
          .onSnapshot(async snapshot => {
            const posts = await snapshot.docs.map(doc => {
              return { id: doc.id, ...doc.data() };
            });

            setPosts(posts);
          });

        return unsubscribe;
      };

      unsubscribe = fetchPosts();
    }

    return () => unsubscribe();
  }, [user]);

  return posts;
};

export default useFetchPosts;
