import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  order: any;
  registeredVehicles: any;

  constructor(private http: HttpClient) {
    this.order = {
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

    this.http.get('/api/vehicles').subscribe(data => {
      this.registeredVehicles = data['results'].length;
    });
  }

  ngOnInit() {
  }

}
