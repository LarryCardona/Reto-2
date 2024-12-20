export interface BaseShow {
    id: string; // ID único
    title: string; // Título de la película o serie
    poster_path: string | null; // Ruta del póster
    release_date: string | null; // Fecha de lanzamiento (película) o de emisión (serie)
  }
  