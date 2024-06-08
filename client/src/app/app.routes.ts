import { Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogCreateionComponent } from './component/blog-createion/blog-createion.component';
import { BlogsDashboardComponent } from './component/blogs-dashboard/blogs-dashboard.component';
import { UpdateBlogComponent } from './component/update-blog/update-blog.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-blog', component: BlogCreateionComponent },
  { path: 'blog', component: BlogsDashboardComponent },
  { path: 'update/:id', component: UpdateBlogComponent },
];
