import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsGrantedDirective } from './directives/is-granted.directive';
import { AccessCheckerService } from './services/access-checker.service';

@NgModule({
  declarations: [IsGrantedDirective],
  imports: [
    CommonModule
  ],
  exports: [
    IsGrantedDirective
  ]
})
export class SecurityModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: SecurityModule,
      providers: [
        AccessCheckerService,
      ],
      exports: [
        IsGrantedDirective,
      ],
    };
  }
}
