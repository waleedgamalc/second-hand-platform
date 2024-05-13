import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { FirebaseService } from '../services/firebase.service';
import { UsernameService } from '../username.service';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit  {
  
  products: Product[] = [];
  totalSold: number = 0;
  totalAvailable: number = 0;
  username: string;
  pieChart: any;
  
  

  constructor(private firebaseService : FirebaseService , private usernameService : UsernameService ) {
    this.username = this.usernameService.username;
   }

  
  

  ngOnInit(): void {
this.firebaseService.getProductsForSeller(this.usernameService.username)
      .subscribe(data => {
        this.products = data;
        this.calculateCounts();
        this.createPieChart();
      }); 
    }
    calculateCounts() {
      this.totalSold = this.products.filter(listing => listing.state === 'Sold').length;
      this.totalAvailable = this.products.filter(listing => listing.state === 'Available').length;
    }
    createPieChart() {
      if (this.pieChart) {
        this.pieChart.destroy();
      }
      this.pieChart = new Chart('pieChart', {
        type: 'pie',
        data: {
          labels: ['Sold Products', 'Available Products'],
          datasets: [{
            data: [this.totalSold, this.totalAvailable],
            backgroundColor: ['#FF6384', '#36A2EB']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top'
            }
          },
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 20,
              bottom: 20
            }
          }
        }
      });

}
}
