import { Component, OnInit } from '@angular/core';
import {HeroService} from '../hero.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Hero} from '../hero';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300 ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new gterm if same as prev term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.messageService.add(`[dbg] search(${term})`);
    this.searchTerms.next(term);
  }

}
