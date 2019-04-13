import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';


@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

    heroes: Hero[];
    
    constructor(private heroService: HeroService) { }

    ngOnInit() {
	this.getHeroes();
    }
    selectedHero: Hero;
    onSelect(hero: Hero): void {
	this.selectedHero = hero;
    }

    async getHeroes(): void {
	this.heroes = await this.heroService.getHeroes();
    }
    
}


