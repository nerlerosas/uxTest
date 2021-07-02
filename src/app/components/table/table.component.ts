import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {

  data = [];
  suscriber : Subscription ;
  loading : boolean = true;

  constructor(private _orderService : OrderService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.suscriber = this._orderService.getOrders()
      .subscribe( response => {
        this.data = response;
        this.loading = false;
       })
    }, 1000);
  }

  ngOnDestroy(): void {
    this.suscriber.unsubscribe();
  }

}
