import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxDateBoxModule, DxFormModule, DxSelectBoxModule } from 'devextreme-angular';
import { WorksComponent } from './pages/works/works.component';

import { DxButtonModule, DxDraggableModule, DxListModule, DxPopupModule, DxSchedulerModule, DxScrollViewModule, DxSortableModule } from 'devextreme-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'pages/works',
    component: WorksComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),
    DxDataGridModule,
    DxFormModule,
    DxScrollViewModule,
    DxSortableModule,
    DxButtonModule,
    DxListModule,
    BrowserAnimationsModule,
    DxPopupModule,
    DxFormModule,
    DxSchedulerModule,
    DxDraggableModule,
    DxScrollViewModule,
    DxSortableModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    FormsModule,
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent,
    WorksComponent,
  ]
})
export class AppRoutingModule { }
