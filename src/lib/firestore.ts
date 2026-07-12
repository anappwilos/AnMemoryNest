import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase';
import { Album } from '../types';

export const albumService = {
  async getAlbums(userId: string) {
    const q = query(
      collection(db, 'albums'),
      where('ownerId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  subscribeToAlbums(userId: string, onUpdate: (albums: any[]) => void) {
    const q = query(
      collection(db, 'albums'),
      where('ownerId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
      onUpdate(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  },

  async createAlbum(albumData: Partial<Album>, userId: string) {
    const docRef = await addDoc(collection(db, 'albums'), {
      ...albumData,
      ownerId: userId,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  },

  async getAlbumById(albumId: string) {
    const docRef = doc(db, 'albums', albumId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  },
  
  async updateAlbum(albumId: string, data: any) {
    const docRef = doc(db, 'albums', albumId);
    await updateDoc(docRef, data);
  }
};
