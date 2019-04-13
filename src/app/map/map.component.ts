import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
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
    @Output() selectHero: EventEmitter<any> = new EventEmitter();

    mymap = null;
    school_markers = null;
    markers_per_school = {};

    ngOnChanges(changes: SimpleChanges) {
	if (!this.heroes)
	    return

	if (changes.hasOwnProperty('heroes')){

	    console.log(changes);
	    this.school_markers.clearLayers();	
	    for (let h of this.heroes){
		let m = L.marker([h.lat, h.lng]).addTo(this.school_markers);
		m.bindPopup(`<b>${h.name}</b>`);
		m.school = h;
		console.log(h.name);
		let obj = this;
		console.log(m, 'AAAAA');
		m.on('click', function(e) {
		    console.log(e.target.school, 'AAAAA');
		    obj.selectHero.emit(e.target.school);
		});
		this.markers_per_school[h.name] = m;
	    }
	    this.mymap.fitBounds(this.school_markers.getBounds());
	}
	if (changes.hasOwnProperty('hero')){
	    console.log(changes.hero);
	    this.markers_per_school[this.hero.name].openPopup();
	    
	}
    }
    
    constructor() { }

    ngOnInit() {
	this.mymap = L.map('map').setView([16.3820585, 6.2402791], 14);
	this.school_markers = L.featureGroup().addTo(this.mymap);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.mymap);
    }

}
