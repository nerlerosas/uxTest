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

  quantity : number = 0;
  statusOrder : string[] = [];
  productLine : string[] = [];
  jobSites : string[] = [];

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

  closeModal() :void{
    this.modalService.dismissAll();
  }

  addQuantity() :void{
    this.quantity++;
  }

  minusQuantity() :void{
    if(this.quantity == 0)
      return;

    this.quantity--;
  }

}
