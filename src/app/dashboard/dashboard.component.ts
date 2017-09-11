import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  order: any;

  constructor() {
    let webSocketURL = 'ws://localhost:1880/ws/insurecar';

    console.log('connecting websocket', webSocketURL);
    let websocket = new WebSocket(webSocketURL);

    websocket.onopen = function () {
      console.log('insurecar websocket open!');
    };

    websocket.onmessage = event => {
      this.order = JSON.parse(event.data);
      console.log(this.order);
    }

    // this.order = {
    //   "$class": "org.acme.vehicle.lifecycle.manufacturer.Order",
    //   "orderId": "3661e1ad-ee60-ab7f-47ba-08c3cea0ee0f",
    //   "vehicleDetails": {
    //     "$class": "org.vda.VehicleDetails",
    //     "make": "Arium",
    //     "modelType": "Nova",
    //     "colour": "vibrant grape",
    //     "vin": "45bff6b5c44851533"
    //   },
    //   "orderStatus": "DELIVERED",
    //   "statusUpdates": []
    // };
  }

  ngOnInit() {
  }

  reject() {
    delete this.order;
  }
}
