import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';
import { AuthGaurd } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'training',
    component: TrainingComponent,
    canActivate: [AuthGaurd]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGaurd]
})

export class TrainingRoutingModule {}