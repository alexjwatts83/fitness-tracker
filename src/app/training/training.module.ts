import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { TrainingComponent } from './training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { TrainingRoutingModule } from './training.routing.module';

const components = [
  TrainingComponent,
  NewTrainingComponent,
  PastTrainingComponent,
  CurrentTrainingComponent
]

@NgModule({
  declarations: [components],
  imports: [
    SharedModule,
    TrainingRoutingModule
  ],
  exports: [components],
})
export class TrainingModule {}