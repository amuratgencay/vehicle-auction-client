import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberTrFormatPipe } from './number-tr-format.pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { HighlightPipe } from './highlight.pipe';
import { ResimYokPipe } from './resim-yok.pipe';
import { ResimSecPipe } from './resim-sec.pipe';
import { AracResimToGalleryPipe } from './arac-resim-to-gallery.pipe';
import { RemoveHtmlTagsPipe } from './remove-html-tags.pipe';



@NgModule({
  declarations: [NumberTrFormatPipe, HighlightPipe, ResimYokPipe, ResimSecPipe, AracResimToGalleryPipe, RemoveHtmlTagsPipe],
  imports: [
    CommonModule,
    FilterPipeModule
  ],
  exports: [
    NumberTrFormatPipe,
    FilterPipeModule, HighlightPipe, ResimYokPipe, ResimSecPipe, AracResimToGalleryPipe,
    RemoveHtmlTagsPipe
  ],
  providers: [ResimYokPipe, ResimSecPipe, AracResimToGalleryPipe]
})
export class PipesModule { }
