export interface Movie {
  id?: number;
  title: string;
  release_year: number;
  genre: string[];
  duration: number; // en minutos
  synopsis: string;
  poster_url?: string;
  director_id: number;
}