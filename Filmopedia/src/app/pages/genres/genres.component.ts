import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { Genre, MoviesDto } from '../../types/movie';
import { ActivatedRoute } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  genres$: Observable<Genre[]> | null = null;
  shows$: Observable<MoviesDto> | null = null;
  genreId = '';
  searchValue = '';
  first = 0; // Para manejar la paginación
  pageLinkSize: number = 5; // Ajuste dinámico de la paginación según el tamaño de pantalla
  showType: 'tv' | 'movie' = 'movie';  // Aquí agregamos 'showType'

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Obtener el género y cargar las películas del género
    this.route.params.subscribe((params) => {
      this.genreId = params['genreId'];
      this.updateShowsList(1); // Cargar las películas en la primera página
    });
    this.genres$ = this.moviesService.getMovieGenres(); // Obtener los géneros
    this.adjustPageLinkSize(); // Ajustar el tamaño de la paginación al iniciar
  }

  // Manejar la búsqueda
  handleSearchChange() {
    this.first = 0; // Resetear la página cuando se cambie la búsqueda
    this.updateShowsList(1); // Actualizar la lista de películas
  }

  // Manejar el cambio de página
  handlePageChange(event: PaginatorState) {
    this.first = event.first ? event.first : 0;
    const pageNumber = event.page ? event.page + 1 : 1;
    this.updateShowsList(pageNumber);
  }

  // Actualizar las películas por género y búsqueda
  updateShowsList(page: number) {
    const searchTerm = this.searchValue.trim(); // Obtener el valor de búsqueda
    this.shows$ = this.moviesService.getMoviesByGenre(this.genreId, page, searchTerm);
  }

  // Ajustar el tamaño de los botones de la paginación
  adjustPageLinkSize() {
    const width = window.innerWidth;
    if (width >= 1260) {
      this.pageLinkSize = 5; // Pantallas grandes - 5 botones
    } else if (width >= 1024) {
      this.pageLinkSize = 4; // Pantallas medianas - 4 botones
    } else if (width >= 768) {
      this.pageLinkSize = 3; // Pantallas pequeñas - 3 botones
    } else {
      this.pageLinkSize = 2; // Pantallas ultra pequeñas - 2 botones
    }
  }

  // Event listener para cambios de tamaño de ventana
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustPageLinkSize(); // Ajustar el tamaño de los botones de paginación cuando se cambie el tamaño de la ventana
  }
}
