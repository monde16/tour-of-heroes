import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero} from './hero';
import { HEROES} from './mock-heroes';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    // todo: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    const hero = HEROES.find(h => h.id === id);
    if (hero) {
      this.messageService.add(`HeroService: fetched hero id=${id}`);
    } else {
      this.messageService.add(`HeroService: hero with id=${id} not found`);
    }
    return of(hero);
  }
}
