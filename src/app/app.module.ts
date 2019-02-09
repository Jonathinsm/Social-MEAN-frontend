import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';
import { MomentModule } from 'angular2-moment';

//Custom Module

import { MessagesModule } from './messages/messages.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { PublicationsComponent } from './components/publications/publicatons.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';

//Services
import {UserService} from './services/user.service';
import {UserGuard} from './services/user.guard';

const routes: Route[] = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'mis-datos', component: UserEditComponent, canActivate:[UserGuard]},
  {path: 'gente', component: UsersComponent, canActivate:[UserGuard]},
  {path: 'gente/:page', component: UsersComponent, canActivate:[UserGuard]},
  {path: 'timeline', component: TimelineComponent, canActivate:[UserGuard]},
  {path: 'perfil/:id', component: ProfileComponent, canActivate:[UserGuard]},
  {path: 'siguiendo/:id/:page', component: FollowingComponent, canActivate:[UserGuard]},
  {path: 'seguidores/:id/:page', component: FollowedComponent, canActivate:[UserGuard]},
  {path: '**', component: HomeComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    PublicationsComponent,
    ProfileComponent,
    FollowingComponent,
    FollowedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MomentModule,
    MessagesModule
  ],
  providers: [
    UserService,
    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
