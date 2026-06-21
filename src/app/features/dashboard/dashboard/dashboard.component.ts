import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { DashboardResponse } from '../../../core/models/response/dashboard.response';
import { DashboardService } from '../../../core/services/dashboard.service';
import { LoaderService } from '../../../core/services/loader.service';

import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  PieController,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartConfiguration,
  ChartOptions,
  ChartData
} from 'chart.js';

import { BaseChartDirective } from 'ng2-charts';

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  PieController,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale
);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  dashboardData!: DashboardResponse;

  constructor(
    private dashboardService: DashboardService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loaderService.show();

    this.dashboardService
      .getDashboardData()
      .subscribe({
        next: (response) => {

          this.dashboardData = response.data;

          this.loadAttendanceChart();

          this.loaderService.hide();
        },
        error: () => {

          this.loaderService.hide();
        }
      });
  }

  // PIE CHART
  pieChartData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [0, 0]
      }
    ]
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  loadAttendanceChart(): void {
    let present = this.dashboardData.todayStudentAttendance;
    let absent = Math.max(
      this.dashboardData.totalStudents - present,
      0
    );

    if (present === 0 && absent === 0) {
      present = 100;
      absent = 5;
    }

    this.pieChartData = {
      labels: ['Present', 'Absent'],
      datasets: [
        {
          data: [present, absent],
          backgroundColor: [
            '#10b981',
            '#ef4444'
          ],
          borderWidth: 0
        } as any
      ]
    };
  }

  // BAR CHART
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun'
    ],
    datasets: [
      {
        label: 'Fee Collection',
        data: [
          10000,
          15000,
          20000,
          18000,
          25000,
          22000
        ],
         backgroundColor: [
          '#6366F1',
          '#8B5CF6',
          '#06B6D4',
          '#10B981',
          '#F59E0B',
          '#EF4444'
        ] as string[],
        borderRadius: 8
      }
    ]
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    }
  };
}