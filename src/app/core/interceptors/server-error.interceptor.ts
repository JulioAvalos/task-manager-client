import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError} from 'rxjs';
import {inject} from '@angular/core';
import {SnackbarService} from '../../shared/services/snackbar.service';

export const serverErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const snackBarService = inject(SnackbarService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        // network error or unable to reach server
        snackBarService.showError("Network error. Please try again.");
      } else if (error.status === 500) {
        // server error
        snackBarService.showError('Server error. Please try again later.');
      } else {
        // handle other error statuses
        snackBarService.showError('Something went wrong.');
      }
      throw error; // rethrow the error so other handlers can handle it
    })
  );
};
