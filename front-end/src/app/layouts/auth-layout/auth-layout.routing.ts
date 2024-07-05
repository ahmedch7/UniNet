import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { ValidateEmailComponent } from 'src/app/pages/validate-email/validate-email.component';
import { ForgotPasswordComponent } from 'src/app/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'src/app/pages/reset-password/reset-password.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'validate-email', component: ValidateEmailComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path:'reset-password', component: ResetPasswordComponent }
];
