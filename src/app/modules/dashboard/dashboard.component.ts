import {Component, OnInit} from '@angular/core';
import {MatMiniFabButton} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {Router} from '@angular/router';
import {catchError, of, Subject, switchMap} from 'rxjs';
import {ColumnComponent} from './components/column/column.component';
import {IDashboardData} from '../../core/models/dashboard.model';
import {ITask} from '../../core/models/task.model';
import {ModalFormComponent} from './components/modal-form/modal-form.component';
import {TaskService} from '../../core/services/task.service';
import {DashboardFilterComponent} from './components/dashboard-filter/dashboard-filter.component';
import {SnackbarService} from '../../shared/services/snackbar.service';
import {SkeletonComponent} from './components/skeleton/skeleton.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ColumnComponent,
    MatMiniFabButton,
    MatGridListModule,
    MatCardModule,
    NgForOf,
    MatChipsModule,
    NgIf,
    MatTooltipModule,
    DashboardFilterComponent,
    SkeletonComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  tasks: ITask [] = [];
  isLoading = true;

  private filterSubject = new Subject<any>();

  columns: IDashboardData [] = [
    {title: 'Backlog', tasks: []},
    {title: 'Cancelled', tasks: []},
    {title: 'Done', tasks: []},
    {title: 'In Progress', tasks: []},
    {title: 'Todo', tasks: []}
  ];

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private snackBarService: SnackbarService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.filterSubject.pipe(
      switchMap((filterValues) => {
        return this.taskService.getTasks(filterValues).valueChanges.pipe(
          catchError(() => {
            this.isLoading = false;
            this.snackBarService.showError("Error while fetching tasks");
            return of({ data: { tasks: [] } });
          })
        );
      })
    ).subscribe({
      next: (result: any) => {
        this.isLoading = false;
        this.tasks = result?.data.tasks;
        this.updateColumns();
      }
    });

    this.fetchTasks();
  }

  fetchTasks() {
    this.isLoading = true;
    this.filterSubject.next({tags: ["REACT", "ANDROID", "IOS", "NODE_JS", "RAILS"]});
  }

  updateColumns() {
    this.columns = this.columns.map((column: { title: string; }) => ({
      ...column,
      tasks: this.tasks.filter(task => task.status.toUpperCase() === column.title.replace(' ', '_').toUpperCase())
    }));
  }

  openModal() {
    this.dialog.open(ModalFormComponent, {
      width: '400px',
      disableClose: true,
    });
  }

  applyFilter(filterValues: any) {
    this.isLoading = true;
    this.filterSubject.next(filterValues);
  }

  goToPage(): void {
    this.router.navigate(['/settings']);
  }

}

