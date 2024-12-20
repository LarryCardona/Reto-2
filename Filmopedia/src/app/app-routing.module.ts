import { NgModule } from '@angular/core'; // Importa el decorador NgModule de Angular
import { RouterModule, Routes } from '@angular/router'; // Importa RouterModule y Routes para la configuración de rutas

// Importación de los componentes asociados a cada ruta
import { GenresComponent } from './pages/genres/genres.component'; 
import { HomeComponent } from './pages/home/home.component';
import { ShowDetailComponent } from './pages/show-detail/show-detail.component';
import { ShowsListComponent } from './pages/shows-list/shows-list.component';

// Definición de las rutas de la aplicación
const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta principal que carga el componente HomeComponent
  { path: 'list/:type', component: ShowsListComponent }, // Ruta para listar películas o series, el parámetro 'type' se usa para determinar si es 'movie' o 'tv'
  { path: 'detail/:type/:id', component: ShowDetailComponent }, // Ruta para ver los detalles de un show específico, los parámetros 'type' y 'id' se usan para identificar el tipo y el ID del show
  { path: 'genres', component: GenresComponent }, // Ruta para ver la lista de géneros
  { path: 'genres/:genreId', component: GenresComponent }, // Ruta para ver los shows de un género específico, el parámetro 'genreId' es el ID del género
];

// Definición del módulo de enrutamiento
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configura las rutas en la aplicación
  exports: [RouterModule], // Exporta el RouterModule para que las rutas sean accesibles en todo el módulo
})
export class AppRoutingModule {} // Exporta el módulo de enrutamiento para ser usado en el módulo principal de la aplicación
