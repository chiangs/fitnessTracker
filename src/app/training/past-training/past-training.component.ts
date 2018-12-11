import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  PageEvent
} from '@angular/material';
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
  pageSize = 1;
  pageSizeOptions = [1, 5, 10, 20];
  pageEvent: PageEvent;

  @ViewChild(MatSort)
  sort: MatSort;
  constructor() {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
