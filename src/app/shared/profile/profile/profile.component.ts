import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profile: any;
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.authService
      .getProfile()
      .subscribe({
        next: (response: any) => {
          this.profile = response.data;
        }
      });
  }
}
