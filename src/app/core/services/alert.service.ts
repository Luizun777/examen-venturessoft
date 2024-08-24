import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alertError(html: string, title?: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title,
      html,
      icon: 'error',
      allowOutsideClick: false,
    });
  }

  alertSuccess(html: string, title?: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title,
      html,
      icon: 'success',
      allowOutsideClick: false,
    } as any);
  }
}
