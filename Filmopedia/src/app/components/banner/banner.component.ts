import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Movie } from '../../types/movie';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
  @Input() shows: Movie[] = [];
  @Input() title = '';
  @Input() showType: 'tv' | 'movie' = 'movie';

  // Referencia al contenedor del slider
  @ViewChild('sliderRef') sliderRef!: ElementRef;

  // Función para desplazar hacia la izquierda
  scrollLeft(): void {
    const slider = this.sliderRef.nativeElement;
    slider.scrollLeft -= slider.offsetWidth / 2; // Desplazar la mitad del ancho visible
  }

  // Función para desplazar hacia la derecha
  scrollRight(): void {
    const slider = this.sliderRef.nativeElement;
    slider.scrollLeft += slider.offsetWidth / 2; // Desplazar la mitad del ancho visible
  }
}
