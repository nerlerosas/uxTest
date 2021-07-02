import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  data = [
    { status : "Confirmed", order : 99820959, purcharseOrder : "7755-kj120/00011", productLine : "Bulk Center", quantity : 3, dateSubited : "Sep 24,2020 p:38 AM", dateRequest : "Sep 23, 2020 4:45 PM" },
    { status : "On Hold", order : 99820959, purcharseOrder : "7755-kj120/00011", productLine : "Bulk Center", quantity : 3, dateSubited : "Sep 24,2020 p:38 AM", dateRequest : "Sep 23, 2020 4:45 PM" },
    { status : "Confirmed", order : 99820959, purcharseOrder : "7755-kj120/00011", productLine : "Bulk Center", quantity : 3, dateSubited : "Sep 24,2020 p:38 AM", dateRequest : "Sep 23, 2020 4:45 PM" },
    { status : "Confirmed", order : 99820959, purcharseOrder : "7755-kj120/00011", productLine : "Bulk Center", quantity : 3, dateSubited : "Sep 24,2020 p:38 AM", dateRequest : "Sep 23, 2020 4:45 PM" },
    { status : "Blocked", order : 99820959, purcharseOrder : "7755-kj120/00011", productLine : "Bulk Center", quantity : 3, dateSubited : "Sep 24,2020 p:38 AM", dateRequest : "Sep 23, 2020 4:45 PM" },
    { status : "Confirmed", order : 99820959, purcharseOrder : "7755-kj120/00011", productLine : "Bulk Center", quantity : 3, dateSubited : "Sep 24,2020 p:38 AM", dateRequest : "Sep 23, 2020 4:45 PM" },
  ];

  constructor() { }

  getOrders () : Observable<any>{
    return new Observable( observer => observer.next(this.data));  
  }
}
