import { Component, OnInit } from '@angular/core';

import { WindowRef } from '../window-ref.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent {

  car: any;
  location: any;
  L: any;

  constructor(private winRef: WindowRef) {
    this.L = winRef.nativeWindow.L;
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
    let location = [
      this.location.coords.latitude,
      this.location.coords.longitude
    ];

    let mymap = this.L.map('mapid').setView(location, 15);

    this.L.tileLayer('https://api.mapbox.com/styles/v1/annaet/cj7gaoimg3cnu2rqffansnqfl/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5uYWV0IiwiYSI6ImNpcXdkeTFhdzAwMnBodG5qZnhsa3pwNzgifQ.sLCy6WaD4pURO1ulOFoVCg', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      zoom: 14
    }).addTo(mymap);

    let carIcon = this.L.icon({
      iconUrl: '../../assets/images/car.png',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [-3, -76]
    });

    let marker = this.L.marker(location, {icon: carIcon}).addTo(mymap);
  }
}