import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FavoriIlanListeDTO } from '@zyazilim/online-ihale-data';
import { LocalStorageService } from '../../../utils/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class KarsilastiriciService {

  secilenAraclarDegisti: Subject<FavoriIlanListeDTO[]> = new Subject();
  private _secilenAraclar: FavoriIlanListeDTO[];
  public get secilenAraclar(): FavoriIlanListeDTO[] {
    return this.localStorageService.getItem('karsilastirilanAraclar') as FavoriIlanListeDTO[];
  }
  constructor(private modal: NgbModal,
    private localStorageService: LocalStorageService) {
    this._secilenAraclar = this.secilenAraclar ? this.secilenAraclar : [];
  }
  ekle(arac: FavoriIlanListeDTO): boolean {
    if (this.listedeVarMi(arac)) {
      return true;
    }
    if (this._secilenAraclar.length === 3) {

      return false;
    }
    this._secilenAraclar.push(arac);
    this.localStorageService.setItem('karsilastirilanAraclar', JSON.stringify(this._secilenAraclar));
    this.secilenAraclarDegisti.next(this._secilenAraclar);
    return true;
  }
  cikar(arac: FavoriIlanListeDTO) {
    this._secilenAraclar.splice(this._secilenAraclar.findIndex(f => f.id === arac.id), 1);
    this.localStorageService.setItem('karsilastirilanAraclar', JSON.stringify(this._secilenAraclar));
    this.secilenAraclarDegisti.next(this._secilenAraclar);
  }
  listedeVarMi(arac: FavoriIlanListeDTO): boolean {
    return this._secilenAraclar.findIndex(p => p.id === arac.id) >= 0;
  }
  temizle() {
    this.localStorageService.clearItem('karsilastirilanAraclar');
    this._secilenAraclar = [];
    this.secilenAraclarDegisti.next(this._secilenAraclar);
  }
}
