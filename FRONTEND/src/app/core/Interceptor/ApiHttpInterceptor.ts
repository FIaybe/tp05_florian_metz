import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable, tap } from 'rxjs';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {

    jwtToken: String = "";

    constructor(private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //add jwtToken in every request
        if (this.jwtToken != "") {
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${this.jwtToken}`, 'Content-Type': 'application/json' }
            });
        }

        return next.handle(req).pipe(tap(
            (evt: HttpEvent<any>) => {
                if (evt instanceof HttpResponse) {
                    let tab: Array<String>;
                    let enteteAuthorization = evt.headers.get("Authorization");
                    if (enteteAuthorization != null) {
                        tab = enteteAuthorization.split(/Bearer\s+(.*)$/i);
                        if (tab.length > 1) {
                            this.jwtToken = tab[1];
                        }
                    }
                }
            },
            (error: HttpErrorResponse) => {
                if (error.status === 401) {
                    // redirection vers la home page
                    this.router.navigate(["/"]);
                    location.reload();
                }
            }
        ));
    }
}
