import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { SliderService, SliderListeDTO } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-ana-sayfa-carousel',
  templateUrl: './ana-sayfa-carousel.component.html',
  styleUrls: ['./ana-sayfa-carousel.component.scss']
})
export class AnaSayfaCarouselComponent implements OnInit {
  slides: SliderListeDTO[];
  constructor(config: NgbCarouselConfig,
    private slider: SliderService) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = false;
    config.interval = 3000;
    config.pauseOnHover = true;
  }
  ngOnInit() {
    this.slider.getAll()
      .subscribe(data => {
        this.slides = data.filter(p => p.aktifMi === true);
      })
  }

}
