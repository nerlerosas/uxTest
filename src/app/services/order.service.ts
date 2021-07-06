import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, filter , map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  //SIMULATION API
  data = [
    { jobsite : "First Avenue" , status : "Confirmed", order : 99820959, purcharseOrder : "7755-kj120/00011", productLine : "Bulk Cement", quantity : 3, dateSubited : "Sep 24,2020 p:38 AM", dateRequest : "Sep 23, 2020 4:45 PM" },
    { jobsite : "Centenial Mall" , status : "On Hold", order : 99820958, purcharseOrder : "7755-kj120/00012", productLine : "Ready Mix", quantity : 3, dateSubited : "Sep 24,2020 p:38 AM", dateRequest : "Sep 23, 2020 4:45 PM" },
    { jobsite : "North Bridge" , status : "Confirmed", order : 99820957, purcharseOrder : "7755-kj120/00013", productLine : "Bulk Cement", quantity : 3, dateSubited : "Sep 24,2020 p:38 AM", dateRequest : "Sep 23, 2020 4:45 PM" },
    { jobsite : "First Avenue" , status : "Confirmed", order : 99820956, purcharseOrder : "7755-kj120/00014", productLine : "Bulk Cement 2", quantity : 2, dateSubited : "Sep 24,2020 p:38 AM", dateRequest : "Sep 23, 2020 4:45 PM" },
    { jobsite : "First Avenue" , status : "Blocked", order : 99820955, purcharseOrder : "7755-kj120/00015", productLine : "Aggregates", quantity : 2, dateSubited : "Sep 24,2020 p:38 AM", dateRequest : "Sep 23, 2020 4:45 PM" },
    { jobsite : "North Bridge" , status : "Confirmed", order : 99820955, purcharseOrder : "7755-kj120/00016", productLine : "Aggregates", quantity : 6, dateSubited : "Sep 24,2020 p:38 AM", dateRequest : "Sep 23, 2020 4:45 PM" },
  ];

  statusOrder : string[] = ['Confirmed','On Hold','Blocked'];
  productLine : string[] = ['Bulk Cement','Bulk Cement 2', 'Ready Mix','Aggregates'];
  jobSites    : string[] = [ "First Avenue", "Centenial Mall", "North Bridge"];

  
  constructor() { }

  getJobSites() {
    return this.jobSites;
  }

  getProductLine(){
    return this.productLine;
  }

  getStatus(){
    return this.statusOrder;
  }


  getOrders (filters) : Observable<any>{
    return of(this.data).pipe(
      map( (registro) => {
        return  registro.filter( (r:any):any => {        
          return r;  
          // return (r.status == filters.status && filters.status != "") 
          // || (r.order.toString().includes(filters.orderId)) 
          // || (r.productLine == filters.productLine )
          // || (r.purcharseOrder.includes(filters.purcharseOrder))
          // || (r.quantity == filters.quantity )
        })
      } )
      , delay(1000) );
  }


  getOrdersFiltered(filters) : Observable<any>{

    return new Observable( observer => {
      let response =  this.data;

      if(parseInt(filters.orderId) != 0){
        response = response.filter( row =>  row.order.toString().includes(filters.orderId) );
        observer.next(response);
      }
       
      if(filters.status != "")
        response = response.filter( row => filters.status == row.status );
      
      if(filters.productLine != "")
        response = response.filter( row => filters.productLine == row.productLine );
      
      if(filters.jobsite != "")
        response = response.filter( row => filters.jobsite == row.jobsite );

      
      if(filters.purcharseOrder != "")  
        response = response.filter( row => row.purcharseOrder.includes(filters.purcharseOrder) );
      

      if(parseInt(filters.quantity) != 0)
        response = response.filter( row => filters.quantity == row.quantity );

      observer.next(response);
    });  
  }


}
