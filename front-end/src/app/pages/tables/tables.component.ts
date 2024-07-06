import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import WOW from 'wow.js';
import 'owl.carousel';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
    this.initWow();
    this.initHeaderCarousel();
  }

  ngAfterViewInit(): void {
    this.initDropdownHover();
  }

  private initWow(): void {
    new WOW().init();
  }

  private initDropdownHover(): void {
    const $dropdown = $('.dropdown');
    const $dropdownToggle = $('.dropdown-toggle');
    const $dropdownMenu = $('.dropdown-menu');
    const showClass = 'show';

    $(window).on('load resize', function () {
      if (this.matchMedia('(min-width: 992px)').matches) {
        $dropdown.hover(
          function () {
            const $this = $(this);
            $this.addClass(showClass);
            $this.find($dropdownToggle).attr('aria-expanded', 'true');
            $this.find($dropdownMenu).addClass(showClass);
          },
          function () {
            const $this = $(this);
            $this.removeClass(showClass);
            $this.find($dropdownToggle).attr('aria-expanded', 'false');
            $this.find($dropdownMenu).removeClass(showClass);
          }
        );
      } else {
        $dropdown.off('mouseenter mouseleave');
      }
    });
  }

  private initHeaderCarousel(): void {
    $('.header-carousel').owlCarousel({
      autoplay: true,
      smartSpeed: 1500,
      items: 1,
      dots: false,
      loop: true,
      nav: true,
      navText: [
        '<i class="bi bi-chevron-left"></i>',
        '<i class="bi bi-chevron-right"></i>'
      ]
    });
  }
}
