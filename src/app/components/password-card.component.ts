import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordMatchValidator, passwordValidator } from './validators';
import { PasswordStrengthCheckerComponent } from './password-strength-checker.component';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  standalone: true,
  selector: 'password-card',
  imports: [
    PasswordStrengthCheckerComponent,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  template: `
    <div class="flex justify-center items-center h-screen">
      <div
        class="p-4 bg-white border border-gray-200 rounded-lg shadow p-8 m-6 w-full md:w-8/12 lg:w-7/12 xl:w-4/12"
      >
        <form class="space-y-6" [formGroup]="formPassword">
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">
            Password strength checker
          </h5>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Choose Password</label
            >
            <div class="relative">
              <input
                id="password"
                formControlName="password"
                [placeholder]="'************'"
                [type]="isPasswordVisible ? 'text' : 'password'"
                name="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
              <div
                class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                (click)="togglePasswordVisibility()"
              >
                <fa-icon
                  [icon]="isPasswordVisible ? faEye : faEyeSlash"
                ></fa-icon>
              </div>
            </div>
          </div>
          <div>
            <label
              for="check-password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Confirm password</label
            >
            <div class="relative">
              <input
                formControlName="confirmPassword"
                [type]="isPasswordVisible ? 'text' : 'password'"
                name="check-password"
                id="check-password"
                placeholder="************"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
              <div
                class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                (click)="togglePasswordVisibility()"
              >
                <fa-icon
                  [icon]="isPasswordVisible ? faEye : faEyeSlash"
                ></fa-icon>
              </div>
            </div>
          </div>

          <password-strength-checker
            [passwordFormControlName]="'password'"
            [confirmPasswordFormControlName]="'confirmPassword'"
            [form]="formPassword"
          ></password-strength-checker>

          <button
            [disabled]="formPassword.errors === null"
            type="submit"
            class="w-full text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  `,
})
export class PasswordCardComponent {
  public formPassword: FormGroup;
  isPasswordVisible: boolean = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(private fb: FormBuilder) {
    this.formPassword = this.fb.group(
      {
        password: ['', [Validators.required, passwordValidator]],
        confirmPassword: ['', [Validators.required, passwordValidator]],
      },
      {
        validators: [passwordMatchValidator('password', 'confirmPassword')],
      }
    );
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
