import { MessagesService } from './message.service';
import { HEROES } from './../seed/mock-heroes';
import { Hero } from './../models/hero';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError,map,tap} from 'rxjs/operators';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
    providedIn: 'root',
})
export class HeroService{
    private heroesUrl = 'api/heroes';
    constructor(private http:HttpClient, private messagesService: MessagesService){}
    // getHeroes(): Observable<Hero[]>{
    //     this.log('fetched heroes');
    //     return of(HEROES);//of used to mock api calls
    // }
    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(this.heroesUrl)
            .pipe(
                tap(_=>this.log('fetched heroes')),
                catchError(this.handleError<Hero[]>('getHeroes', []))
            );
    }
    getHero(id: number): Observable<Hero>{
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get<Hero>(url).pipe(
            tap(_=>this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<Hero>(`getHero id=${id}`))
        );
        // this.log(`fetched hero id=${id}`);
        // return of(HEROES.find(hero => hero.id === id))
    }
    updateHero(hero:Hero): Observable<any>{
        return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
            tap(_ => this.log(`updated hero id=${hero.id}`)),
            catchError(this.handleError<Hero>(`updateHero`))
        )
    }
    addHero(hero: Hero): Observable<any> {
        return this.http.post(this.heroesUrl, hero, httpOptions).pipe(
            tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
            catchError(this.handleError<Hero>(`addHero`))
        )
    }
    deleteHero(hero:Hero|number):Observable<Hero>{
        const id = typeof hero === 'number' ?hero: hero.id;
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete<Hero>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted hero id=${id}`)),
            catchError(this.handleError<Hero>(`deleteHero`))
        )
    }
    searchHeroes(term:String):Observable<Hero[]>{
        if(!term.trim()){
            return of([]);
        }
        return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
            tap(_ => this.log(`found heroes matching ${term}`)),
            catchError(this.handleError<Hero[]>(`searchHeroes`,[]))
        );
    }
    private log(message: String){
        this.messagesService.add(`HeroService: ${message}`);
    }
    private handleError<T>(operation = 'operation', result?:T){
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        }
    }
}