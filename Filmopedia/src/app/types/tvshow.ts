import { Movie, MoviesDto } from './movie';

export type Tvshow = {
  id: number;
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  name: string;
  original_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  episode_run_time: string;
  type: string;
};

export type TvshowsDto = {
  page: number;
  results: Tvshow[];
  total_pages: number;
  total_results: number;
};

// Mapping function from Tvshow to Movie
export function mapToMovie(tvshow: Tvshow): Movie {
  return {
    ...tvshow,
    title: tvshow.name,
    original_title: tvshow.original_name,
    release_date: tvshow.first_air_date,
  };
}

// Mapping function from Tvshow[] to Movie[]
export function mapToMovies(tvshows: Tvshow[]): Movie[] {
  return tvshows.map((tvshow: Tvshow) => {
    return {
      ...tvshow,
      title: tvshow.name,
      original_title: tvshow.original_name,
    };
  });
}

// Mapping function for TvshowsDto to MoviesDto
export function mapToMoviesDto(tvshowsDto: TvshowsDto): MoviesDto {
  return {
    page: tvshowsDto.page,
    results: tvshowsDto.results.map(mapToMovie),
    total_pages: tvshowsDto.total_pages,
    total_results: tvshowsDto.total_results,
  };
}

// Mapping function from Movie to Tvshow (reverse of mapToMovie)
export function mapToTvshow(movie: Movie): Tvshow {
  return {
    ...movie,
    id: movie.id,
    adult: movie.adult,
    backdrop_path: movie.backdrop_path,
    first_air_date: movie.release_date, // You may adjust this if needed
    genre_ids: movie.genre_ids,
    name: movie.title,  // Title maps to name for Tvshow
    original_country: ['USA'],  // Set to default or customize this field
    original_language: movie.original_language,
    original_name: movie.original_title,  // Adjust to original title
    overview: movie.overview,
    popularity: movie.popularity,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    video: movie.video,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    episode_run_time: 'N/A', // You can leave this as 'N/A' or adjust
    type: 'tv',  // Set the type as TV for Tvshow
  };
}
