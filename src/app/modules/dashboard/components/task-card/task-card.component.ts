import {Component, Input} from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {ModalFormComponent} from '../modal-form/modal-form.component';
import {MatDialog} from '@angular/material/dialog';
import {WordToNumberPipe} from '../../../../shared/pipes/word-to-number.pipe';
import {ReadableDatePipe} from '../../../../shared/pipes/readable-date.pipe';
import {ITask} from '../../../../core/models/task.model';
import {TaskService} from '../../../../core/services/task.service';
import {
  ConfirmationDialogComponent
} from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import {SnackbarService} from '../../../../shared/services/snackbar.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    WordToNumberPipe,
    ReadableDatePipe
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() task!: ITask;
  @Input() index!: number;

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private snackBarService: SnackbarService
  ) {
  }

  isOnTime(dueDate: string): boolean {
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    return taskDueDate > currentDate;
  }

  isAlmostLate(dueDate: string): boolean {
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    const diffInTime = taskDueDate.getTime() - currentDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return diffInDays <= 2 && diffInDays > 0;
  }

  isLate(dueDate: string): boolean {
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    return taskDueDate < currentDate;
  }

  updateTask(task: ITask) {
    this.dialog.open(ModalFormComponent, {
      width: '400px',
      data: {...task},
      disableClose: true
    });
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.snackBarService.showSuccess('Task deleted successfully');
    });
  }

  openDeleteConfirmation(taskId: string): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: 'Are you sure you want to delete this task?',
        title: 'Deleting task',
        confirmCallback: () => this.deleteTask(taskId)
      },
      disableClose: true
    });
  }

}
