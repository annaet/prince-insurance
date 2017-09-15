import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  vehicle_details: any;
  num_policies = 0;

  constructor(private http: HttpClient) {

    this.num_policies = 0;

    let websocketURL = 'ws://localhost:1880/ws/requestpolicy';
    
    console.log('connecting websocket', websocketURL);
    let websocket = new WebSocket(websocketURL);

    websocket.onopen = function () {
      console.log('insurance websocket open!');
    };

    websocket.onmessage = event => {
      this.vehicle_details = JSON.parse(event.data).vehicleDetails;
      (<HTMLInputElement>document.getElementById("vin")).value = this.vehicle_details.vin;
      document.getElementById("vehicle-type").innerHTML = this.vehicle_details.name;
      document.getElementById("colour").innerHTML = this.vehicle_details.colour;
      var extras = "";
      for(var i = 0; i < this.vehicle_details.extras.length; i++)
      {
        extras += this.vehicle_details.extras[i] + "<br />";
      }
      document.getElementById('trim').innerHTML = this.vehicle_details.trim;
      document.getElementById("extras").innerHTML = extras;
      (<HTMLImageElement>document.getElementById("car-pic")).src = "assets/images/"+this.vehicle_details.image;
      document.getElementById("notification-window").classList.remove('hidden');
    }

  }

  ngOnInit() {

    var parent = this;
    var XMLReq = new XMLHttpRequest();
    XMLReq.open("GET", "http://localhost:3000/api/queries/Q1?insurer=resource%3Aorg.insurance.Insurer%23prince");
    XMLReq.onreadystatechange = function() {
      if (XMLReq.readyState == XMLHttpRequest.DONE)
      {
        var num_pols = JSON.parse(XMLReq.responseText);
        console.log(XMLReq.responseText)
        parent.num_policies = num_pols.length;
      }
    };
    XMLReq.send(null);

  }

}
