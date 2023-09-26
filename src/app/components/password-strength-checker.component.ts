import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ReplaySubject, merge, takeUntil } from 'rxjs';
import { PasswordStrengthRuleComponent } from './rule';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from './progress-bar/';

@Component({
  standalone: true,
  selector: 'password-strength-checker',
  imports: [PasswordStrengthRuleComponent, CommonModule, ProgressBarComponent],
  template: `
    <div class="grid grid-cols-2 gap-2 mt-5">
      <div *ngFor="let rule of passwordRules" class="m-0 text-sm">
        <password-strength-rule
          [error]="formPasswordErrors[rule.id]"
          [label]="rule.label"
        />
      </div>
    </div>
    <progress-bar [progress]="progressBarStrength"></progress-bar>
  `,
})
export class PasswordStrengthCheckerComponent implements OnInit, OnDestroy {
  @Input() public passwordFormControlName: string;
  @Input() public confirmPasswordFormControlName: string;
  @Input() public form: UntypedFormGroup;
  @Output() public onCheckFormValidity = new EventEmitter<boolean>();
  public progress: number = 0;
  public progressBarStrength: number = 0;

  private $destroyed = new ReplaySubject<void>(1);

  public passwordRules = [
    { id: 'invalidLength', label: 'Invalid Length' },
    { id: 'noSpecialChar', label: 'No special symbol' },
    { id: 'doNotMatch', label: 'Do not match' },
    { id: 'noUppercase', label: 'No UpperCase' },
    { id: 'noLowercase', label: 'No LowerCase' },
    { id: 'noNumber', label: 'No Number' },
  ];

  public get formPasswordErrors() {
    return {
      ...this.form.get(this.passwordFormControlName)?.errors,
      ...this.form.errors,
    };
  }

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    merge(
      this.form.controls[this.passwordFormControlName].valueChanges,
      this.form.controls[this.confirmPasswordFormControlName].valueChanges
    )
      .pipe(takeUntil(this.$destroyed))
      .subscribe(() => {
        this.updateProgressBar();
        this.isFormValid();
      });
  }

  ngOnDestroy(): void {
    this.$destroyed.next();
    this.$destroyed.complete();
  }

  public updateProgressBar(): void {
    this.form.updateValueAndValidity();
    const passwordChecksNeeded = this.passwordRules.length;
    const progressFill = 100 / passwordChecksNeeded;
    this.progress = 0;

    this.passwordRules.forEach((rule) => {
      if (!this.formPasswordErrors[rule.id]) {
        this.progress += progressFill;
      }
    });

    this.progress = Math.round(this.progress);
    this.progress = Math.min(this.progress, 100);

    if (this.form.get('password')?.value === '') {
      this.progress = 0;
    }

    this.progressBarStrength = this.progress;
  }

  public isFormValid(): any {
    this.form.updateValueAndValidity();

    if (!this.form.errors) {
      return false;
    }
  }
}
