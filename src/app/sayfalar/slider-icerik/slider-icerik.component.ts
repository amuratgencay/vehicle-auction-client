import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SliderIcerikGuncelleDTO, SliderService } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-slider-icerik',
  templateUrl: './slider-icerik.component.html',
  styleUrls: ['./slider-icerik.component.scss']
})
export class SliderIcerikComponent implements OnInit {
  icerik: SliderIcerikGuncelleDTO;

  constructor(private sliderService: SliderService,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(p => {
      let id = p['id'];
      this.sliderService.getIcerik(id)
        .subscribe(d => {
          this.icerik = d;
        });
    });
  }

  ngOnInit() {
  }
}
