import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  loading$!: Observable<boolean>;

  constructor(private loaderService: LoaderService) { 
    this.loading$ = this.loaderService.loading$;
  }

}
