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
    // if (this.config.useLocalWS){
    //   insureWebSocketURL = 'ws://' + location.host + '/ws/insurecar';
    // } else {
    //   insureWebSocketURL = this.config.nodeRedBaseURL + '/ws/insurecar';
    // }
    console.log('connecting websocket', webSocketURL);
    let websocket = new WebSocket(webSocketURL);

    websocket.onopen = function () {
      console.log('insurecar websocket open!');
    };

    websocket.onmessage = event => {
      this.order = JSON.parse(event.data);
      console.log(this.order);
    }
  }

  ngOnInit() {
  }

  reject() {
    delete this.order;
  }
}
