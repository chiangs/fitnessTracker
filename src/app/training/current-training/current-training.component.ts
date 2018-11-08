import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { IExercise } from '../_interfaces/exercise.interface';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  @Input()
  selectedTraining: IExercise;
  @Input()
  isDesktop: boolean;
  @Output()
  trainingExit: EventEmitter<number> = new EventEmitter();
  timer: number;
  onGoingTraining = false;
  progress = 0;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer(): void {
    const step = (this.selectedTraining.duration / 100) * 1000;
    this.timer = window.setInterval(() => {
      this.progress += 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
        this.trainingExit.emit(this.progress);
      }
    }, step);
  }

  onStop(): void {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef
      .afterClosed()
      .subscribe(
        result =>
          result
            ? this.trainingExit.emit(this.progress)
            : this.startOrResumeTimer()
      );
  }
}
