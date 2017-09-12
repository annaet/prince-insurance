import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-sidebar',
  templateUrl: './alert-sidebar.component.html',
  styleUrls: ['./alert-sidebar.component.css']
})
export class AlertSidebarComponent implements OnInit {

  order: any;
  
  constructor() {
    let webSocketURL = 'ws://localhost:1880/ws/updateorderstatus';

    console.log('connecting websocket', webSocketURL);
    let websocket = new WebSocket(webSocketURL);

    websocket.onopen = function () {
      console.log('insurecar websocket open!');
    };

    websocket.onmessage = event => {
      this.order = JSON.parse(event.data);
      document.getElementById('alert-block-holder').innerHTML = `<div class="alert-block" _ngcontent-c3="" >
                                                                  <div class="alert-header" _ngcontent-c3="">
                                                                      <img _ngcontent-c3="" src="assets/images/loudspeaker.png" width="22px" height="14px" alt="loudspeaker icon" />Alert!
                                                                  </div>
                                                                  <div class="alert-time" _ngcontent-c3="">
                                                                      <div class="small-title" _ngcontent-c3="" >Accident</div>
                                                                      13 Jul 2017 07:35PM
                                                                  </div>
                                                                  <div class="event-details" _ngcontent-c3="" >
                                                                      <div class="tiny-header" _ngcontent-c3="" >Event ID</div>
                                                                      `+this.order.transactionId/*JUST RANDOM FOR MINUTE USE ID FROM MESSAGE*/+`
                                                                  </div>
                                                                  <button class="button" _ngcontent-c3="" onclick="document.getElementById('`+this.order.transactionId+`').classList.add('highlight'); document.getElementById('`+this.order.transactionId+`').scrollIntoView(); setTimeout(function() { document.getElementById('`+this.order.transactionId+`').classList.remove('highlight') }, 2000)" >
                                                                    See more
                                                                  </button>
                                                                </div>` + document.getElementById('alert-block-holder').innerHTML;
      // this.order = JSON.parse(event.data);
      // console.log("this.order");
    }
  }

  ngOnInit() {
  }

  reject() {
    delete this.order;
  }

}