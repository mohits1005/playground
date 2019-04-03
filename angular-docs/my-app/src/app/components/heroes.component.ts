import { HeroService } from './../services/hero.service';
import { HEROES } from './../seed/mock-heroes';
import { Hero } from './../models/hero';
import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit{
    heroes: Hero[];
    // selectedHero: Hero;
    constructor(private heroService: HeroService){
    }
    ngOnInit(){
        this.getHeroes();
    }
    // onSelect(hero: Hero){
    //     this.selectedHero = hero
    // }
    getHeroes():void{
        // this.heroes = this.heroService.getHeroes();//must be asynchronous in real world
        this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
    }
    add(name: string){
        name = name.trim();
        if(!name){return;}
        this.heroService.addHero({name} as Hero)
        .subscribe(hero => {
            this.heroes.push(hero);
        })
    }
    delete(hero: Hero){
        this.heroes = this.heroes.filter(h => h!== hero);
        this.heroService.deleteHero(hero).subscribe();
    }
}