//Modules
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MomentModule} from 'angular2-moment';
import { RouterModule, Route } from '@angular/router';

//Components
import {MainComponent} from './components/main/main.component';
import {AddComponent} from './components/add/add.component';
import {ReceivedComponent} from './components/received/received.component';
import {SendedComponent} from './components/sended/sended.component';

//Services
import {UserService} from '../services/user.service';
import {UserGuard} from '../services/user.guard';

const messagesRoutes: Route[] = [
    {
        path: 'mensajes',
        component:MainComponent,
        children:[
            {path:'',redirectTo:'recibidos',pathMatch:'full'},
            {path:'enviar', component: AddComponent, canActivate:[UserGuard]},
            {path:'recibidos', component: ReceivedComponent, canActivate:[UserGuard]},
            {path:'recibidos/:page', component: ReceivedComponent, canActivate:[UserGuard]},
            {path:'enviados', component: SendedComponent, canActivate:[UserGuard]},
            {path:'enviados/:page', component: SendedComponent, canActivate:[UserGuard]},
        ]
    }
  
  ];

@NgModule({
    declarations:[
        MainComponent,
        AddComponent,
        ReceivedComponent,
        SendedComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        RouterModule.forChild(messagesRoutes),
        MomentModule
    ],
    exports:[
        MainComponent,
        AddComponent,
        ReceivedComponent,
        SendedComponent
    ],
    providers:[
        UserService,
        UserGuard
    ]
})

export class MessagesModule{}