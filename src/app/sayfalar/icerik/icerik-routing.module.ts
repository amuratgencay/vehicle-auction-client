import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IcerikComponent } from './icerik.component';


const routes: Routes = [{
  path: ':kategoriKod',
  component: IcerikComponent
},
{
  path: ':kategoriKod/:altIcerikKod',
  component: IcerikComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IcerikRoutingModule { }
