import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './tasks/components/detail/detail.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
