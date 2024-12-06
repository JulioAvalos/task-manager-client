import {Component, Input} from '@angular/core';
import {EmptyStateComponent} from '../empty-state/empty-state.component';
import {TaskCardComponent} from '../task-card/task-card.component';
import {CommonModule} from '@angular/common';
import {ITask} from '../../../../core/models/task.model';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, TaskCardComponent, EmptyStateComponent],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss'
})
export class ColumnComponent {
  @Input() column!: { title: string; tasks: ITask[] };
}
