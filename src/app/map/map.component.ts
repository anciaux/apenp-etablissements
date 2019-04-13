import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Hero } from '../hero';


import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

// declare variable
declare let L;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    @Input() heroes: Hero[];
    @Input() hero: Hero;

    mymap = null;
    school_markers = null;
    
    ngOnChanges(changes: SimpleChanges) {
	if (!changes.hasOwnProperty('heroes'))
	    return
	if (!this.heroes)
	    return

	console.log(changes)

	this.school_markers.clearLayers();	
	for (let h of this.heroes){
	    L.marker([h.lat, h.lng]).addTo(this.school_markers);
	}
    }
    
    constructor() { }

    ngOnInit() {
	this.mymap = L.map('map').setView([46.3820585, 6.2402791], 14);
	this.school_markers = L.layerGroup().addTo(this.mymap);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.mymap);
    }

}
