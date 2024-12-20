import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Tvshow, TvshowsDto } from '../types/tvshow';
import { CreditsDto } from '../types/credits';
import { ImagesDto } from '../types/image';
import { VideosDto } from '../types/video';

@Injectable()
export class TvshowsService {
  private apiUrl = 'https://api.themoviedb.org/3'; // URL base de la API
  private apiKey = '8d148bf4bd856f091d7aaa282f4c7fba'; // Clave de la API
  
  constructor(private http: HttpClient) {}

  // Obtiene una lista de programas de TV de un tipo específico (e.g. popular, top_rated)
  getTvShowsByType(type: string, count = 20) {
    return this.http
      .get<TvshowsDto>(`${this.apiUrl}/tv/${type}?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results.slice(0, count))); // Limita la cantidad de resultados
  }

  // Obtiene una lista de programas de TV similares a un ID dado
  getSimilarTvshows(id: string, count = 20) {
    return this.http
      .get<TvshowsDto>(`${this.apiUrl}/tv/${id}/similar?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results.slice(0, count))); // Limita la cantidad de resultados
  }

  // Obtiene los detalles de un programa de TV específico por su ID
  getTvshowById(id: string) {
    return this.http.get<Tvshow>(
      `${this.apiUrl}/tv/${id}?api_key=${this.apiKey}`
    );
  }

  // Obtiene los videos relacionados con un programa de TV por su ID
  getTvshowVideos(id: string) {
    return this.http
      .get<VideosDto>(`${this.apiUrl}/tv/${id}/videos?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results)); // Devuelve los resultados de videos
  }

  // Nuevo método para obtener el tráiler del TV show por su ID
  getTvshowTrailer(id: string) {
    return this.http
      .get<VideosDto>(`${this.apiUrl}/tv/${id}/videos?api_key=${this.apiKey}`)
      .pipe(
        map((data) => {
          // Filtra el tráiler de tipo "Trailer"
          const trailer = data.results.find((video) => video.type === 'Trailer');
          return trailer ? trailer.key : null; // Devuelve la clave del tráiler si existe
        })
      );
  }

  // Obtiene las imágenes del programa de TV por su ID
  getTvshowImages(id: string) {
    return this.http
      .get<ImagesDto>(`${this.apiUrl}/tv/${id}/images?api_key=${this.apiKey}`)
      .pipe(map((data) => data.backdrops)); // Devuelve las imágenes de fondo
  }

  // Obtiene el elenco (cast) de un programa de TV por su ID
  getTvshowCast(id: string) {
    return this.http
      .get<CreditsDto>(`${this.apiUrl}/tv/${id}/credits?api_key=${this.apiKey}`)
      .pipe(map((data) => data.cast)); // Devuelve el elenco
  }

  // Nuevo método para obtener el equipo técnico (crew) de un programa de TV por su ID
  getTvshowCrew(id: string) {
    return this.http
      .get<CreditsDto>(`${this.apiUrl}/tv/${id}/credits?api_key=${this.apiKey}`)
      .pipe(map((data) => data.crew)); // Devuelve el equipo técnico
  }

  // Realiza una búsqueda de programas de TV (por título o términos de búsqueda)
  searchTvshows(page: number, searchValue?: string) {
    const url = searchValue ? 'search/tv' : 'tv/popular'; // Si hay un término de búsqueda, utiliza 'search/tv', de lo contrario, 'tv/popular'

    return this.http.get<TvshowsDto>(
      `${this.apiUrl}/${url}?query=${searchValue}&page=${page}&include_adult=true&api_key=${this.apiKey}`
    );
  }
}
