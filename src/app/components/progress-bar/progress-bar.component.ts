import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  standalone: true,
  selector: 'progress-bar',
  template: `
    <div class="w-full bg-gray-200 rounded-full h-3 mt-5">
      <div
        class="bg-slate-600 h-2.5 rounded-full progress-bar-animation"
        [style.width.%]="progress"
      ></div>
    </div>
  `,
  styles: [
    `
      .progress-bar-animation {
        transition: width 0.3s ease-in-out; /* Adjust the duration and easing as needed */
      }
    `,
  ],
  imports: [FontAwesomeModule, NgStyle],
})
export class ProgressBarComponent {
  @Input() public progress: number;
}
