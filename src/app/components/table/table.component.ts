import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Subscription } from 'rxjs';
import {  finalize } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {

  data = [];
  suscriber$ : Subscription ;
  loading : boolean = true;

  filters:any = {
    status : "",
    orderId :  "",
    productLine: "",
    jobsite: "",
    quantity : 0
  }

  constructor(private _orderService : OrderService) { }

  ngOnInit(): void {
    this.suscriber$ = this._orderService.getOrders(this.filters)
    .pipe( finalize( () => this.loading = false ))
    .subscribe( response => this.data = response );
  }

  ngOnDestroy(): void {
    this.suscriber$.unsubscribe();
  }

  aplyFilters(filter):void{
    this.loading = true;
    setTimeout(() => {
      this._orderService.getOrdersFiltered(filter).subscribe( response => {
        this.data = response;
        this.loading = false;
      })
    }, 500);
  }

}
