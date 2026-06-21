import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ProfileComponent } from './shared/profile/profile/profile.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: "full"},
    {path: "login", component: LoginComponent},
    {path: "dashboard", component: DashboardComponent, canActivate: [authGuard]},
    {path: "profile", component: ProfileComponent, canActivate: [authGuard]},
];
