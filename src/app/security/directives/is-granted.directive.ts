import { Directive, TemplateRef, ViewContainerRef, Input, OnDestroy } from '@angular/core';
import { AccessCheckerService } from '../services/access-checker.service';
import { takeWhile } from 'rxjs/operators';

@Directive({
  selector: '[isGranted]'
})
export class IsGrantedDirective implements OnDestroy {

  private alive = true;
  private hasView = false;
  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private accessChecker: AccessCheckerService) {
  }
  @Input() set isGranted([permission]: [string, string]) {

    this.accessChecker.isGranted(permission)
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe((can: boolean) => {
        if (can && !this.hasView) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else if (!can && this.hasView) {
          this.viewContainer.clear();
          this.hasView = false;
        }
      });
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
