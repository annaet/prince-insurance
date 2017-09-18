import { Component, OnInit } from '@angular/core';

import { WindowRef } from '../window-ref/window-ref.service';

import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent {

  car: any;
  location: any;
  L: any;
  alert: any;
  policy: any;
  vehicle_data: any;
  last_event_id: string;

  constructor(private winRef: WindowRef) {

    this.last_event_id = "BLANK";

    let webSocketURLAlerts = 'ws://localhost:1880/ws/addusageevent';
    
    let websocketAlerts = new WebSocket(webSocketURLAlerts);

    websocketAlerts.onopen = function () {
      console.log('Alerts websocket open!');
    };

    websocketAlerts.onmessage = event => {


      this.alert = JSON.parse(event.data);

      if(this.last_event_id == this.alert.eventId) // EVENT SOMETIMES FIRES MORE THAN ONCE, THIS PREVENTS SAME MESSAGE APPEARING OVER AND OVER
      {
        return;
      }

      this.last_event_id = this.alert.eventId;

      //{"$class":"org.vda.AddUsageEventEvent","vin":"53f09d9655d751049","usageEvents":{"$class":"org.vda.UsageEvent","eventType":"ACCIDENT","acceleration":25,"temperature":10,"humidity":12,"light_level":20},"eventId":"a1e0f0a4-3df8-4c5b-ad23-53dc6db27a0d#0","timestamp":"2017-09-18T12:41:15.536Z","_msgid":"c936f38a.0c1a7"} 1 main.bundle.js:296:13
      

      document.getElementById('alert-holder').innerHTML = `<div id="`+this.alert.usageEvent.eventID+`" class="alert-block" _ngcontent-c2="" >
                                                                  <div class="left-column" _ngcontent-c2="" >
                                                                      <div class="notification-title" _ngcontent-c2="" ><img src="assets/images/loudspeaker.png" width="22px" height="14px" alt="loudspeaker icon" _ngcontent-c2="" />Alert!</div>
                                                                      <div class="alert-time" _ngcontent-c2="" >
                                                                          <div class="small-title" _ngcontent-c2="" >
                                                                          `+this.alert.usageEvent.eventType+`
                                                                          </div>
                                                                          `+new Date(this.alert.timestamp).toLocaleString()+`
                                                                      </div>
                                                                      <div class="event-details" _ngcontent-c2="" >
                                                                          <div class="tiny-header" _ngcontent-c2="" >Event ID</div>
                                                                          `+this.alert.usageEvent.eventID+`
                                                                      </div>
                                                                  </div>
                                                                  <div class="alert-detailed-data" _ngcontent-c2="" >
                                                                      <div class="data-field" _ngcontent-c2="">
                                                                          <div class="small-title" _ngcontent-c2="" >Acceleration</div>
                                                                          <span _ngcontent-c2="" >`+this.alert.usageEvent.acceleration+`G</span>
                                                                      </div>
                                                                      <div class="data-field" _ngcontent-c2="">
                                                                          <div class="small-title" _ngcontent-c2="" >Temperature</div>
                                                                          <span _ngcontent-c2="" >`+this.alert.usageEvent.temperature+`F</span>
                                                                      </div>
                                                                      <div class="data-field" _ngcontent-c2="" >
                                                                          <div class="small-title" _ngcontent-c2="" >Humidity</div>
                                                                          <span _ngcontent-c2="" >`+this.alert.usageEvent.humidity+`%</span>
                                                                      </div>
                                                                      <div class="data-field" _ngcontent-c2="" >
                                                                          <div class="small-title" _ngcontent-c2="" >x: 1.45</div>
                                                                          <div class="small-title" _ngcontent-c2="" >y: 2.48</div>
                                                                          <div class="small-title" _ngcontent-c2="" >z: 0.98</div>
                                                                      </div>
                                                                      <div class="data-field" _ngcontent-c2="" >
                                                                          <div class="small-title" _ngcontent-c2="" >Light</div>
                                                                          <span _ngcontent-c2="" >`+this.alert.usageEvent.light_level+`G</span>
                                                                      </div>
                                                                  </div>
                                                              </div>` + document.getElementById('alert-holder').innerHTML;
    }

    this.L = winRef.nativeWindow.L;

    this.car = {
      $class: "org.vda.Vehicle",
      vin: "UNKNOWN",
      vehicleDetails: {
        $class: "org.vda.VehicleDetails",
        make: "UNKNOWN",
        modelType: "UNKNOWN",
        colour: "UNKNOWN",
        vin: "UNKNOWN"
      },
      vehicleStatus: "UNKNOWN",
      owner: "resource:org.acme.vehicle.lifecycle.PrivateOwner#dan",
      logEntries: []
    }

    this.policy = {
      $class: "org.insurance.Policy",
      policyID: "",
      vId: "",
      holder: "",
      insurer: "",
      policyType: ""
    }

    //console.log(this.policy.vId)
    //this.car = this.policy.vId

    this.location = {
      coords: {
        accuracy: 20,
        latitude: 51.026252199999995,
        longitude: -1.397755
      },
      timestamp: 1505126421109
    };

    // let webSocketURL = 'ws://localhost:1880/ws/location';

    // console.log('connecting websocket', webSocketURL);
    // let websocket = new WebSocket(webSocketURL);

    // websocket.onopen = function () {
    //   console.log('location websocket open!');
    // };

    // websocket.onmessage = event => {
    //   this.location = JSON.parse(event.data);
    //   console.log(this.location);
    // }

    let webSocketIoTURL = 'ws://blockchain-tt-demo.mybluemix.net/ws/iot';

    console.log('connecting websocket', webSocketIoTURL);
    let websocketIoT = new WebSocket(webSocketIoTURL);

    websocketIoT.onopen = function () {
      console.log('iot websocket open!');
    };

    websocketIoT.onmessage = event => {
      this.vehicle_data = JSON.parse(event.data).d;

      // ACCELERATION
      let magnitude = 100*Math.sqrt((this.vehicle_data.accX*this.vehicle_data.accX)+(this.vehicle_data.accY*this.vehicle_data.accY)+(this.vehicle_data.accZ*this.vehicle_data.accZ))
      document.querySelectorAll("#acc-data span")[0].innerHTML = Math.round(magnitude) + "G";

      // AMBIENT TEMP
      document.querySelectorAll("#temp-data span")[0].innerHTML = Math.round(this.vehicle_data.AmbTemp* 9 / 5 + 32) + "F";

      // HUMIDITY
      document.querySelectorAll("#humidity-data span")[0].innerHTML = Math.round(this.vehicle_data.humidity) + "%";
      
      // LIGHT
      document.querySelectorAll("#light-data span")[0].innerHTML = Math.round(this.vehicle_data.optical) + "LUX";
    }

  }
  ngOnInit() {

    this.get_policy_details();

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

  get_policy_details()
  {

    var pathname = window.location.pathname.split('/');
    var policy_id = pathname[pathname.length-1];

    var parent = this;
    var XMLReq = new XMLHttpRequest();
    XMLReq.open("GET", "http://localhost:3000/api/Policy/"+policy_id+"?access_token=bsIvE18JpnGBmUnqaWHeogNcqHisKgdk6aFDx56iHANaWhf90OzbCmjAtrEZ3gJf");
    XMLReq.onreadystatechange = function() {
      if (XMLReq.readyState == XMLHttpRequest.DONE)
      {
        parent.policy = JSON.parse(XMLReq.responseText);
        parent.get_vehicle();
        parent.get_vehicle_alerts();
      }
    };
    XMLReq.send(null);
  }

  get_vehicle()
  {
    var parent = this;

    var vehicle_id_data = this.policy.vehicleDetails.split('#')
    var vehicle_id = vehicle_id_data[vehicle_id_data.length-1]

    var XMLReq = new XMLHttpRequest();
    XMLReq.open("GET", "http://localhost:3000/api/Vehicle/"+vehicle_id+"?access_token=bsIvE18JpnGBmUnqaWHeogNcqHisKgdk6aFDx56iHANaWhf90OzbCmjAtrEZ3gJf");
    XMLReq.onreadystatechange = function() {
      if (XMLReq.readyState == XMLHttpRequest.DONE)
      {
        parent.car = JSON.parse(XMLReq.responseText);
      }
    };
    XMLReq.send(null);
  }

  get_vehicle_alerts()
  {
    var parent = this;
    
    var vehicle_id_data = this.policy.vehicleDetails.split('#')
    var vehicle_id = vehicle_id_data[vehicle_id_data.length-1]

    var XMLReq = new XMLHttpRequest();
    XMLReq.open("GET", "http://localhost:3000/api/queries/Q2?vehicleDetails=resource%3Aorg.vda.Vehicle%23"+vehicle_id);
    XMLReq.onreadystatechange = function() {
      if (XMLReq.readyState == XMLHttpRequest.DONE)
      {
        var usageRecords = JSON.parse(XMLReq.responseText);
        
        for(var i = 0; i < usageRecords.length; i++)
        {
          var usageEvents = usageRecords[i].usageEvents;
          for(var j = 0; j < usageEvents.length; j++)
          {
            
            var usageEvent = usageEvents[j];

            // ADD IT TO THE BOTTOM OF THE PAGE SECTION
            document.getElementById('alert-holder').innerHTML = document.getElementById('alert-holder').innerHTML + `<div id="`+usageEvent.eventID+`" class="alert-block" _ngcontent-c2="" >
                <div class="left-column" _ngcontent-c2="" >
                    <div class="notification-title" _ngcontent-c2="" ><img src="assets/images/loudspeaker.png" width="22px" height="14px" alt="loudspeaker icon" _ngcontent-c2="" />Alert!</div>
                    <div class="alert-time" _ngcontent-c2="" >
                        <div class="small-title" _ngcontent-c2="" >
                        `+usageEvent.eventType+`
                        </div>
                        `+new Date(usageEvent.timestamp).toLocaleString()+`
                    </div>
                    <div class="event-details" _ngcontent-c2="" >
                        <div class="tiny-header" _ngcontent-c2="" >Event ID</div>
                        `+usageEvent.eventID+`
                    </div>
                </div>
                <div class="alert-detailed-data" _ngcontent-c2="" >
                    <div class="data-field" _ngcontent-c2="">
                        <div class="small-title" _ngcontent-c2="" >Acceleration</div>
                        <span _ngcontent-c2="" >`+usageEvent.acceleration+`G</span>
                    </div>
                    <div class="data-field" _ngcontent-c2="">
                        <div class="small-title" _ngcontent-c2="" >Temperature</div>
                        <span _ngcontent-c2="" >`+usageEvent.temperature+`F</span>
                    </div>
                    <div class="data-field" _ngcontent-c2="" >
                        <div class="small-title" _ngcontent-c2="" >Humidity</div>
                        <span _ngcontent-c2="" >`+usageEvent.humidity+`%</span>
                    </div>
                    <div class="data-field" _ngcontent-c2="" >
                        <div class="small-title" _ngcontent-c2="" >x: 1.45</div>
                        <div class="small-title" _ngcontent-c2="" >y: 2.48</div>
                        <div class="small-title" _ngcontent-c2="" >z: 0.98</div>
                    </div>
                    <div class="data-field" _ngcontent-c2="" >
                        <div class="small-title" _ngcontent-c2="" >Light</div>
                        <span _ngcontent-c2="" >`+usageEvent.light_level+`G</span>
                    </div>
                </div>
            </div>`;

            // ADD IT TO THE ALERT STREAM ON RIGHT
            document.getElementById('alert-block-holder').innerHTML = document.getElementById('alert-block-holder').innerHTML + `<div class="alert-block" _ngcontent-c3="" >
                                                                        <div class="alert-header" _ngcontent-c3="">
                                                                            <img _ngcontent-c3="" src="assets/images/loudspeaker.png" width="22px" height="14px" alt="loudspeaker icon" />Alert!
                                                                        </div>
                                                                        <div class="alert-time" _ngcontent-c3="">
                                                                            <div class="small-title" _ngcontent-c3="" >
                                                                            `+usageEvent.eventType+`
                                                                            </div>
                                                                            `+new Date(usageEvent.timestamp).toLocaleString()+`
                                                                        </div>
                                                                        <div class="event-details" _ngcontent-c3="" >
                                                                            <div class="tiny-header" _ngcontent-c3="" >Event ID</div>
                                                                            `+usageEvent.eventID/*JUST RANDOM FOR MINUTE USE ID FROM MESSAGE*/+`
                                                                        </div>
                                                                        <button class="button" _ngcontent-c3="" onclick="document.getElementById('`+usageEvent.eventID+`').classList.add('highlight'); document.getElementById('`+usageEvent.eventID+`').scrollIntoView(); setTimeout(function() { document.getElementById('`+usageEvent.eventID+`').classList.remove('highlight') }, 2000)" >
                                                                          See more
                                                                        </button>
                                                                      </div>`;
          }
        }

      }
    };
    XMLReq.send(null);
  }

  generateID() { // EXISTING EVENTS DON'T COME WITH ID SO MAKE ONE FOR SCROLLING PURPOSES
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
  }

}