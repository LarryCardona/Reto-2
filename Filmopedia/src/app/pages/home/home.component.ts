import { Component } from '@angular/core'
import { MoviesService } from '../../services/movies.service'
import { TvshowsService } from '../../services/tvshows.service'
import { map } from 'rxjs'
import { mapToMovies } from '../../types/tvshow'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // Observable para obtener las películas populares
  popularMovies$ = this.moviesService.getMoviesByType('popular', 12)
  
  // Observable para obtener las películas mejor valoradas
  topRatedMovies$ = this.moviesService.getMoviesByType('top_rated', 12)
  
  // Observable para obtener los shows de TV populares, mapeando el resultado a películas
  popularTvshows$ = this.tvshowsService
    .getTvShowsByType('popular', 12)
    .pipe(map(mapToMovies))

  constructor(
    private moviesService: MoviesService,  // Servicio para obtener datos de películas
    private tvshowsService: TvshowsService  // Servicio para obtener datos de shows de TV
  ) {}
}
