import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';
import { CreateComponent } from './components/create/create.component';

const routes: Routes = [
    {
        path: 'create',
        component: CreateComponent,
    },
    {
        path: 'create/:id',
        component: CreateComponent,
    },
    {
        path: 'detail/:id',
        component: DetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class TaskRoutingModule {}
