import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { Observable, map } from 'rxjs';

import { MoviesService } from '../../services/movies.service';
import { TvshowsService } from '../../services/tvshows.service';
import { MoviesDto } from '../../types/movie';
import { mapToMoviesDto } from '../../types/tvshow';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.scss'],
})
export class ShowsListComponent implements OnInit {
  showsList$: Observable<MoviesDto> | null = null;
  searchValue = ''; // Almacena el valor de búsqueda
  first = 0; // Primer elemento en la lista, para el paginador
  showType: 'tv' | 'movie' = 'movie'; // Define el tipo de show, 'movie' o 'tv'
  pageLinkSize: number = 5; // Valor inicial para la cantidad de botones de página

  constructor(
    private moviesService: MoviesService,
    private tvshowsService: TvshowsService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    // Suscripción a los parámetros de la ruta para determinar el tipo de show
    this.router.params.subscribe((params) => {
      this.showType = params['type']; // Asigna el tipo de show basado en la URL
      this.searchValue = ''; // Reinicia el valor de búsqueda
      this.updateShowsList(1); // Carga la lista de shows de la primera página
      this.adjustPageLinkSize(); // Ajusta el tamaño de los botones de paginación al iniciar
    });
  }

  // Escucha el evento de cambio de tamaño de la ventana para ajustar el tamaño de los botones de paginación
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustPageLinkSize(); // Ajusta el tamaño de los botones cuando cambia el tamaño de la ventana
  }

  // Ajusta el tamaño de los botones de paginación según el tamaño de la ventana
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

  // Actualiza la lista de shows cuando cambia el valor de búsqueda
  handleSearchChange() {
    this.first = 0; // Reinicia la primera página al realizar una búsqueda
    this.updateShowsList(1); // Vuelve a cargar la lista de shows con los nuevos parámetros
  }

  // Maneja el cambio de página en el paginador
  handlePageChange(event: PaginatorState) {
    this.first = event.first ? event.first : 0; // Actualiza la página actual
    const pageNumber = event.page ? event.page + 1 : 1; // Calcula el número de página
    this.updateShowsList(pageNumber); // Actualiza la lista de shows según la nueva página
  }

  // Actualiza la lista de shows según la página y el término de búsqueda
  updateShowsList(page: number) {
    const searchTerm = this.searchValue.trim(); // Elimina espacios innecesarios del término de búsqueda
    if (this.showType === 'movie') {
      // Si el tipo es 'movie', realiza una búsqueda de películas
      this.showsList$ = this.moviesService.searchMovies(page, searchTerm);
    } else if (this.showType === 'tv') {
      // Si el tipo es 'tv', realiza una búsqueda de programas de TV
      this.showsList$ = this.tvshowsService
        .searchTvshows(page, searchTerm)
        .pipe(map(mapToMoviesDto)); // Mapea los resultados de TV a un formato adecuado
    }
  }
}
