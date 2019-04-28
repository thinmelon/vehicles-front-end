import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {LoginGuard} from './services/authentication.service';

const routes: Routes = [
    {
        path: 'index',
        canActivate: [LoginGuard],
        component: IndexComponent
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
