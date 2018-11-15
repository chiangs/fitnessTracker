import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IExercise } from '../_interfaces/exercise.interface';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<IExercise>();
  exercisesChanged = new Subject<IExercise[]>();
  finishedExercisesChanged = new Subject<IExercise[]>();
  private availableExercises: IExercise[];
  private runningExercise: IExercise;
  private finishedExercises: IExercise[] = [];
  private availableExercisesCollection = 'availableExercises';
  private finishedExercisesCollection = 'finishedExercises';

  constructor(private fireDB: AngularFirestore) {}

  fetchExercises(): void {
    this.fireDB
      .collection(this.availableExercisesCollection)
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return this.mapExerciseData(doc);
          });
        })
      )
      .subscribe((exercises: IExercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }

  startExercise(exerciseId: string): void {
    const selectedExercise = this.availableExercises.find(
      item => item.id === exerciseId
    );
    this.runningExercise = selectedExercise;
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise(): void {
    this.addExerciseToDB({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
    // this.finishedExercisesChanged.next(this.finishedExercises);
  }

  cancelExercise(progressMade: number): void {
    this.addExerciseToDB({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progressMade / 100),
      calories: this.runningExercise.calories * (progressMade / 100),
      date: new Date(),
      state: 'canceled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
    // this.finishedExercisesChanged.next(this.finishedExercises);
  }

  fetchPastExercises() {
    this.fireDB
      .collection(this.finishedExercisesCollection)
      .valueChanges()
      .subscribe((exercises: IExercise[]) =>
        this.finishedExercisesChanged.next(exercises)
      );
  }

  private mapExerciseData(doc: any): IExercise {
    return {
      id: doc.payload.doc.id,
      ...doc.payload.doc.data()
    };
  }

  private addExerciseToDB(exercise: IExercise): void {
    this.fireDB
      .collection(this.finishedExercisesCollection)
      .add(exercise)
      .then()
      .catch(error => console.log(error));
  }
}
