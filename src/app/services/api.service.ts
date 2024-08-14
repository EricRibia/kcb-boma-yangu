import { Injectable } from '@angular/core';
import { ListUsersApiT, LoginArgsT, LongResponseT } from '../types/in-app';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from './utils.service';
import { of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private utilsService: UtilsService) {}

  loginApi(data: LoginArgsT) {
    return this.http
      .post<LongResponseT>(`/users/login`, data, {
        params: this.utilsService.appendQueryParams({
          isLogin: true,
        }),
      })
      .pipe(
        tap((response) => {
          if (response.statusCode !== '200') {
            throw new Error(response.message);
          }
        })
      );
  }

  listUsersApi() {
    const tokenData = localStorage.getItem('access_token');

    const parsed = tokenData ? JSON.parse(tokenData) : '';
    return this.http
      .post<ListUsersApiT>(
        `/users/listAll`,
        {
          token: parsed.access_token,
        },
        {
          params: this.utilsService.appendQueryParams({
            isLogin: true,
          }),
        }
      )
      .pipe(
        tap((response) => {
          if (response.statusCode !== '200') {
            throw new Error(response.message);
          }
        })
      );
  }

  createUsersApi(data: {
    usrFirstname: string;
    usrLastname: string;
    usrUsername: string;
  }) {
    return this.http
      .post<LongResponseT>(
        `/users/create`,
        { payload: data, token: this.token },
        {
          params: this.utilsService.appendQueryParams({
            requiresToken: true,
          }),
        }
      )
      .pipe(
        tap((response) => {
          if (response.statusCode !== '200') {
            throw new Error(response.message);
          }
        })
      );
  }

  get token() {
    const tokenData = localStorage.getItem('access_token');

    const parsed = tokenData ? JSON.parse(tokenData) : '';
    return parsed.access_token;
  }
}
