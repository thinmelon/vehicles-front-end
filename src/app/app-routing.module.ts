import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGuard} from './services/authentication.service';
import {IndexComponent} from './index/index.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
    {
        path: 'index',
        canActivate: [LoginGuard],
        component: IndexComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {enableTracing: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
