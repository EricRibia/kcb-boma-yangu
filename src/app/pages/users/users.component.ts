import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputSubmitComponent } from '../../components/forms/input-submit/input-submit.component';
import { InputControlComponent } from '../../components/forms/input-control/input-control.component';
import { ApiService } from '../../services/api.service';
import { finalize } from 'rxjs';
import * as moment from 'moment/moment';
import { AlertsService } from '../../services/alerts.service';
import { UtilsService } from '../../services/utils.service';
import { LoadersComponent } from '../../components/loaders/loaders.component';
import { GlobalVarsService } from '../../services/global-vars.service';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    InputSubmitComponent,
    InputControlComponent,
    ReactiveFormsModule,
    LoadersComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  usersFormSubmitted = false;
  submittingUsersForm = false;
  fetchingUsers: boolean = false;
  usersForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(256),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(256),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(256),
    ]),
  });

  constructor(
    private apiService: ApiService,
    private alertsService: AlertsService,
    private globalVarsService: GlobalVarsService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.listAllUsers();
  }
  cols: {
    label: string;
    value: string;
    twClasses?: string;
  }[] = [
    {
      label: 'Username',
      value: 'narration',
    },
    {
      label: 'First Name',
      value: 'amount',
    },
    {
      label: 'Last Name',
      value: 'recipients',
      twClasses: 'text-center',
    },
    {
      label: 'Actions',
      value: 'recipients',
      twClasses: 'text-center',
    },
  ];
  users: {
    username: string;
    id: number;
    firstName: string;
    lastName: string;
  }[] = [];
  processUsersForm() {
    const formData = this.usersForm.value;
    this.submittingUsersForm = true;
    this.apiService
      .createUsersApi({
        usrUsername: formData.username || '',
        usrLastname: formData.lastName || '',
        usrFirstname: formData.firstName || '',
      })
      .pipe(
        finalize(() => {
          this.submittingUsersForm = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.listAllUsers();
          this.usersForm.reset();
          this.usersForm.markAsPristine();
          this.alertsService.handleToast({
            typ: 'success',
            message: 'User successfully created',
          });
        },
        error: (e) => {
          this.alertsService.handleToast({
            typ: 'error',
            message: this.utilsService.extractErrorMessage(e),
          });
        },
      });
  }
  listAllUsers() {
    this.fetchingUsers = true;
    this.apiService
      .listUsersApi()
      .pipe(
        finalize(() => {
          this.fetchingUsers = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.users = response.payload.content.map((user) => ({
            username: user.usrUsername,
            firstName: user.usrFirstname,
            lastName: user.usrLastname,
            id: user.usrId,
          }));
        },
        error: (e) => {
          this.alertsService.handleToast({
            message: this.utilsService.extractErrorMessage(e),
            typ: 'error',
          });
        },
      });
  }

  editUser(userID: number) {}

  logOut() {
    this.globalVarsService.logOut();
  }
}
