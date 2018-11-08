import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrainingService } from '../_services/training.service';
import { IExercise } from '../_interfaces/exercise.interface';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  @Input()
  isDesktop: boolean;
  @Output()
  startTraining: EventEmitter<void> = new EventEmitter<void>();
  newTrainingForm: FormGroup;
  formGroupOptions: any;
  exercises: IExercise[];

  constructor(private fb: FormBuilder, private trainingSvc: TrainingService) {
    this.exercises = this.trainingSvc.getExercises();
    this.formGroupOptions = {
      trainingType: ['', [Validators.required]]
    };
  }

  ngOnInit() {
    this.newTrainingForm = this.fb.group(this.formGroupOptions);
  }

  onStartTraining({ value, valid }: { value: any; valid: boolean }): void {
    if (!valid || !this.newTrainingForm.touched) {
      return;
    }
    this.startTraining.emit(value.trainingType);
  }
}
