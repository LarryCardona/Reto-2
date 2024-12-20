// video.ts
export type VideosDto = {
  results: Video[];
  id: string;
};

export type Video = {
  key: string;
  site: string;
  type: string; // Agregar la propiedad `type`
};
