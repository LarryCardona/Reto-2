import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { CreditsDto } from '../types/credits';
import { ImagesDto } from '../types/image';
import { GenresDot, Movie, MoviesDto } from '../types/movie';
import { VideosDto } from '../types/video';

@Injectable()
export class MoviesService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '8d148bf4bd856f091d7aaa282f4c7fba';

  constructor(private http: HttpClient) {}

  // Obtener las películas por tipo
  getMoviesByType(type: string, count = 20) {
    return this.http
      .get<MoviesDto>(`${this.apiUrl}/movie/${type}?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results.slice(0, count)));
  }

  // Obtener películas similares
  getSimilarMovies(id: string, count = 20) {
    return this.http
      .get<MoviesDto>(`${this.apiUrl}/movie/${id}/similar?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results.slice(0, count)));
  }

  // Obtener película por ID
  getMovieById(id: string) {
    return this.http.get<Movie>(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

  // Obtener vídeos de la película
  getMovieVideos(id: string) {
    return this.http
      .get<VideosDto>(`${this.apiUrl}/movie/${id}/videos?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results));
  }

  // Nuevo método para obtener el tráiler de la película
  getMovieTrailer(id: string) {
    return this.http
      .get<VideosDto>(`${this.apiUrl}/movie/${id}/videos?api_key=${this.apiKey}`)
      .pipe(
        map((data) => {
          // Filtrar el tráiler del tipo "Trailer"
          const trailer = data.results.find((video) => video.type === 'Trailer');
          return trailer ? trailer.key : null; // Devuelve solo la clave del tráiler
        })
      );
  }

  // Obtener imágenes de la película
  getMovieImages(id: string) {
    return this.http
      .get<ImagesDto>(`${this.apiUrl}/movie/${id}/images?api_key=${this.apiKey}`)
      .pipe(map((data) => data.backdrops));
  }

  // Obtener reparto de la película
  getMovieCast(id: string) {
    return this.http
      .get<CreditsDto>(`${this.apiUrl}/movie/${id}/credits?api_key=${this.apiKey}`)
      .pipe(map((data) => data.cast)); // Solo el reparto
  }

  // Obtener equipo técnico de la película (Director, etc.)
  getMovieCrew(id: string) {
    return this.http
      .get<CreditsDto>(`${this.apiUrl}/movie/${id}/credits?api_key=${this.apiKey}`)
      .pipe(map((data) => data.crew)); // Solo el equipo técnico
  }

  // Buscar películas
  searchMovies(page: number, searchValue?: string) {
    const url = searchValue ? 'search/movie' : 'movie/popular';

    return this.http.get<MoviesDto>(
      `${this.apiUrl}/${url}?query=${searchValue}&page=${page}&include_adult=true&api_key=${this.apiKey}`
    );
  }

  // Obtener géneros de película
  getMovieGenres() {
    return this.http
      .get<GenresDot>(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`)
      .pipe(map((data) => data.genres));
  }

  // Obtener películas por género
  getMoviesByGenre(genreId?: string, pageNumber = 1, searchTerm: string = '') {
    // Si hay género, se realiza la búsqueda por género
    if (genreId) {
      const searchParam = searchTerm ? `&query=${searchTerm}` : ''; // Agregar término de búsqueda si se proporciona
      return this.http.get<MoviesDto>(
        `${this.apiUrl}/discover/movie?with_genres=${genreId}&page=${pageNumber}&api_key=${this.apiKey}${searchParam}`
      );
    } else {
      // Si no hay género, solo obtiene las películas populares
      return this.http.get<MoviesDto>(
        `${this.apiUrl}/movie/popular?api_key=${this.apiKey}`
      );
    }
  }
}  
