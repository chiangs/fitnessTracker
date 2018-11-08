import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScreenService } from '../shared/_services/screen.service';
import { Subscription } from 'rxjs';
import { TrainingService } from './_services/training.service';
import { IExercise } from './_interfaces/exercise.interface';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  screen$: Subscription;
  exercise$: Subscription;
  pastTraining$: Subscription;
  isDesktop: boolean;
  trainingSelected: IExercise;
  dataSource = new MatTableDataSource<IExercise>();

  constructor(
    private screenSvc: ScreenService,
    private trainingSvc: TrainingService
  ) {}

  ngOnInit() {
    this.screen$ = this.screenSvc
      .getDeviceSize()
      .subscribe(
        screen =>
          (this.isDesktop =
            !screen.isMobileSize && !screen.isPhoneSize ? true : false)
      );
    this.exercise$ = this.trainingSvc.exerciseChanged.subscribe(
      exercise => (this.trainingSelected = !!exercise ? exercise : null)
    );
    this.pastTraining$ = this.trainingSvc.pastExercisesChanged.subscribe(
      pastExercises => (this.dataSource.data = pastExercises)
    );
  }

  ngOnDestroy(): void {
    this.screen$.unsubscribe();
    this.exercise$.unsubscribe();
  }

  setSelectedTraining(event: any): void {
    this.trainingSvc.startExercise(event);
  }

  onStopTraining(event: any): void {
    this.trainingSelected = null;
    return event === 100
      ? this.trainingSvc.completeExercise()
      : this.trainingSvc.cancelExercise(event);
  }
}
