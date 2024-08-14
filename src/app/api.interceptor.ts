import {
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { environment } from '../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  let dynamicRequest = req.clone({
    url: `${environment.apiBaseUrl}${req.url}`,
  });
  let authorizationData =
    'Basic ' +
    btoa(environment.basicAuthUsername + ':' + environment.basicAuthPassword);
  if (isLogin(req)) {
    const tokenData = localStorage.getItem('access_token');
    const parsed = tokenData ? JSON.parse(tokenData) : '';
    dynamicRequest = req.clone({
      url: `${environment.apiBaseUrl}${req.url}`,
      body: req.body,
      headers: new HttpHeaders().set('Authorization', authorizationData),
      params: removeInAppParam(req, 'isLogin'),
    });
  }
  if (requiresToken(req)) {
    dynamicRequest = req.clone({
      url: `${environment.apiBaseUrl}${req.url}`,
      body: req.body,
      headers: new HttpHeaders().set('Authorization', authorizationData),
      params: removeInAppParam(req, 'requiresToken'),
    });
  }
  return next(dynamicRequest);
};

function isLogin(req: any) {
  const url_string = req.urlWithParams;
  const url = new URL('http://domain.com' + url_string);
  return !!url.searchParams.get('isLogin');
}

function requiresToken(req: any) {
  const url_string = req.urlWithParams;
  const url = new URL('http://domain.com' + url_string);
  return !!url.searchParams.get('requiresToken');
}
function removeInAppParam(req: HttpRequest<any>, param: string) {
  return req.params.delete(param, true);
}
