import { Component, OnInit } from '@angular/core';

import { WindowRef } from '../window-ref/window-ref.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent {

  car: any;
  location: any;
  L: any;
  order: any;

  constructor(private winRef: WindowRef) {

    let webSocketURLAlerts = 'ws://localhost:1880/ws/updateorderstatus';
    
    let websocketAlerts = new WebSocket(webSocketURLAlerts);

    websocketAlerts.onopen = function () {
      console.log('Alerts websocket open!');
    };

    websocketAlerts.onmessage = event => {

      // ADD PARSING FOR MESSAGE ONCE FOUND OUT HOW IT WILL BE STYRUCTURED

      this.order = JSON.parse(event.data);

      document.getElementById('alert-holder').innerHTML = `<div id="`+this.order.transactionId+`" class="alert-block" _ngcontent-c2="" >
                                                                  <div class="left-column" _ngcontent-c2="" >
                                                                      <div class="notification-title" _ngcontent-c2="" ><img src="assets/images/loudspeaker.png" width="22px" height="14px" alt="loudspeaker icon" _ngcontent-c2="" />Alert!</div>
                                                                      <div class="alert-time" _ngcontent-c2="" >
                                                                          <div class="small-title" _ngcontent-c2="" >Accident</div>
                                                                          13 Jul 2017 07:35PM
                                                                      </div>
                                                                      <div class="event-details" _ngcontent-c2="" >
                                                                          <div class="tiny-header" _ngcontent-c2="" >Event ID</div>
                                                                          `+this.order.transactionId+`
                                                                      </div>
                                                                  </div>
                                                                  <div class="alert-detailed-data" _ngcontent-c2="" >
                                                                      <div class="data-field" _ngcontent-c2="">
                                                                          <div class="small-title" _ngcontent-c2="" >Acceleration</div>
                                                                          <span_ngcontent-c2="" >2.48g</span>
                                                                      </div>
                                                                      <div class="data-field" _ngcontent-c2="">
                                                                          <div class="small-title" _ngcontent-c2="" >Temperature</div>
                                                                          <span_ngcontent-c2="" >75f</span>
                                                                      </div>
                                                                      <div class="data-field" _ngcontent-c2="" >
                                                                          <div class="small-title" _ngcontent-c2="" >Humidity</div>
                                                                          <span _ngcontent-c2="" >15%</span>
                                                                      </div>
                                                                      <div class="data-field" _ngcontent-c2="" >
                                                                          <div class="small-title" _ngcontent-c2="" >x: 1.45</div>
                                                                          <div class="small-title" _ngcontent-c2="" >y: 2.48</div>
                                                                          <div class="small-title" _ngcontent-c2="" >z: 0.98</div>
                                                                      </div>
                                                                      <div class="data-field" _ngcontent-c2="" >
                                                                          <div class="small-title" _ngcontent-c2="" >Light</div>
                                                                          <span _ngcontent-c2="" >45lux</span>
                                                                      </div>
                                                                  </div>
                                                              </div>` + document.getElementById('alert-holder').innerHTML;
    }

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