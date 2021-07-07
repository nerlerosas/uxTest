import { Component, OnInit } from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/services/order.service';

import { Output, EventEmitter } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-filters',
  templateUrl: './fillters.component.html',
  styleUrls: ['./fillters.component.css']
})
export class FilltersComponent implements OnInit {

  @Output() filtersEvent = new EventEmitter<any>();

  @ViewChild('modalMensaje') modal: ElementRef;

  statusOrder : string[] = [];
  productLine : string[] = [];
  jobSites : string[] = [];
  filtered : boolean =  false;
  saveFilters : boolean = false;
  dataViewName: string = '';
  dataViews = [];

  filtersPrincipal:any = {
    jobSite : '',
    myDataView : '',
    orderId : ''
  }

  filters:any = {
    orderId : 0,
    quantity : 0,
    status : '',
    productLine : '',
    jobsite : '',
    purcharseOrder : ''
  }
 
  constructor(private modalService: NgbModal, private _orderService :OrderService, private _snackBar: MatSnackBar) { 
    this.statusOrder = this._orderService.getStatus();
    this.productLine = this._orderService.getProductLine();
    this.jobSites = this._orderService.getJobSites();
  }

  ngOnInit(): void {
  }

  changeValueFilter() {
    this.filtersEvent.emit(this.filters);
  }

  openModal(modal) :void {
    this.modalService.open(modal, { size: 'lg'});
  }

  aplyFilters() :void{
    
    if(this.saveFilters){
        if(this.dataViewName == ""){
           this._snackBar.open("Data view name is requiered", 'Info',{
            duration: 3000
          });
          return 
        }
      
      const newDataView = { name : this.dataViewName, filters : {...this.filters} };
      this.dataViews.push(newDataView);
      this.saveFilters = false;
      this.dataViewName = '';
    }
    this.checkFilters();
    this.modalService.dismissAll();
  }


  setJobsiteSelected():void{
    if(this.filtersPrincipal.jobSite != "")
      this.filters.jobsite = this.filtersPrincipal.jobSite;
    else
      this.filters.jobsite = "";
    
    this.checkFilters();
  }

  setFiltersSaved():void{
    if(this.filtersPrincipal.myDataView != ""){
      const info = this.dataViews.find( r => r.name == this.filtersPrincipal.myDataView );
      this.filters = {...info.filters};
    }else{
      this.filters = {
        orderId : 0,
        quantity : 0,
        status : '',
        productLine : '',
        jobsite : '',
        purcharseOrder : ''
      }
    }
    this.checkFilters();
  }

  clearFilter():void{
    this.saveFilters = false;
    this.dataViewName = '';
    this.filters.jobsite ='';
    this.filters.status ='';
    this.filters.productLine ='';
    this.filters.purcharseOrder ='';
    this.filters.quantity = 0;
    this.filters.orderId = 0;
    this.filtersPrincipal.myDataView = "";
    this.filtersPrincipal.jobSite = "";
    this.modalService.dismissAll();
    this.checkFilters();
  }

  addQuantity = (): number => this.filters.quantity++;

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
      case 'orderId':
          this.filters.orderId = 0;
        break;
      case 'purcharseOrder':
          this.filters.purcharseOrder = '';
        break;
    
      default:
        break;
    }
    this.checkFilters();
  }

  checkFilters():void{
    if(
        this.filters.purcharseOrder != '' 
        || this.filters.productLine != '' 
        || this.filters.status != '' 
        || this.filters.jobsite != '' 
        || this.filters.quantity > 0 
        || this.filters.orderId > 0
    ){
      this.filtered = true;
    } else{
      this.filtersPrincipal.myDataView = "";
      this.filtersPrincipal.jobSite = "";
      this.filtered = false;
    }
    this.changeValueFilter();
  }

  //Trash a row in the list "data views"
  trashDataView(name):void{
    this.filtersPrincipal.myDataView = "";
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want delete this option?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const filterData = this.dataViews.filter( r => r.name != name);
        this.dataViews = filterData;
        this.clearFilter();
        Swal.fire(
          'Deleted!',
          'the option was delete.',
          'success'
        )
      
      } 
    })
  }

  newDataViewElement(modal):void{
    this.saveFilters = true;
    this.openModal(modal);
  }


}