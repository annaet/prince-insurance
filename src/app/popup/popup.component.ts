import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input() orderDetails;

  constructor() {
  }

  ngOnInit() {
    console.log(this.orderDetails);
  }

  cancel() {
    console.log("click");
    delete this.orderDetails.vehicleDetails;
    delete this.orderDetails.orderId;
    delete this.orderDetails.$class;
    delete this.orderDetails.orderStatus;
    delete this.orderDetails.statusUpdates;
  }

}
