import { Injectable } from '@angular/core';
import { IExercise } from '../_interfaces/exercise.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<IExercise>();
  pastExercisesChanged = new Subject<IExercise[]>();
  private availableExercise: IExercise[] = [
    { id: 'pushups', name: 'Pushups', duration: 30, calories: 8 },
    { id: 'situps', name: 'Situps', duration: 180, calories: 15 },
    { id: 'burpees', name: 'Burpees', duration: 120, calories: 18 },
    { id: 'body destroyer', name: 'Body Destroyer', duration: 60, calories: 8 }
  ];
  private runningExercise: IExercise;
  private exercises: IExercise[] = [];

  constructor() {}

  getExercises(): IExercise[] {
    return this.availableExercise.slice();
  }

  startExercise(exerciseId: string): void {
    const selectedExercise = this.availableExercise.find(
      item => item.id === exerciseId
    );
    this.runningExercise = selectedExercise;
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise(): void {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
    this.pastExercisesChanged.next(this.exercises);
  }

  cancelExercise(progressMade: number): void {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progressMade / 100),
      calories: this.runningExercise.calories * (progressMade / 100),
      date: new Date(),
      state: 'canceled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
    this.pastExercisesChanged.next(this.exercises);
  }
}
