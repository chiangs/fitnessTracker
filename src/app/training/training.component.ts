import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { ScreenService } from '../shared/_services/screen.service';
import { IExercise } from './_interfaces/exercise.interface';
import { TrainingService } from './_services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  screen$: Subscription;
  exercise$: Subscription;
  exercises$: Subscription;
  finishedExercises$: Subscription;
  isDesktop: boolean;
  trainingSelected: IExercise;
  exercises: IExercise[];
  dataSource = new MatTableDataSource<IExercise>();

  constructor(
    private screenSvc: ScreenService,
    private trainingSvc: TrainingService
  ) {}

  ngOnInit() {
    this.trainingSvc.fetchExercises();
    this.trainingSvc.fetchPastExercises();
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
    this.exercises$ = this.trainingSvc.exercisesChanged.subscribe(
      exercises => (this.exercises = exercises)
    );
    this.finishedExercises$ = this.trainingSvc.finishedExercisesChanged.subscribe(
      finishedExercises => (this.dataSource.data = finishedExercises)
    );
  }

  ngOnDestroy(): void {
    this.screen$.unsubscribe();
    this.exercise$.unsubscribe();
    this.exercises$.unsubscribe();
    this.finishedExercises$.unsubscribe();
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
