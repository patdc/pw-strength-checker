import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'password-strength-rule',
  template: `
    <div>
      <fa-icon
        [icon]="error ? faTimesCircle : faCheckCircle"
        [ngStyle]="{ color: error ? dangerColor : successColor }"
      >
      </fa-icon>
      {{ label }}
    </div>
  `,
  imports: [FontAwesomeModule, NgStyle],
})
export class PasswordStrengthRuleComponent {
  @Input() public error: boolean;
  @Input() public label: string;
  public dangerColor = '#e11d48';
  public successColor = '#65a30d';

  public faTimesCircle = faTimesCircle;
  public faCheckCircle = faCheckCircle;
}
