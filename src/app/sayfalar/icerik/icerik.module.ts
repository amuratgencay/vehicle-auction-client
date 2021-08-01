import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IcerikRoutingModule } from './icerik-routing.module';
import { IcerikComponent } from './icerik.component';


@NgModule({
  declarations: [IcerikComponent],
  imports: [
    CommonModule,
    IcerikRoutingModule
  ]
})
export class IcerikModule { }
