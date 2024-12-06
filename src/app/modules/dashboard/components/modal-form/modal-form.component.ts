import {Component, Inject, OnInit} from '@angular/core';
import {MatError, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MatDatepickerModule,
} from '@angular/material/datepicker';
import {MatOption, MatSelect} from '@angular/material/select';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import {UserService} from '../../../../core/services/user.service';
import {MatCardAvatar} from '@angular/material/card';
import {TaskService} from '../../../../core/services/task.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {lastValueFrom} from 'rxjs';
import {SnackbarService} from '../../../../shared/services/snackbar.service';
import {ITask} from '../../../../core/models/task.model';
import {IUser} from '../../../../core/models/user.model';

@Component({
  selector: 'app-modal-form',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelect,
    MatOption,
    MatLabel,
    MatError,
    NgIf,
    MatButton,
    NgForOf,
    MatCardAvatar,
    MatProgressBarModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.scss'
})
export class ModalFormComponent implements OnInit {

  taskForm: FormGroup;
  users: IUser[] = [];
  isLoading = false;
  isUpdating = false;

  pointEstimateOptions = [
    {value: 'EIGHT', label: 8},
    {value: 'FOUR', label: 4},
    {value: 'ONE', label: 1},
    {value: 'TWO', label: 2},
    {value: 'ZERO', label: 0},
  ];

  tagOptions = [
    {value: 'ANDROID', label: 'Android'},
    {value: 'IOS', label: 'iOS'},
    {value: 'NODE_JS', label: 'Node.js'},
    {value: 'RAILS', label: 'Rails'},
    {value: 'REACT', label: 'React'},
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalFormComponent>,
    private userService: UserService,
    private taskService: TaskService,
    private snackBarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: ITask
  ) {
    if(data) { this.isUpdating = true; }
    this.taskForm = this.fb.group({
      id: [this.data?.id || ''],
      name: [this.data?.name || '', Validators.required],
      pointEstimate: [this.data?.pointEstimate || '', Validators.required],
      assigneeId: [this.data?.assignee.id, Validators.required],
      tags: [this.data?.tags || [], Validators.required],
      dueDate: [this.data?.dueDate || '', Validators.required],
      status: [this.data?.status || 'BACKLOG', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe(({ data }) =>  {
      this.users = data.users;
      this.isLoading = false;
    });
  }

  async onSubmit() {
    if (this.taskForm.valid) {
      this.isLoading = true;
      try {
        const formValues = this.taskForm.value;
        let response;

        if (this.isUpdating) {
          response = await lastValueFrom(this.taskService.updateTask(formValues));
        } else {
          const { id, ...formValuesWithoutId } = formValues;
          response = await lastValueFrom(this.taskService.createTask(formValuesWithoutId));
        }

        if (response?.data) {
          this.snackBarService.showSuccess(`Task ${this.isUpdating ? 'updated' : 'created'} successfully`);
          this.dialogRef.close(formValues);
          this.taskForm.reset();
        } else {
          this.snackBarService.showError(`Failed to ${this.isUpdating ? 'update' : 'create'} task. Please try again.`);
        }
      } catch (error) {
        this.snackBarService.showError(`An error occurred while ${this.isUpdating ? 'updating' : 'creating'} the task.`);
      } finally {
        this.isLoading = false;
      }
    }
  }

  onCloseForm() {
    this.dialogRef.close();
    this.taskForm.reset();
  }

}
