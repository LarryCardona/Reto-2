import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable, map } from 'rxjs'

import { IMAGES_SIZES } from '../../constants/images-sizes'
import { MoviesService } from '../../services/movies.service'
import { TvshowsService } from '../../services/tvshows.service'
import { Actor } from '../../types/credits'
import { Image } from '../../types/image'
import { Movie } from '../../types/movie'
import { mapToMovie, mapToMovies } from '../../types/tvshow'
import { Video } from '../../types/video'
import { Crew } from '../../types/credits'

interface responsiveOption {
  breakpoint: string
  numVisible: number
  numScroll: number
}

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss'],
})
export class ShowDetailComponent implements OnInit {
  showId = ''
  showType: 'tv' | 'movie' = 'movie'

  show$: Observable<Movie> | null = null
  showVideos$: Observable<Video[]> | null = null
  showImages$: Observable<Image[]> | null = null
  showCasts$: Observable<Actor[]> | null = null
  showCrew$: Observable<Crew[]> | null = null // Para el equipo técnico
  similarMovies$: Observable<Movie[]> | null = null

  imagesSizes = IMAGES_SIZES
  responsiveOptions: responsiveOption[] = []

  // Flags para mostrar más/menos
  showAllVideos = false;
  showAllImages = false;

  // Variable para controlar la visualización del trailer
  showTrailer = false;
  trailerVideoKey: string | null = null;

  constructor(
    private router: ActivatedRoute,
    private MoviesService: MoviesService,
    private tvService: TvshowsService
  ) {}

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 8,
        numScroll: 8,
      },
      {
        breakpoint: '1200px',
        numVisible: 6,
        numScroll: 6,
      },
      {
        breakpoint: '992px',
        numVisible: 5,
        numScroll: 5,
      },
      {
        breakpoint: '768px',
        numVisible: 3,
        numScroll: 3,
      },
    ]
    
    this.router.params.subscribe((params) => {
      this.showId = params['id']
      this.showType = params['type']

      if (this.showType === 'movie') {
        this.show$ = this.MoviesService.getMovieById(this.showId)
        this.showVideos$ = this.MoviesService.getMovieVideos(this.showId)
        this.showImages$ = this.MoviesService.getMovieImages(this.showId)
        this.showCasts$ = this.MoviesService.getMovieCast(this.showId)
        this.showCrew$ = this.MoviesService.getMovieCrew(this.showId)
        this.similarMovies$ = this.MoviesService.getSimilarMovies(this.showId, 12)
      }

      if (this.showType === 'tv') {
        this.show$ = this.tvService
          .getTvshowById(this.showId)
          .pipe(map(mapToMovie))
        this.showVideos$ = this.tvService.getTvshowVideos(this.showId)
        this.showImages$ = this.tvService.getTvshowImages(this.showId)
        this.showCasts$ = this.tvService.getTvshowCast(this.showId)
        this.showCrew$ = this.tvService.getTvshowCrew(this.showId)
        this.similarMovies$ = this.tvService
          .getSimilarTvshows(this.showId, 12)
          .pipe(map(mapToMovies))
      }

      // Obtiene el primer video si existe y lo asigna a la propiedad trailerVideoKey
      this.showVideos$?.subscribe((videos) => {
        const trailer = videos.find(video => video.type === 'Trailer');
        if (trailer) {
          this.trailerVideoKey = trailer.key;
        }
      });
    })
  }

  // Funciones para mostrar más/menos
  toggleVideos() {
    this.showAllVideos = !this.showAllVideos;
  }

  toggleImages() {
    this.showAllImages = !this.showAllImages;
  }

  getVisibleVideos(videos: Video[]) {
    return this.showAllVideos ? videos : videos.slice(0, 5);
  }

  getVisibleImages(images: Image[]) {
    return this.showAllImages ? images : images.slice(0, 5);
  }

  // Función para mostrar el trailer
  toggleTrailer() {
    this.showTrailer = !this.showTrailer;
  }

  // Manejador de la tecla 'Enter' o 'Space' para accesibilidad
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleTrailer();
    }
  }
}
