import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { IExercise } from '../_interfaces/exercise.interface';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  @Input()
  dataSource: MatTableDataSource<IExercise>;
  displayedColumns: string[] = [
    'date',
    'name',
    'duration',
    'calories',
    'state'
  ];
  @ViewChild(MatSort)
  sort: MatSort;
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  filter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
