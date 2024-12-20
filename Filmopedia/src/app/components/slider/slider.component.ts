import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { imagesBaseUrl } from '../../constants/images-sizes';
import { Movie } from '../../types/movie';
import { Router } from '@angular/router';  // Agregado para controlar la ruta actual

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slideFade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('1s')]),
    ]),
  ],
})
export class SliderComponent implements OnInit {
  @Input() slides: Movie[] = [];
  @Input() isHeader = false;

  slideIndex = 0;
  imagesBaseUrl = imagesBaseUrl;

  // Variable para saber si estamos en la página de inicio
  isHomePage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Verifica si estamos en la página de inicio
    this.isHomePage = this.router.url === '/';

    if (!this.isHeader) {
      this.changeSlide();
    }
  }

  changeSlide() {
    setInterval(() => {
      this.slideIndex += 1;
      if (this.slideIndex > 10) {
        this.slideIndex = 0;
      }
    }, 5000);
  }
}
