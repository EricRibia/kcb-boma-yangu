import { Component } from '@angular/core';
import { AuthLayoutComponent } from '../../components/auth-layout/auth-layout.component';
import { InputSubmitComponent } from '../../components/forms/input-submit/input-submit.component';
import { AlertsService } from '../../services/alerts.service';
import { InputControlComponent } from '../../components/forms/input-control/input-control.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { finalize } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { GlobalVarsService } from '../../services/global-vars.service';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    InputSubmitComponent,
    InputControlComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  isProcessingLogin = false;
  loginSubmitted = false;
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(256),
    ]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private alertsService: AlertsService,
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private globalVarsService: GlobalVarsService,
    private router: Router,
    private utilsService: UtilsService
  ) {}
  showComingSoon() {
    this.alertsService.showComingSoonToast();
  }
  processSigninForm() {
    const authData = this.loginForm.value;
    this.isProcessingLogin = true;
    this.apiService
      .loginApi({
        username: authData.username || '',
        password: authData.password || '',
      })
      .pipe(
        finalize(() => {
          this.isProcessingLogin = false;
        })
      )
      .subscribe({
        next: (r) => {
          this.localStorageService.setItem('access_token', r.token);
          this.globalVarsService.updateAuth();

          this.router.navigateByUrl('/users');

          this.alertsService.handleToast({
            typ: 'success',
            message: 'Successfully logged in!',
          });
        },
        error: (e: any) => {
          this.alertsService.handleToast({
            typ: 'error',
            message: this.utilsService.extractErrorMessage(e),
          });
        },
      });
  }
}
