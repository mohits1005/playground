import { HeroService } from './../services/hero.service';
import { Hero } from './../models/hero';
import { Observable, Subject } from 'rxjs';
import { Component,OnInit } from '@angular/core';
import {
    debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
@Component({
    selector: 'app-hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit{
    heroes$: Observable<Hero[]>;
    private searchTerms = new Subject<string>();

    constructor(private heroService:HeroService){}
    search(term:string):void{
        this.searchTerms.next(term)
    }
    ngOnInit():void{
        this.heroes$ = this.searchTerms.pipe(
            debounceTime(3000),
            distinctUntilChanged(),
            switchMap((term:String)=>this.heroService.searchHeroes(term)),
        )
    }

}