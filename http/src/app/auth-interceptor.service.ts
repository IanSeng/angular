import { HttpInterceptor, HttpRequest, HttpHeaders, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

// set up interceptors
// interceptors will make sure that every http request in the app will go through it first before http request (we also need to config this interceptor in app module for it to work)
export class AuthInterceptorService implements HttpInterceptor {
    // we can if (req.url) to block the request going out from the app
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Request is on its way'); // to print every url request made from the app
        console.log(req.url);
        const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')}) // when a http request it call from this app, an extra header will add into the request, we use append because it will add it into the existing one
        return next.handle(modifiedRequest).pipe(tap(// this is where the repond return, since handler is an observable we can map the data, but we do not want to break the rest of the code so we just tap to show the data in this project
            event => {
                if (event.type === HttpEventType.Response){
                    console.log('Response arrived, body data ');
                    console.log(event.body);
                }
            }
        ));  
    }
}