export interface Movie {
  id?: number;
  title: string;
  releaseYear: number;
  genre: string;
  synopsis: string;
  duration: number;
  posterUrl: string;
  directorId: number;
}