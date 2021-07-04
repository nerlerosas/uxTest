import { Component, OnInit } from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-filters',
  templateUrl: './fillters.component.html',
  styleUrls: ['./fillters.component.css']
})
export class FilltersComponent implements OnInit {

  @ViewChild('modalMensaje') modal: ElementRef;

  statusOrder : string[] = [];
  productLine : string[] = [];
  jobSites : string[] = [];
  filtered : boolean =  false;
  
  filters:any = {
    quantity : 0,
    status : '',
    productLine : '',
    jobsite : ''
  }

  // quantity : number = 0;
  // statusSelected : string = '';
  // productLineSelected : string = '';
  // jobSiteSelected : string = '';
  
   
  constructor(private modalService: NgbModal, private _orderService :OrderService) { 
    this.statusOrder = this._orderService.getStatus();
    this.productLine = this._orderService.getProductLine();
    this.jobSites = this._orderService.getJobSites();
  }

  ngOnInit(): void {
  }

  openModal(modal) :void {
    this.modalService.open(modal, { size: 'lg'});
  }

  aplyFilters() :void{
    this.checkFilters();
    this.modalService.dismissAll();
  }

  clearFilter():void{
    this.filtered = false;
    this.filters.jobsite ='';
    this.filters.status ='';
    this.filters.productLine ='';
  }
  
  addQuantity() :void{
    this.filters.quantity++;
  }

  minusQuantity() :void{
    if(this.filters.quantity == 0)
      return;

    this.filters.quantity--;
  }

  emptyFilter(filter) : void {
    switch (filter) {
      case 'status':
          this.filters.status = '';
        break;
      case 'productLine':
          this.filters.productLine = '';
        break;
      case 'jobsite':
          this.filters.jobsite = '';
        break;
      case 'quantity':
          this.filters.quantity = 0;
        break;
    
      default:
        break;
    }
    this.checkFilters();
  }

  checkFilters():void{
    if(this.filters.productLine != '' || this.filters.status != '' || this.filters.jobsite != '' || this.filters.quantity > 0){
      this.filtered = true;
      //TODO:: aplicar el filtrado a los 
    } else
      this.filtered = false;
  }

}
