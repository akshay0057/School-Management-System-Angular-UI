import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { HeaderComponent } from './shared/header/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar/sidebar.component';
import { LoaderComponent } from './shared/loader/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    LoaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  currentUrl = '';

  constructor(private router: Router) {

    // IMPORTANT
    this.currentUrl = this.router.url;

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {

        this.currentUrl = event.urlAfterRedirects;
      });
  }

  ngOnInit(): void {

    const token = localStorage.getItem('token');

    if (token) {
      this.router.navigate(['/dashboard']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  showLayout(): boolean {

    return ![
      '/login',
      '/signup'
    ].includes(this.currentUrl);
  }
}