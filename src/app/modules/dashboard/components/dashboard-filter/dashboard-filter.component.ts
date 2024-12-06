import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {NgForOf, NgIf} from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import {debounceTime} from 'rxjs';
import {UserService} from '../../../../core/services/user.service';
import {IUser} from '../../../../core/models/user.model';
import {WordToNumberPipe} from '../../../../shared/pipes/word-to-number.pipe';

@Component({
  selector: 'app-dashboard-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatRadioModule,
    NgIf,
    NgForOf,
    MatChipsModule,
    WordToNumberPipe
  ],
  templateUrl: './dashboard-filter.component.html',
  styleUrls: ['./dashboard-filter.component.scss']
})
export class DashboardFilterComponent implements OnInit {
  @Output() filterApplied = new EventEmitter<any>();

  filterForm: FormGroup;
  pointEstimates = ['EIGHT', 'FOUR', 'TWO', 'ONE', 'ZERO'];
  statuses = ['BACKLOG', 'CANCELLED', 'DONE', 'IN_PROGRESS', 'TODO'];
  tags = ['ANDROID', 'IOS', 'NODE_JS', 'RAILS', 'REACT'];
  users: IUser[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.filterForm = this.fb.group({
      name: [''],
      pointEstimate: [''],
      assigneeId: [''],
      status: [''],
      tags: [[]],
      ownerId: [''],
      dueDate: ['']
    });

    this.filterForm.valueChanges.pipe(debounceTime(300)).subscribe((filterValues) => {
      const nonEmptyValues = this.filterNonEmptyValues(filterValues);
      this.filterApplied.emit(nonEmptyValues);
    });
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(({data}) => {
      this.users = data.users;
    });
  }

  clearField(field: string) {
    this.filterForm.get(field)?.reset();
    if (field === 'tags') {
      const tagsArray = this.filterForm.get('tags') as FormArray;
      tagsArray.controls?.forEach(control => control.setValue(false));
    }
  }

  getSelectedCount(filter: string) {
    const selected = this.filterForm.get(filter)?.value;
    return selected ? (Array.isArray(selected) ? selected.length : 1) : 0;
  }

  toggleTagSelection(tag: string) {
    const tags = this.filterForm.get('tags')?.value || [];
    if (tags.includes(tag)) {
      const updatedTags = tags.filter((selectedTag: string) => selectedTag !== tag);
      this.filterForm.get('tags')?.setValue(updatedTags);
    } else {
      this.filterForm.get('tags')?.setValue([...tags, tag]);
    }
  }

  private filterNonEmptyValues(filterValues: any): Record<string, any> {
    const filteredValues: Record<string, any> = {};
    for (const key in filterValues) {
      const value = filterValues[key];
      const isValid = value !== null && value !== undefined && value !== '' &&
        (!Array.isArray(value) || value.length > 0) && (typeof value !== 'object' || value instanceof Date || Object.keys(value).length > 0);
      if (isValid) {
        filteredValues[key] = value;
      } else {
      }
    }
    return filteredValues;
  }

}
