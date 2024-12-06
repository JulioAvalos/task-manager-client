import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../core/services/profile.service';
import {IProfile} from '../../core/models/profile.model';
import {DatePipe, NgIf} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {SnackbarService} from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    DatePipe,
    NgIf,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  profileData: IProfile | null = null;
  loading = true;

  constructor(
    private profileService: ProfileService,
    private snackBarService: SnackbarService
  ) {
  }

  ngOnInit() {
    this.fetchProfile();
  }

  fetchProfile() {
    const profileQueryRef = this.profileService.getProfile();
    profileQueryRef.valueChanges.subscribe({
      next: (result) => {
        this.profileData = result.data.profile;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBarService.showError("Error fetching profile");
      },
    });
  }

}
