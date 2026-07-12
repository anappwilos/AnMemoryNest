export interface Album {
  id: string;
  title: string;
  date: string;
  location: string;
  coverImage: string;
  description: string;
  quote?: string;
  quoteAuthor?: string;
  imagesCount: number;
  videosCount: number;
  companions: string[];
  members: {
    name: string;
    role: string;
    avatar: string;
    online?: boolean;
    typing?: boolean;
  }[];
  chapters: {
    id: string;
    chapterNum: string;
    title: string;
    text: string;
    image: string;
    imageSide: 'left' | 'right';
  }[];
  memories: {
    id: string;
    imageUrl: string;
    caption: string;
    date?: string;
  }[];
  conversation: {
    id: string;
    author: string;
    avatar: string;
    message?: string;
    image?: string;
    date: string;
    audioUrl?: string;
    audioDuration?: string;
    isAudio?: boolean;
  }[];
}

export interface AISuggestion {
  id: string;
  type: 'face' | 'date' | 'duplicate' | 'story';
  title: string;
  description: string;
  targetAlbum: string;
  targetImage?: string;
  meta?: any;
}
