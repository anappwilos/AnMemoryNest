import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { albumService } from '../lib/firestore';
import { Album } from '../types';

export const albumKeys = {
  all: ['albums'] as const,
  lists: () => [...albumKeys.all, 'list'] as const,
  list: (userId: string) => [...albumKeys.lists(), userId] as const,
  details: () => [...albumKeys.all, 'detail'] as const,
  detail: (id: string) => [...albumKeys.details(), id] as const,
};

export function useAlbums(userId: string | undefined) {
  return useQuery({
    queryKey: albumKeys.list(userId!),
    queryFn: () => albumService.getAlbums(userId!),
    enabled: !!userId,
  });
}

export function useCreateAlbum() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ data, userId }: { data: Partial<Album>, userId: string }) => 
      albumService.createAlbum(data, userId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: albumKeys.list(variables.userId) });
    },
  });
}

export function useUpdateAlbum() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ albumId, data }: { albumId: string, data: Partial<Album> }) => 
      albumService.updateAlbum(albumId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: albumKeys.detail(variables.albumId) });
      queryClient.invalidateQueries({ queryKey: albumKeys.lists() });
    },
  });
}
