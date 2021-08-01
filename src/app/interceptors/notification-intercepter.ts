import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, retry, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthServiceExtended } from '@zyazilim/online-ihale-data';
import { BilgiModalComponent } from '../components/bilgi-modal/bilgi-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class NotifyInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (req.method === 'GET') {
            return next.handle(req);
        }
        if (req.method === 'POST') {
            return next.handle(req).pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse && event.status === 201) {
                    }
                })
            );
        }
        if (req.method === 'PUT') {
            return next.handle(req).pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse && event.status === 200) {
                    }
                })
            );
        }
        if (req.method === 'DELETE') {
            return next.handle(req).pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse && event.status === 200) {
                    }
                })
            );
        }
    }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        public auth: AuthServiceExtended,
        private modal: NgbModal,
        private router: Router) { }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // if (!req.url.includes(paths.error)) {
        //   return next.handle(req);
        // }
        // console.warn("ErrorInterceptor");
        return next.handle(req).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 400) {
                    console.log(error)
                    this.blobToText(error.error)
                        .subscribe(d => {
                            let modalInstance = this.modal.open(BilgiModalComponent, { centered: true }).componentInstance;
                            (modalInstance as BilgiModalComponent).butonMetin = 'TAMAM';
                            (modalInstance as BilgiModalComponent).icerik = d.message;
                            (modalInstance as BilgiModalComponent).ustBaslik = 'Hata';
                        })

                } else if (error.status === 401) {
                    if (this.auth.isAuthenticated()) {
                    } else {
                        this.router.navigate(['/auth', 'login']);
                    }

                } else if (error.status === 403) {
                } else if (error.status === 500) {
                } else if (error.status === 404) {
                } else {
                }
                return throwError(error);
            })
        );
    }
    blobToText(blob: any): Observable<any> {
        return new Observable<any>((observer: any) => {
            if (!blob) {
                observer.next('');
                observer.complete();
            } else {
                const reader = new FileReader();
                reader.onload = (event: ProgressEvent) => {
                    observer.next(JSON.parse(reader.result.toString()));
                    observer.complete();
                };
                reader.readAsText(blob);
            }
        });
    }
}
