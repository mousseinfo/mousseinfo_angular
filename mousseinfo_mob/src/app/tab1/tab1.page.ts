import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  map: Leaflet.Map;
  propertyList = [];
  lat : number;
  long : number;

  constructor() {
    this.lat=0;
  }

  ngOnInit(): void {



    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
    });

    // navigator.geolocation.getCurrentPosition(success, error, options);
  }

  ionViewDidEnter() {
    console.log(this.lat);
    console.log(typeof this.lat);
    console.log(typeof 43.5781632);



    this.map = new Leaflet.Map('map').setView([this.lat , this.long], 20);

    Leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: 'edupala.com'
    }).addTo(this.map);

    var LeafIcon = Leaflet.Icon.extend({
      options: {
         iconSize:     [50, 50],
         iconAnchor:   [22, 94],
         popupAnchor:  [-3, -76]
      }
  });

    var greenIcon = new LeafIcon({
      iconUrl: 'assets/location.png',
  })

    Leaflet.marker([this.lat, this.long], {icon: greenIcon}).addTo(this.map);

    fetch('./assets/data.json')
      .then(res => res.json())
      .then(data => {
        this.propertyList = data.properties;
        this.map;
      })
      .catch(err => console.error(err));
  }

  leafletMap() {
    for (const property of this.propertyList) {
      Leaflet.marker([property.lat, property.long]).addTo(this.map)
        .bindPopup(property.city)
        .openPopup();
    }
  }

  ionViewWillLeave() {
    this.map.remove();
  }


}
