export interface PaginatorState {
    page: number;  // Página actual
    first: number; // El primer elemento visible
    rows: number;  // Número de filas por página
    pageCount?: number; // Total de páginas (opcional)
  }
  