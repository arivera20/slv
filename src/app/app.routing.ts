import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SlvComponent } from './components/slv/slv.component';


const routes: Routes = [

    { path: '', component: LoginComponent },
    { path: 'slv', component: SlvComponent },
     /*{ path: 'home', component: HomeComponent },
    { path: 'conciliation', component: ConciliationComponent },
    { path: 'slv', component: SlvComponent }
    */
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
