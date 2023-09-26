import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PasswordCardComponent } from './components/password-card.component';
import { PasswordStrengthCheckerComponent } from './components/password-strength-checker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordStrengthRuleComponent } from './components/rule/password-strength-rule.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordStrengthCheckerComponent,
    PasswordStrengthRuleComponent,
    PasswordCardComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
