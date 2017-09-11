import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  car: any;
  location: any;

  constructor() {
    this.car = {
      "$class": "org.acme.vehicle.lifecycle.manufacturer.Order",
      "orderId": "3661e1ad-ee60-ab7f-47ba-08c3cea0ee0f",
      "vehicleDetails": {
        "$class": "org.vda.VehicleDetails",
        "make": "Arium",
        "modelType": "Nova",
        "colour": "vibrant grape",
        "vin": "45bff6b5c44851533"
      },
      "orderStatus": "DELIVERED",
      "statusUpdates": []
    };

    this.location = {
      coords: {
        accuracy: 20,
        latitude: 51.026252199999995,
        longitude: -1.397755
      },
      timestamp: 1505126421109
    };

    let webSocketURL = 'ws://localhost:1880/ws/location';

    console.log('connecting websocket', webSocketURL);
    let websocket = new WebSocket(webSocketURL);

    websocket.onopen = function () {
      console.log('location websocket open!');
    };

    websocket.onmessage = event => {
      this.location = JSON.parse(event.data);
      console.log(this.location);
    }
  }

  ngOnInit() {
  }

}
