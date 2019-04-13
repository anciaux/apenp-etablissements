import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

// declare variable
declare let L;


@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

    mymap: Object;
    
    @Input() hero: Hero;
    constructor() { }

    ngOnChanges(change: Object) {
	console.log(change)
	if (!this.hero)
	    return

//	if (this.hero.marker)
//	    return
	
// 	this.hero.marker = L.marker([this.hero.lat, this.hero.lng]).addTo(this.mymap);
    }
    ngOnInit() {

	this.mymap = L.map('map').setView([46.3820585, 6.2402791], 14);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.mymap);


    }

}
