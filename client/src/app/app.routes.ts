import { Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogCreateionComponent } from './component/blog-createion/blog-createion.component';
import { BlogsDashboardComponent } from './component/blogs-dashboard/blogs-dashboard.component';
import { UpdateBlogComponent } from './component/update-blog/update-blog.component';
import { AuthGuard } from './service/authGaurd.service';
import { NotFoundPageComponent } from './component/not-found-page/not-found-page.component';
import { ProfilePageComponent } from './component/profile-page/profile-page.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile/:id', component: ProfilePageComponent },
  {
    path: 'create-blog',
    component: BlogCreateionComponent},
  { path: 'blog', component: BlogsDashboardComponent },
  { path: 'update/:id', component: UpdateBlogComponent },
  { path: '**', component: NotFoundPageComponent },
];
