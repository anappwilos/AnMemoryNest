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

export function sanitizeAlbum(album: any): any {
  if (!album) return album;
  
  const fixUrl = (url: string | undefined): string => {
    if (!url) return '';
    let updatedUrl = url;
    if (updatedUrl.includes('photo-150752428034-b723cf961d3e')) {
      updatedUrl = updatedUrl.replace('photo-150752428034-b723cf961d3e', 'photo-1519046904884-53103b34b206');
    }
    if (updatedUrl.includes('photo-1500835595337-f74001712681')) {
      updatedUrl = updatedUrl.replace('photo-1500835595337-f74001712681', 'photo-1436491865332-7a61a109cc05');
    }
    return updatedUrl;
  };

  const coverImage = fixUrl(album.coverImage);
  
  const memories = Array.isArray(album.memories) 
    ? album.memories.map((m: any) => ({
        ...m,
        imageUrl: fixUrl(m.imageUrl)
      }))
    : album.memories;

  return {
    ...album,
    coverImage,
    memories
  };
}

export const albumService = {
  async getAlbums(userId: string) {
    const q = query(
      collection(db, 'albums'),
      where('ownerId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    const albums = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Proactively clean up and update database if needed
    for (const album of albums) {
      const sanitized = sanitizeAlbum(album);
      if (JSON.stringify(album) !== JSON.stringify(sanitized)) {
        const { id, ...dataToSave } = sanitized;
        updateDoc(doc(db, 'albums', album.id), dataToSave).catch(err => {
          console.error('Error updating old image URLs in Firestore:', err);
        });
      }
    }
    
    return albums.map(sanitizeAlbum);
  },

  subscribeToAlbums(userId: string, onUpdate: (albums: any[]) => void) {
    const q = query(
      collection(db, 'albums'),
      where('ownerId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
      onUpdate(snapshot.docs.map(doc => sanitizeAlbum({ id: doc.id, ...doc.data() })));
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
      const album = { id: docSnap.id, ...docSnap.data() };
      const sanitized = sanitizeAlbum(album);
      if (JSON.stringify(album) !== JSON.stringify(sanitized)) {
        const { id, ...dataToSave } = sanitized;
        updateDoc(docRef, dataToSave).catch(err => {
          console.error('Error updating old image URLs in Firestore:', err);
        });
      }
      return sanitized;
    }
    return null;
  },
  
  async updateAlbum(albumId: string, data: any) {
    const docRef = doc(db, 'albums', albumId);
    await updateDoc(docRef, data);
  }
};
