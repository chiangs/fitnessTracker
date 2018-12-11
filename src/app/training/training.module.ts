import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SharedModule } from '../shared/shared.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingComponent } from './training.component';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent
  ],
  imports: [AngularFirestoreModule, SharedModule],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}
