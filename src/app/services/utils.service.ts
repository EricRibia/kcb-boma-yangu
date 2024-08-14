import { Injectable } from '@angular/core';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() {}

  extractErrorMessage(err: any) {
    if (typeof err === 'string') {
      return err;
    }
    const errorData = err.error;
    if (errorData && errorData.errors && errorData.errors.length) {
      return errorData.errors[0];
    }
    return (
      err.error?.error_description ||
      err?.error?.message ||
      err?.message ||
      'Error occurred, try again later!'
    );
  }

  appendQueryParams(params: any) {
    let queryParams = new HttpParams();
    for (const key in params) {
      queryParams = queryParams.append(key, params[key]);
    }
    return queryParams;
  }
}
