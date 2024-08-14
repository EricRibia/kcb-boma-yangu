import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  handleToast(data: { typ: 'success' | 'error' | 'info'; message: string }) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: data.typ,
      title: data.message,
    });
  }

  handleSweetAlert(data: {
    typ: 'success' | 'error';
    message: string;
    timer?: boolean;
    titl?: string;
  }) {
    const title = data.typ === 'success' ? 'Success!' : 'Error Occurred!';
    if (data.timer) {
      Swal.fire({
        icon: data.typ,
        title: data.titl ? data.titl : title,
        text: data.message,
        timer: 4000,
        showCancelButton: false,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: data.typ,
        title: data.titl ? data.titl : title,
        text: data.message,
        confirmButtonColor: '#F8B711',
      });
    }
  }

  showComingSoonToast() {
    this.handleToast({
      typ: 'info',
      message: 'Coming Soon!',
    });
  }
}
